<script>
  import { Link } from 'svelte-navigator';

  export let url;
  export let title;
</script>

<li>
  <Link
    to={url}
    class="px-2 py-1 block hover:text-blue-700 hover:underline font-semibold"
  >{title}</Link>
</li>
