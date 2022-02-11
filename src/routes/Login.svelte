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
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username}>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password}>

    <button>Log in</button>

  </form>

</section>

<style>

</style>