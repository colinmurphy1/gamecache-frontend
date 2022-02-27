<script>
  import { onMount, onDestroy } from "svelte";
  import { download } from 'svelte-awesome/icons';
  import Icon from 'svelte-awesome';
  
  // Import stores
  import { userData } from '../stores/userdata.js';

  // Load API functions
  import deleteGame from "../api/collection/deleteGame.js";
  import getProfileGames from "../api/collection/getGames.js";

  // Load components
  import Page from "../components/Page.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import GameCollection from "../components/collection/GameCollection.svelte";
  import Alert from "../components/Alert.svelte";
  import EditGame from "../components/collection/EditGame.svelte";
  import updateGame from "../api/collection/updateGame.js";


  let username = $userData.username;
  let gameCollection;
  let gamesOwned = 0;

  // Show edit game modal
  let editingGame = false;

  let gameDetails = {}; 


  // Delete game event handler
  const handleDeleteGame = async (event) => {
    const gameTitle = event.detail.title;
    const prompt = confirm(`Are you sure you want to delete "${gameTitle}" from your collection?`);
    if (! prompt) {
      return false;
    }

    try {
      await deleteGame(event.detail.id, $userData.token);
    }
    catch(exception) {
      console.log('Could not delete game:', exception);
      return false;
    }

    // Update game list
    await loadGames();

    return true;
  };

  // Edit game event handler
  const handleEditGame = (event) => {
    gameDetails = event.detail;
    editingGame = true;
  };

  // Hide Edit game modal
  const handleHideModal = (event) => {
    editingGame = false;
  };

  // Save game event handler
  const handleSaveGame = async (event) => {
    // hide modal
    handleHideModal();

    // send changes to server
    try {
      await updateGame(event.detail, $userData.token);
    }
    catch(error) {
      console.log('Could not update game collection: ', error);
      return false;
    }

    console.log('Saved game');

    // Update game list
    await loadGames();

    return true;
  }

  // Load games
  const loadGames = async () => {
    // Load Games
    try {
      gameCollection = await getProfileGames(username, $userData.token);
    }
    catch(error) {
      console.log('Could not load game collection: ', error);
      return false;
    }

    gamesOwned = gameCollection.length;
    return true;
  };

  // Load collection on page load
  onMount(async () => {
    await loadGames();
  });

</script>


{#if editingGame}
  <!-- Edit game modal -->
  <EditGame game={gameDetails} on:hideModal={handleHideModal} on:saveGame={handleSaveGame}/>
{/if}

<Page>
  <PageTitle title="My Collection" />

  {#if gamesOwned == 0}
    
    <Alert title="No Games" message="You currently do not have any games" />

  {:else}

    <p class="my-2">There are {gamesOwned} games in your collection.</p>

    <GameCollection
      games={gameCollection}
      on:editGame={handleEditGame}
      on:deleteGame={handleDeleteGame}
    />

    <p class="my-2">
      Export collection: 
      <a
        href="/api/collection/user/{username}.csv"
        class="px-2 py-0.5 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold"
        target="_blank"
      >
        <Icon data={download} /> CSV
      </a>
    </p>

  {/if}

</Page>
