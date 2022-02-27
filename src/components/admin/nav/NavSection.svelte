<script>
  import NavCategory from "./NavCategory.svelte";
  export let title;
</script>

<li class="my-2 first:mt-0">
  <NavCategory>{title}</NavCategory>
  <ul>
    <slot />
  </ul>
</li>
