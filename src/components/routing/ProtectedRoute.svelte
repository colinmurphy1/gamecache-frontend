<script>
  import { Route, navigate, useResolve, useLocation } from 'svelte-navigator';
  const resolve = useResolve();
  const location = useLocation();

  // Import stores
  import { userData } from '../../stores/userdata.js';

  // Import components
  import Unauthorized from "../../routes/Unauthorized.svelte";

  export let path;
  export let component;
  export let admin = false;
  let unauthorized = false;

  // Only check login if this is the correct page
  if (resolve(path) == $location.pathname) {

    // If there is no token, redirect to login
    if (!$userData.token) {
      console.log('Not logged in, redirecting...');
      navigate('/login');
    }

    // Admin verification
    if (admin) {
      if(!$userData.admin) {
        unauthorized = true;
      }
    }

  }
</script>


<Route {path}>
  {#if $userData.token}
    {#if !unauthorized}
      <svelte:component this={component} />
    {:else}
      <Unauthorized />
    {/if}
  {/if}
</Route>


