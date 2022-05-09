<script>
  // Load modules
  import { onMount } from "svelte";

  // Load components
  import Page from "../components/Page.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Alert from "../components/Alert.svelte";
  import GameTable from "../components/gamelist/GameTable.svelte";

  // Load API functions
  import getGameList from "../api/game/getGameList.js";
  import getProfileGames from "../api/collection/getGames.js";
  import addGame from "../api/collection/addGame.js";

  // Import stores
  import { userData } from '../stores/userdata.js';


  let games = {}; // Games list will be in this object
  let gameIds = []; // IDs of games in users' collection
  let loaded = false;

  // Add Game prompt event handler
  const handleAddGamePrompt = async (event) => {
    const gameDetails = event.detail;

    // Prompt for confirmation, and if canceled, do not add the game to the 
    // collection.
    const prompt = confirm(`Add "${gameDetails.title}" to your collection?`);
    if (! prompt) return false;

    // Add game to the collection
    try {
      await addGame(gameDetails.id, $userData.token);
    }
    catch(exception) {
      console.log('Could not add game:', exception);
      return false;
    }

  }


  onMount(async () => {

    let gameCollection = {};

    // Load games list from API
    try {
      games = await getGameList();
    }
    catch(exception) {
      console.log('Could not load games:', exception);
      return false;
    }

    // Load game collection if logged in
    if ($userData.token) {
      console.log('User is logged in, grabbing collection...');
      try {
        gameCollection = await getProfileGames($userData.username, $userData.token);
      }
      catch(error) {
        console.log('Could not load game collection: ', error);
        return false;
      }

      // Keep an array of game ids in collection
      gameCollection.forEach(x => gameIds.push(x.gameId))
    }


    //console.log('Games:', games);
    //console.log('Game collection:', gameCollection);
    loaded = true;
    return true;
  });

</script>

<Page>
  <PageTitle title="Games" />

  {#if loaded}
    {#if games.length > 0}
      <GameTable
        games={games}
        gameIds={gameIds}
        showAddButton={$userData.token ? true : false}
        on:addGame={handleAddGamePrompt}
      />
    {:else}
      <Alert
        title="No Games"
        message="There are currently no games in the database. If you are the
          site administrator, you may add them from the administration pages."
      />
    {/if}
  {/if}

</Page>