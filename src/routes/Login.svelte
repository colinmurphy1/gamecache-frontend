<script>
  import { onDestroy } from "svelte";
  import page from 'page';

  // Import Svelte-use-form for the form
  import { useForm, required } from "svelte-use-form";
  const form = useForm();

  // Import the userData store
  import { userData } from '../stores/userdata.js';

  export let params;
  
  // Pre fill username and password info
  let username = "";
  let password = "";
  let loginMessage = "";

  // Function for logging in the user
  const logInUser = async () => {

    // API request data
    const apiRequest = {
      username: username,
      password: password
    };

    // Make an authentication request to the /api/auth/login endpoint
    const loginReq = await fetch('https://gamecache.net/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(apiRequest)
    })
    .then(response => response.json()) // Convert the response to json
    .then(data => data);

    // Look at the response message
    switch(loginReq.message) {
      // Input validation error (does not meet form req's)
      case 'InputValidationError':
        loginMessage = 'Input validation error';
        return false;

      // Incorrect username or password
      case 'Unauthorized':
        loginMessage = 'Incorrect username or password';
        return false;

      // login good, continue 
      case 'OK':
        break;
    }

    // Login successful 

    loginMessage = '';
    console.log('Login successful');

    //userData.update(value => loginReq.data);
    userData.set(loginReq.data);

    // Redirect to home page
    page('/');

    return true;
  };

</script>


<section>
  <h2>Log in to gamecache</h2>

  <p>
    Don't have an account yet?
    <a href="/signup">Sign up here</a>!
  </p>

  {#if loginMessage}
  <div>
    {loginMessage}
  </div>
  {/if}

  <!-- preventDefault makes js take over the form -->
  <form use:form on:submit|preventDefault={logInUser}>

    <div class="grid grid-cols-2 p-1 border-b border-gray-400 w-1/2">
      <div class="text-gray-800 font-semibold">
        <label for="username">Username:</label>
      </div>
      <div>
        <input type="text" id="username" bind:value={username} class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline">
      </div>
    </div>






    
    


    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline">

    <button class="px-2 py-0.5 rounded text-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold">
      Log in
    </button>

  </form>

</section>

<style>

</style>