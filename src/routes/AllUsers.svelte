<script>
  import { onMount } from "svelte";
  import getAllUsers from "../api/profile/getAllUsers.js";

  import Page from "../components/Page.svelte";
  import UserBox from "../components/allusers/UserBox.svelte";
  import Alert from "../components/Alert.svelte";

  // Import the userData store
  import { userData } from '../stores/userdata.js';

  export let params;

  
  // Users will be stored here
  let users = [];

  let usersLoaded = false;
  let user;
  userData.subscribe(value => user = value);

  onMount(async () => {
    try {
      // If the user is logged in, pass the token along with the request
      // This is so you can see yourself in the list if you have a hidden profile.
      if(user.token) { 
        users = await getAllUsers(user.token);
      }
      else {
        users = await getAllUsers();
      }
    }
    catch(error) {
      console.log('Could not users: ', error);
      return false;
    }

    usersLoaded = true;
  });
</script>

<Page>

  <h1 class="text-4xl my-5 font-semibold ">
    All users
  </h1>

  {#if usersLoaded}
    {#if users.length > 0}
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-1">
        {#each users as user (user.id)}
          <UserBox username={user.username} online={user.online} />
        {/each}
      </div>
    {:else}
      <Alert message="There are no user accounts" />
    {/if}
  {:else}
    <Alert message="Could not load users" level="warning" />
  {/if}



  
</Page>
