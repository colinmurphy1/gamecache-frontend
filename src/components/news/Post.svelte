<script>
  export let title;
  export let author;
  export let creationDate;
  export let content;
</script>

<article>
  <h2>{title}</h2>
  <div>
    Posted by <a href="/profile/{author}">{author}</a>
    on {creationDate}
  </div>

  <div>
    {content}
  </div>

</article>

<style>
  article {
    border: solid 1px #000;
    padding: .25em;
    margin: 1em;
  }

</style>