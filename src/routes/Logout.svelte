<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';

  // Import stores
  import { userData } from '../stores/userdata.js';

  // Import API functions
  import logOutUser from "../api/auth/logout.js";

  let logout;

  // log out user
  const endSession = async () => {
    // Try to log out using api endpoint
    try {
      logout = await logOutUser($userData.token);
    }
    catch(error) {
      console.log('Could not log out:', error);
    }

    console.log("Clearing localstorage");

    // Reset userdata store
    userData.set({
      username: "",
      token: "",
      token_expires_at: ""
    });

    // Redirect to home page
    navigate('/', {replace:true});

    return true;
  };

  onMount(() => {
    // Check if logged in
    if(! $userData.token) {
      // Not logged in, redirect to login page
      page('/login');
      return false;
    }

    // Not logged in, log out user.
    endSession();
    return true;
  });
</script>
