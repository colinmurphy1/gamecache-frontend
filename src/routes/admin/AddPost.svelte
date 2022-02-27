<script>
  import { navigate } from 'svelte-navigator';

  // Import Svelte-use-form for the form
  import { useForm, validators, required, minLength } from "svelte-use-form";
  const form = useForm();

  // Import the userData store
  import { userData } from '../../stores/userdata.js';

  // Import API calls
  import addNews from "../../api/news/addNews.js";

  // Import components
  import AdminPage from "../../components/admin/AdminPage.svelte";
  import PageTitle from "../../components/headings/PageTitle.svelte";
  import Alert from "../../components/Alert.svelte";
  import Button from "../../components/Button.svelte";

  // Form Data
  let postTitle = "";
  let postContent = "";
  
  let response = "";


  const handleNewPost = async () => {
    let newsReq;
    try {
      newsReq = await addNews(postTitle, postContent, $userData.token);
    }
    catch(exception) {
      console.log('error:', exception);
      return false;
    }

    // Reset the form
    navigate('/news');
    return true;
  }
</script>

<AdminPage>
  <PageTitle title="New Post" />

  <form use:form on:submit|preventDefault={handleNewPost}>
    <div class="mt-4">
      <input
        type="text"
        name="postTitle"
        id="postTitle"
        class="w-full form-select appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded"
        bind:value={postTitle}
        use:validators={[required], [minLength(1)]}
        placeholder="Post title"
      />
    </div>
    <div class="mt-4">
      <textarea
        name="postContent"
        id="postContent"
        class="w-full appearance-none border-2 border-gray-200 px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500 rounded resize-y h-40"
        bind:value={postContent}
        use:validators={[required]}
        placeholder="Post content"
      ></textarea>
    </div>
    <div class="mt-4">
      <Button text="Submit post" />
    </div>
  </form>

  {#if response}
    <Alert message={response} />
  {/if}

</AdminPage>
