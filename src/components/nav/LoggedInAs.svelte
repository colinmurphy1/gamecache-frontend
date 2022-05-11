<script>
  import Icon from 'svelte-awesome';
  import { user } from 'svelte-awesome/icons';

  import { Link } from 'svelte-navigator';
  export let username;
</script>

<li class="px-4 py-2">
  <Icon data={user} class="align-sub" />
  <Link to="/users/{username}" replace={true} class="font-semibold hover:underline">
    {username}
  </Link>
</li>
