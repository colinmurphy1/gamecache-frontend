<script>
  import { onMount } from 'svelte';

  // Import page.js
  import router from 'page';

  // Import routes
  import routes from './routes.js';

  // Add ping function which checks if a token is valid (and extends time if
  // it is)
  import pingUser from "./api/auth/ping.js";

  // Import the userData store and subscribe to it
  import { userData } from './stores/userdata.js';
  let user;
  userData.subscribe(value => user = value);

  // page, params for the router
  let page;
  let params;

  // When set to hideNav hide the navbar. TODO: Move this to a component
  let hideNav = false;

  // Loop through each of the routes and create a new router() for each one, 
  // with auth/admin checks, etc.

  routes.forEach(route => {
    router(
      route.path,

      // Set the params variable
      (ctx, next) => {
        params = ctx.params;
        next()
      },

      // Check if the user is authenticated, and forward them to the login
      // route if not.
      () => {
        page = route.component;
      }
    )
  });

  router.start();

  // Check user logon status on page load
  onMount(async () => {
    
    if(user.token) {
      const checkUser = await pingUser(user.token);

      if (checkUser) {
        // Update token expiry
        $userData.token_expires_at = checkUser.token_expires_at;
        return true;
      }
      // User not logged in, clear local storage
      userData.set({});
      return false;
    }
  });


  // Handle hiding nav and footer on specific pages
  function handleHideNav(event) {
    event.detail.hidden ? hideNav = true : hideNav = false;
  }

  // Import components for the main app
  import Navbar from './components/nav/Navbar.svelte';
</script>

<main>
  {#if hideNav == false}
    <Navbar />
  {/if}

  <svelte:component this={page} params={params} on:hideNav={handleHideNav} />
</main>

<style lang="postcss" global>
  /* Load Tailwind CSS */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer utilities { 
    .inset-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
