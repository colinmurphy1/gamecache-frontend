<script>
  export let username;
</script>

<li class="px-4 py-2 text-base">
  <span class="align-middle">
    Logged in as
    <a href="/users/{username}" class="font-semibold hover:underline">
      {username}
    </a>
  </span>
</li>
