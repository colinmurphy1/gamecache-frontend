<script>
  import { onMount } from "svelte";
  import { Link } from 'svelte-navigator';

  // API calls
  import getAllUsers from "../../api/admin/getAllUsers.js";
  import setUserStatus from "../../api/admin/setUserStatus.js";

  // Stores
  import { userData } from '../../stores/userdata.js';

  // Load components
  import AdminPage from "../../components/admin/AdminPage.svelte";
  import PageTitle from "../../components/headings/PageTitle.svelte";
  import Alert from "../../components/Alert.svelte";


  let users = [];

  const disableUser = async (username) => {
    let disableUser;
    try {
      disableUser = await setUserStatus(username, $userData.token);
    }
    catch(error) {
      console.log('Error:', error);
      return false;
    }
    console.log(disableUser);
    await getUsers();
  };


  const getUsers = async () => {
    try {
      users = await getAllUsers($userData.token);
    }
    catch(error) {
      console.log('Error loading users:', error);
      return false;
    }
  };

  // Load all users
  onMount(async () => {
    // get users
    await getUsers();
  });
</script>

<AdminPage>
  <PageTitle title="User Management" />

  {#if users.length > 0}
  <table class="table-auto border-gray-400 border w-full">
    <thead class="bg-gray-200 text-gray-800 text-left border-b border-gray-400">
      <tr>
        <th class="p-1">
          Username
        </th>
        <th class="p-1">
          Email
        </th>
        <th class="p-1">
          Online
        </th>
        <th class="p-1">
          Admin
        </th>
        <th class="p-1">
          Enabled
        </th>
        <th class="p-1">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {#each users as user (user.id)}
        <tr class="border border-gray-400">
          <td class="p-1">
            <Link to="/users/{user.username}">
              {user.username}
            </Link>
          </td>
          <td class="p-1">
            {user.email}
          </td>
          <td class="p-1">
            {user.online ? 'Yes' : 'No'}
          </td>
          <td class="p-1">
            {user.admin ? 'Yes' : 'No'}
          </td>
          <td class="p-1">
            {user.enabled ? 'Yes' : 'No'}
          </td>
          <td class="p-1">
            {#if user.username != $userData.username}
              <button
                class="px-2 py-0.5 rounded bg-blue-400 hover:bg-blue-500 text-white font-semibold"
                on:click={disableUser(user.username)}
              >Disable</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  {:else}
    <Alert message="There are no user accounts" />
  {/if}

</AdminPage>
