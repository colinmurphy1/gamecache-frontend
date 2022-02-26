<script>
  import { Link } from 'svelte-navigator';

  export let url;
  export let title;
</script>

<li>
  <Link
    to={url}
    class="px-4 py-2 block hover:bg-gray-600 hover:text-white font-semibold"
  >{title}</Link>
</li>
