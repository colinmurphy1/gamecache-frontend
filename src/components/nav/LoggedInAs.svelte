<script>
  import { Link } from 'svelte-navigator';
  export let username;
</script>

<li class="px-4 py-2">
  Logged in as

  <Link to="/users/{username}" replace={true} class="font-semibold hover:underline">
    {username}
  </Link>
</li>
