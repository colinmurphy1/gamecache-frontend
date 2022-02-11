<script>
  import { onMount } from "svelte";

  import { getProfile } from "../api/profile/getProfile.js";

  // Pass in parameters from App.svelte
  export let params;

  let username = params.username;


  let userProfileInfo;
  let userProfileGames;

  onMount((e) => {
    console.log(e);
  });

</script>

{#if userProfileInfo}

  <h2>{userProfileInfo.username}</h2>

{:else}

  <p>User does not exist</p>

{/if}
