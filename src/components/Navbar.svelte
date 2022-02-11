<script>
  import NavItem from './NavItem.svelte';

  // Import stores
  import { userData } from '../stores/userdata.js';
  let user;
  userData.subscribe(value => user = value);
  
</script>

<nav>
  <ul class="left">
    <NavItem url="/" title="Home" />
    <NavItem url="/news" title="News" />
    <NavItem url="/games" title="Games" />
    <NavItem url="/users" title="Users" />
  </ul>

  <ul class="right">
    <!-- Show buttons depending on logon state -->
    {#if user.token_expires_at}
      <!-- Logged in -->
      <NavItem url="/profile/{user.username}" title="{user.username}" />
      <NavItem url="/logout" title="Logout" />
    {:else}
      <!-- Not logged in -->
      <NavItem url="/login" title="Login" />
      <NavItem url="/register" title="Register" />
    {/if}
  </ul>
</nav>

<style>
  nav {
    margin-bottom: .25em;
    background: #eee;
    display: flex;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    flex: auto;
  }

  .right { justify-content: flex-end;}

</style>