<script>
  import { onMount } from "svelte";
  import { marked } from 'marked';
  import { format, parseISO } from 'date-fns';

  // Font Awesome
  import Icon from 'svelte-awesome';
  import { circle, shield, download } from 'svelte-awesome/icons';

  // Focus (for accessibility)
  import {useFocus} from 'svelte-navigator';
  const registerFocus = useFocus();

  // Load API functions
  import getProfile from "../api/profile/getProfile.js";
  import getProfileGames from "../api/collection/getGames.js";

  // Import stores
  import { userData } from '../stores/userdata.js';

  // Load components
  import Page from "../components/Page.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Card from "../components/card/Card.svelte";
  import CardTitle from "../components/card/CardTitle.svelte";
  import CardRow from "../components/card/CardRow.svelte";
  import CardBody from "../components/card/CardBody.svelte";
  import GameList from '../components/profile/GameList.svelte';
  import GameNote from '../components/profile/GameNote.svelte';
  import Alert from "../components/Alert.svelte";
  
  // Pass in parameters from App.svelte
  export let params;

  let username = params.username;

  let userProfile;
  let userProfileGames;

  // changes to true once the profile and collection has loaded
  let userProfileLoaded = false;

  let joinDate = "";
  let gamesOwned = 0;

  let errorMessage = ""
  let errorLevel = "";

  // For game notes modal
  let showGameNotes = false;
  let gameDetails = {}; 


  let showNote = (event) => {
    showGameNotes = true;
    gameDetails = event.detail;
  };

  // Hide game notes modal
  const handleHideModal = (event) => {
    showGameNotes = false;
  };

  onMount(async () => {

    // Load Profile
    try {
      userProfile = await getProfile(username, $userData.token);
    }
    catch(error) {

      switch (error) {
        // Profile is private
        case "NotAuthorized":
          errorMessage = `${username}'s profile is private.`;
          errorLevel = "warning"
          break;
        // User does not exist
        case "UserNotFound":
          errorMessage = "The profile you are trying to view does not exist."
          errorLevel = "info"
          break;
        // User account is disabled
        case "UserDisabled":
          errorMessage = "This account has been disabled."
          errorLevel = "danger"
          break;
      }
      return false;
    }

    // Load Games
    try {
      userProfileGames = await getProfileGames(username, $userData.token);
    }
    catch(error) {
      console.log('Could not load game collection: ', error);
      return false;
    }

    gamesOwned = userProfileGames.length;
    // Format join date like 28 Feb 2022
    joinDate = format(parseISO(userProfile.dateJoined), 'd MMM yyyy');

    userProfileLoaded = true;
  });


  
</script>

{#if showGameNotes}
<!-- Edit game modal -->

  <GameNote game={gameDetails} on:hideModal={handleHideModal} />

{/if}


<Page>
  {#if userProfileLoaded}
  
  <!-- This div is needed for accessibility in svelte-navigator -->
  <div use:registerFocus class="focus:outline-none">
    <PageTitle title={userProfile.username}/>
  </div>

  <div class="flex flex-row justify-between">
    <div>
      <!-- USER BADGES -->
      <div class="flex flex-row space-x-2">
        <!-- User online -->
        {#if userProfile.online}
        <div class="px-2 py-0.5 rounded text-sm bg-green-100 text-green-900 font-semibold">
          <Icon data={circle} class="inline-block align-sub"/> Online
        </div>
        {/if}
        <!-- User online END -->

        <!-- User Admin -->
        {#if userProfile.admin}
        <div class="px-2 py-0.5 rounded text-sm bg-blue-100 text-blue-900 font-semibold">
          <Icon data="{shield}" class="inline-block align-sub" /> Site Admin 
        </div>
        {/if}
        <!-- User Admin END -->
      </div>
      <!-- USER BADGES END -->
    </div>
    <div>
      {#if userProfile.username == $userData.username}
      <a href="/collection" class="px-2 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold">
        Manage Collection
      </a>
      {/if}
    </div>
  </div>

  <!-- Main profile grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3">
    <!-- User Stats / Bio -->
    <div class="col-span-1 lg:pr-2">
      <Card>
        <CardTitle title="Stats" />
        <CardRow key="Date joined:" value={joinDate} />
        <CardRow key="Games in collection:" value={gamesOwned} />
      </Card>
      {#if userProfile.bio}
      <Card>
        <CardTitle title="Bio" />
        <CardBody>
          <!-- Render markdown. TODO: MAKE SURE THIS IS SANITIZED!!! -->
          {@html marked.parse(userProfile.bio)}
        </CardBody>
      </Card>
      {/if}
    </div>

    <!-- GAME COLLECTION -->
    <div class="col-span-2 lg:pl-2">
      <div class="shadow my-2">
        <h2 class="border-t border-l border-r border-gray-400 text-center font-semibold bg-gray-200 text-gray-800 p-0.5 text-lg">
          Games in collection
        </h2>

        {#if gamesOwned > 0}
          <!-- GAME LIST TABLE -->
          <div class="overflow-x-auto">
            <GameList games={userProfileGames} on:showNote={showNote}/>
          </div>
        {:else}
          <div class="px-4 py-6 bg-gray-100 border-gray-400 border w-full text-center">
            {userProfile.username} has no games
          </div>
        {/if}
      </div>

      <!-- CSV DOWNLOAD -->
      {#if gamesOwned > 0}
      <p class="my-2">
        <a
          href="/api/collection/user/{userProfile.username}.csv"
          class="px-2 py-0.5 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold"
          target="_blank"
        >
          <Icon data={download} class="align-sub" /> CSV
        </a>
      </p>
      {/if}
      <!-- CSV DOWNLOAD END -->

    </div>
    <!-- GAME COLLECTION END -->

  </div>
{:else}

  {#if errorMessage != ""}
    <Alert message={errorMessage} level={errorLevel} />
    {:else}
    <p>Loading profile</p>
  {/if}

{/if}
</Page>
