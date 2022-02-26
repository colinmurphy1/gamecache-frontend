<script>
  import { onMount } from "svelte";

  import getNews from "../api/news/getNews.js";

  import Page from "../components/Page.svelte";
  import Post from "../components/news/Post.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Alert from "../components/Alert.svelte";

  // posts is an array
  let newsLoaded = false;
  let posts = [];

  // Load all news articles on page load
  onMount(async () => {
    try {
      posts = await getNews();
    }
    catch(error) {
      console.log('Could not load news: ', error);
      return false;
    }
    newsLoaded = true;

  });
</script>

<Page>
  <PageTitle title="News" />

  {#if newsLoaded}
    {#each posts as post (post.id)}
      <Post title={post.title} author={post.User.username} creationDate={post.createdAt} content={post.content} />
    {:else}
      <Alert message="There is no news to display." />
    {/each}
  {/if}
</Page>

