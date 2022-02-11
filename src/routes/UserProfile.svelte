<script>
  import { onMount } from "svelte";
  import { marked } from 'marked';

  // Font Awesome
  import Icon from 'svelte-awesome';
  import { circle, shield, download } from 'svelte-awesome/icons';

  // Load API functions
  import getProfile from "../api/profile/getProfile.js";
  import getProfileGames from "../api/profile/getProfileGames.js";

  import GameList from '../components/GameList.svelte';


  // Pass in parameters from App.svelte
  export let params;

  let username = params.username;


  let userProfile;
  let userProfileGames;
  let gamesOwned = 0;

  onMount(async () => {

    // Load Profile
    try {
      userProfile = await getProfile(username);
    }
    catch(error) {
      console.log('Could not load profile: ', error);
      return false;
    }
    /*finally {
      console.log(userProfile);
    }*/

    // Load Games
    try {
      userProfileGames = await getProfileGames(username);
    }
    catch(error) {
      console.log('Could not load game collection: ', error);
      return false;
    }
    finally {
      console.log(userProfileGames);
    }

    gamesOwned = userProfileGames.length;
  });


  
</script>

{#if userProfile}

  <h1 class="text-4xl my-5 font-semibold px-4">
    {userProfile.username}'s Profile
  </h1>

  <!-- Main profile grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3">

    <!-- User Stats / Bio -->
    <div class="col-span-1 px-4">
      <div class="shadow bg-gray-100 my-2 border border-gray-400">
        <h2 class="border-b border-gray-400 text-center font-semibold bg-gray-200 text-gray-800 p-0.5 text-lg">
          Stats
        </h2>
        <!-- USER TAGS -->
        <div class="p-1 border-b border-gray-400 flex flex-row space-x-1">
          <!-- User online -->
          {#if userProfile.online}
          <div class="px-2 py-0.5 rounded text-sm bg-green-100 text-green-900 font-semibold">
            <Icon data={circle} /> Online
          </div>
          {/if}
          <!-- User online END -->
  
          <!-- User Admin -->
          {#if userProfile.admin}
          <div class="px-2 py-0.5 rounded text-sm bg-blue-100 text-blue-900 font-semibold">
            <Icon data="{shield}" /> Site Admin 
          </div>
          {/if}
          <!-- User Admin END -->
        </div>
        <!-- USER TAGS END -->
  
        <!-- DATE JOINED -->
        <div class="grid grid-cols-2 p-1 border-b border-gray-400">
          <div class="text-gray-800 font-semibold">
            Date joined:
          </div>
          <div>
            {userProfile.dateJoined}
          </div>
        </div>
        <!-- DATE JOINED END-->
  
        <!-- GAMES OWNED -->
        <div class="grid grid-cols-2 p-1 border-gray-400">
          <div class="text-gray-800 font-semibold">
            Games in collection:
          </div>
          <div>
            {gamesOwned}
          </div>
        </div>
      </div>
      <!-- GAMES OWNED END-->

      <!-- USER BIO  -->
      {#if userProfile.bio}
      <div class="shadow bg-gray-100 my-2 border border-gray-400">
        <h2 class="border-b border-gray-400 text-center font-semibold bg-gray-200 text-gray-800 p-0.5 text-lg">
          Bio
        </h2>
        <div class="p-1">
          <!-- Render markdown. TODO: MAKE SURE THIS IS SANITIZED!!! -->
          {@html marked.parse(userProfile.bio)}
        </div>
      </div>
      {/if}
      <!-- USER BIO END -->
    </div>

    <!-- GAME COLLECTION -->
    <div class="col-span-2 px-4">
      <div class="shadow my-2">
        <h2 class="border-t border-l border-r border-gray-400 text-center font-semibold bg-gray-200 text-gray-800 p-0.5 text-lg">
          Games in collection
        </h2>

        {#if gamesOwned > 0}
          <!-- GAME LIST TABLE -->
          <GameList games={userProfileGames} />
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
        >
          <Icon data={download} /> CSV
        </a>
      </p>
      {/if}
      <!-- CSV DOWNLOAD END -->

    </div>
    <!-- GAME COLLECTION END -->

  </div>
{:else}

  <p>User does not exist</p>

{/if}
