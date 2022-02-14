<script>
  import NavItem from './NavItem.svelte';
  import LoggedInAs from './LoggedInAs.svelte';

  // Import stores
  import { userData } from '../../stores/userdata.js';
  let user;
  userData.subscribe(value => user = value);
  
</script>

<nav class="bg-gray-200 shadow mb-2 border-b border-gray-400">
  <div class="container max-w-screen-xl mx-auto md:flex md:flex-row md:justify-between">
    <ul class="md:flex md:flex-row self-center">
      <NavItem url="/" title="Home" />
      <NavItem url="/news" title="News" />
      <NavItem url="/games" title="Games" />
      <NavItem url="/users" title="Users" />
    </ul>

    <!-- Display a border on small screens -->
    <hr class="border-t border-gray-400 md:display-none">

    <ul class="md:flex md:flex-row self-center">
      <!-- Show buttons depending on logon state -->
      {#if user.token}
        <!-- Logged in -->
        <LoggedInAs username={user.username} />
        <!--<NavItem url="/users/{user.username}" title="{user.username}" />-->
        <NavItem url="/logout" title="Logout" />
      {:else}
        <!-- Not logged in -->
        <NavItem url="/login" title="Login" />
        <NavItem url="/register" title="Register" />
      {/if}
    </ul>
  </div>
</nav>
