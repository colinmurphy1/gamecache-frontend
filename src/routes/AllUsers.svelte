<script>
  import { onMount } from "svelte";
  import getAllUsers from "../api/profile/getAllUsers.js";

  import UserBox from "../components/allUsers/UserBox.svelte"

  export let params;

  
  // Users will be stored here
  let users = [];

  
  onMount(async () => {
    users = await getAllUsers();
  });
</script>

<section class="px-4">

  <h1 class="text-4xl my-5 font-semibold ">
    All users
  </h1>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-1">
    {#each users as user (user.id)}
      <UserBox username={user.username} online={user.online} />
    {/each}
  </div>
</section>

