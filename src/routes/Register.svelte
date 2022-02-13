<script>
  import { onDestroy, onMount, createEventDispatcher } from "svelte";
  import page from 'page';

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength, email } from "svelte-use-form";
  const form = useForm();

  // Create dispatcher
  const dispatch = createEventDispatcher();

  // Import API functions
  import createUser from "../api/auth/register.js";
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
  let emailAddr = "";
  let loginMessage = "";
  let registerUser;
  let login;

  const handleRegistration = async () => {

    // Attempt to create a user account
    try {
      registerUser = await createUser(username, password, emailAddr);
    }
    catch(exception) {
      // Catch regstration exceptions and display error messages
      switch(exception) {
        // Input validation error (does not meet form req's)
        case 'InputValidationError':
          loginMessage = 'Input validation error';
          return false;

        // Incorrect username or password
        case 'UserCreationError':
          loginMessage = 'Username or email is currently in use';
          return false;

        default:
          loginMessage = 'Error when creating account'
          return false;
      }
    }


    // Login successful 

    loginMessage = '';
    console.log('Account created');

    // Log in user with new account
    try {
      login = await logInUser(username, password);
    }
    catch(exception) {
      console.log('Could not log in:', exception);
      return false;
    }

    // Store response in the userData store
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
    <CardTitle title="Create an account" />
    <CardBody>
      <p class="py-2 mb-2 text-center">
        Already have an account?
        <a href="/login" class="hover:underline font-semibold text-blue-900">
          Log in &raquo;
        </a>
      </p>
      {#if loginMessage}
      <Alert message={loginMessage} level="warning" />
      {/if}
      <!-- preventDefault makes js take over the form -->

      <form class="w-full" use:form on:submit|preventDefault={handleRegistration}>
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
        <div class="md:flex md:items-center mb-2">
          <div class="md:w-1/3">
            <label class="block font-semibold md:text-right mb-1 md:mb-0 pr-4" for="email">
              Email:
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="w-full appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
              id="email"
              type="email"
              name="email"
              bind:value={emailAddr}
              use:validators={[required],[email]}
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button class="px-2 py-1 rounded text-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold disabled:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300" type="submit" disabled={!$form.valid}>
              Register
            </button>
          </div>
        </div>
      </form>
    </CardBody>
  </Card>
</CenterPage>
