<script>
  export let url;
  export let title;
</script>

<li>
  <a href="{url}">{title}</a>
</li>

<style>
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: .5em 1em;
    font-weight: 600;
  }
  a:hover {
    background: #ccc;
    text-decoration: none;
  }
</style>