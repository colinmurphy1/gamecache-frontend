<script>
  import Page from "../components/Page.svelte";
  import Alert from "../components/Alert.svelte";
</script>
<Page>
  <Alert
    title="Unauthorized"
    message="You are not authorized to view this page."
    level="danger"
  />
</Page>
