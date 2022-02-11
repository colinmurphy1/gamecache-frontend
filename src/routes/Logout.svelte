<script>
  import { onMount } from 'svelte';

  // Import stores
  import { userData } from '../stores/userdata.js';

  // Import page.js
  import page from 'page';

  // log out user
  const endSession = async () => {

    // Log out using the logout endpoint
    
    const logoutReq = await fetch('https://gamecache.net/api/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: $userData.token
      }
    })
    .then(response => response.json())
    .then(data => data);
  
    // Could not log out using the API. Still going to clear the data
    
    if (logoutReq.message != "OK") {
      console.log('Could not log out at the API endpoint, clearing storage');
    }

    // Reset userdata store
    userData.set({});

    // Redirect to home page
    page('/');

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
