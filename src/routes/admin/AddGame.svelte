<script>
  import { onMount } from "svelte";

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength, number } from "svelte-use-form";
  const form = useForm();

  // Import the userData store
  import { userData } from '../../stores/userdata.js';

  // Import API calls
  import getAllDevelopers from "../../api/game/getAllDevelopers.js";
  import getAllPlatforms from "../../api/game/getAllPlatforms.js";
  import addGame from "../../api/game/addGame.js";

  // Import components
  import AdminPage from "../../components/admin/AdminPage.svelte";
  import PageTitle from "../../components/headings/PageTitle.svelte";
  import Alert from "../../components/Alert.svelte";

  // Game developers and platforms will be stored here
  let gameDevelopers;
  let gamePlatforms;

  // Form Data
  let newGame = {
    title: "",
    year: null,
    developerId: null,
    platformId: null,
  }
  let response = "";


  const handleAddGame = async () => {
    try {
      await addGame(newGame.title, newGame.year, newGame.developerId, newGame.platformId, $userData.token);
    }
    catch(exception) {
      switch(exception) {
        case 'InputValidationError':
          response = "Input validation error"
          return false;
        
        case 'Error':
          response = "Could not add game to the database"
          return false;

        default:
          response = `Unknown error: ${exception}`;
          return false;
      }
    }

    // Game added successfully
    newGame = {}
    response = "Game added successfully"

    // Reset the form
    $form.reset();
    return true;
  }


  onMount(async () => {
    // Get list of all game developers
    try {
      gameDevelopers = await getAllDevelopers();
    }
    catch(error) {
      console.log('Could not load developers:', error);
    }

    // Get list of all platforms
    try {
      gamePlatforms = await getAllPlatforms();
    }
    catch(error) {
      console.log('Could not load platforms:', error);
    }

  });
</script>

<AdminPage>
  <PageTitle title="Add Game" />

  <form class="max-w-md" use:form on:submit|preventDefault={handleAddGame}>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="gameTitle">
          Title:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="text"
          name="gameTitle"
          id="gameTitle"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newGame.title}
          use:validators={[required], [minLength(1)]}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="gameYear">
          Release Year:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="number"
          name="gameYear"
          id="gameYear"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newGame.year}
          use:validators={[required], [minLength(4)], [number]}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="gameDeveloper">
          Developer:
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          name="gameDeveloper"
          id="gameDeveloper"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newGame.developerId}
          use:validators={[required]}
        >
          {#if gameDevelopers }
            {#each gameDevelopers as developer (developer.id)}
              <option value={developer.id}>{developer.name}</option>
            {/each}
          {/if}
        </select>
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="status">
          Platform:
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          name="status"
          id="status"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newGame.platformId}
          use:validators={[required]}
        >
          {#if gamePlatforms }
            {#each gamePlatforms as platform (platform.id)}
              <option value={platform.id}>{platform.Manufacturer.name} {platform.name}</option>
            {/each}
          {/if}
        </select>
      </div>
    </div>
  
    <div class="mt-4">
      <button class="px-4 py-1 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold">
        Save
      </button>
    </div>
  </form>

  {#if response}
    <Alert message={response} />
  {/if}

</AdminPage>
