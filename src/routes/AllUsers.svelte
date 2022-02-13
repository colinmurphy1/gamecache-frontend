<script>
  import { onMount } from "svelte";
  import getAllUsers from "../api/profile/getAllUsers.js";

  import Page from "../components/Page.svelte";
  import UserBox from "../components/allusers/UserBox.svelte";

  // Import the userData store
  import { userData } from '../stores/userdata.js';

  export let params;

  
  // Users will be stored here
  let users = [];

  let user;
  userData.subscribe(value => user = value);

  onMount(async () => {

    if(user.token) { 
      users = await getAllUsers(user.token);
    }
    else {
      users = await getAllUsers();
    }

    
  });
</script>

<Page>

  <h1 class="text-4xl my-5 font-semibold ">
    All users
  </h1>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-1">
    {#each users as user (user.id)}
      <UserBox username={user.username} online={user.online} />
    {/each}
  </div>
  
</Page>
