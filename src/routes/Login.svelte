<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import page from 'page';

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength } from "svelte-use-form";
  const form = useForm();

  // Create dispatcher
  const dispatch = createEventDispatcher();

  // Import API functions
  import logInUser from "../api/auth/login.js";

  // Import the userData store
  import { userData } from '../stores/userdata.js';

  // Import components
  import CenterPage from "../components/CenterPage.svelte";
  import Alert from "../components/Alert.svelte";

  import Card from "../components/card/Card.svelte";
  import CardBody from "../components/card/CardBody.svelte";
  import CardTitle from "../components/card/CardTitle.svelte";

  export let params;
  
  // Pre fill username and password info
  let username = "";
  let password = "";
  let loginMessage = "";
  let login;

  const handleLogin = async () => {
    // Try to log in using the api
    try {
      login = await logInUser(username, password);
    }
    catch(exception) {
      // Catch log in exceptions and display error messages
      switch(exception) {
        case 'InputValidationError':
        loginMessage = 'Input validation error';
        return false;

        // Incorrect username or password
        case 'Unauthorized':
          loginMessage = 'Incorrect username or password';
          return false;
        
        default:
          loginMessage = 'Error when logging in'
          return false;
      }
    }
    
    // Login successful, store information in userData store
    console.log('Login successful');
    loginMessage = '';

    userData.set(login);

    // Redirect to home page
    page('/');

    return true;
  };

  // Hide Nav on page load
  onMount(() => {
    dispatch('hideNav', { hidden: true});
  });

  // Show Nav on page unload
  onDestroy(() => {
    dispatch('hideNav', { hidden: false});
  });

</script>

<CenterPage>
  <Card custom="md:w-96">
    <CardTitle title="Log in to Gamecache" />
    <CardBody>
      <p class="py-2 mb-2 text-center">
        Don't have an account yet?
        <a href="/register" class="hover:underline font-semibold text-blue-900">
          Sign up here!
        </a>
      </p>
      {#if loginMessage}
      <Alert message={loginMessage} level="warning" />
      {/if}
      <!-- preventDefault makes js take over the form -->

      <form class="w-full" use:form on:submit|preventDefault={handleLogin}>
        <div class="md:flex md:items-center mb-2">
          <div class="md:w-1/3">
            <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="username">
              Username:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="w-full appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
              id="username"
              name="username"
              type="text"
              bind:value={username}
              use:validators={[required], [minLength(1)]}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-2">
          <div class="md:w-1/3">
            <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="password">
              Password:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="w-full appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
              id="password"
              type="password"
              name="password"
              bind:value={password}
              use:validators={[required],[minLength(8)]}
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button class="px-2 py-1 rounded text-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold disabled:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300" type="submit" disabled={!$form.valid}>
              Log in
            </button>
          </div>
        </div>
      </form>
    </CardBody>
  </Card>
</CenterPage>
