<script>
  import { onMount } from "svelte";

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength, maxLength, number } from "svelte-use-form";
  const form = useForm();

  // Import the userData store
  import { userData } from '../../stores/userdata.js';

  // Import API calls
  import getAllManufacturers from "../../api/game/getAllManufacturers.js";
  import addPlatform from "../../api/game/addPlatform.js";

  // Import components
  import AdminPage from "../../components/admin/AdminPage.svelte";
  import PageTitle from "../../components/headings/PageTitle.svelte";
  import Alert from "../../components/Alert.svelte";

  let gamePlatformManufacturers;

  // Form Data
  let newPlatform = {
    name: "",
    shortname: "",
    manufacturerId: "",
    year: "",
  }
  let response = "";


  const handleAddPlatform = async () => {
    let platform; 
    try {
      platform = await addPlatform(newPlatform.name, newPlatform.shortname, newPlatform.manufacturerId, newPlatform.year, $userData.token);
    }
    catch(exception) {
      switch(exception) {
        case 'InputValidationError':
          response = "Input validation error"
          return false;
        
        case 'AddDeviceFailed':
          response = "Could not add platform to the database"
          return false;

        default:
          response = `Unknown error: ${exception}`;
          return false;
      }
    }

    // Game added successfully
    newPlatform = {}
    response = `${platform.name} (${platform.shortname}) has been added to the database.`;

    // Reset the form
    $form.reset();

    return true;
  }


  onMount(async () => {
    // Get list of all platform manufacturers
    try {
      gamePlatformManufacturers = await getAllManufacturers();
    }
    catch(error) {
      console.log('Could not load manufacturers:', error);
    }
  });
</script>

<AdminPage>
  <PageTitle title="Add Platform" />

  <form class="max-w-md" use:form on:submit|preventDefault={handleAddPlatform}>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="platformName">
          Name:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="text"
          name="platformName"
          id="platformName"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newPlatform.name}
          use:validators={[required], [minLength(1)]}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="platformShortname">
          Short name:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="text"
          name="platformShortname"
          id="platformShortname"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newPlatform.shortname}
          use:validators={[required], [minLength(1)]}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="platformYear">
          Release Year:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="number"
          name="platformYear"
          id="platformYear"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newPlatform.year}
          use:validators={[required], [minLength(4)], [maxLength(4)], [number]}
        />
      </div>
    </div>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="platformManufacturer">
          Manufacturer:
        </label>
      </div>
      <div class="md:w-2/3">
        <select
          name="platformManufacturer"
          id="platformManufacturer"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={newPlatform.manufacturerId}
          use:validators={[required]}
        >
          {#if gamePlatformManufacturers }
            {#each gamePlatformManufacturers as manufacturer (manufacturer.id)}
              <option value={manufacturer.id}>{manufacturer.name}</option>
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
