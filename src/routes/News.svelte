<script>
  import { onMount } from "svelte";

  import getNews from "../api/news/getNews.js";

  import Page from "../components/Page.svelte";
  import Post from "../components/news/Post.svelte";
  import PageTitle from "../components/headings/PageTitle.svelte";
  import Alert from "../components/Alert.svelte";

  export let params;

  // posts is an array
  let posts = [];

  // Load all news articles on page load
  onMount(async () => {
    posts = await getNews();
  });
</script>

<Page>
  <PageTitle title="News" />

  {#each posts as post (post.id)}
    <Post title={post.title} author={post.User.username} creationDate={post.createdAt} content={post.content} />
  {:else}
    <Alert message="There is no news to display." />
  {/each}
</Page>

