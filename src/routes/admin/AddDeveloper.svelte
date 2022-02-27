<script>
  import { onMount } from "svelte";

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength } from "svelte-use-form";
  const form = useForm();

  // Import the userData store
  import { userData } from '../../stores/userdata.js';

  // Import API calls
  import addDeveloper from "../../api/game/addDeveloper.js";

  // Import components
  import AdminPage from "../../components/admin/AdminPage.svelte";
  import PageTitle from "../../components/headings/PageTitle.svelte";
  import Alert from "../../components/Alert.svelte";

  // Form Data
  let developerName = "";
  let addDev;

  let response = "";


  const handleAddDeveloper = async () => {
    try {
      addDev = await addDeveloper(developerName, $userData.token);
    }
    catch(exception) {
      switch(exception) {
        case 'InputValidationError':
          response = "Input validation error"
          return false;
        
        case 'AddDeveloperFailed':
          response = "Could not add developer to the database. Does it already exist in the database?"
          return false;

        default:
          response = `Unknown error: ${exception}`;
          return false;
      }
    }

    // Developer added successfully
    developerName = ""
    response = `${addDev.name} has been added to the database. developerId is: ${addDev.developerId}`

    // Reset the form
    $form.reset();

    return true;
  }


</script>

<AdminPage>
  <PageTitle title="Add Developer" />

  <form class="max-w-md" use:form on:submit|preventDefault={handleAddDeveloper}>
    <div class="md:flex md:items-center mb-2">
      <div class="w-full md:w-1/3">
        <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="developerName">
          Name:
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          type="text"
          name="developerName"
          id="developerName"
          class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
          bind:value={developerName}
          use:validators={[required], [minLength(1)]}
        />
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
