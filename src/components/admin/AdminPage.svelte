<script>
  import Page from "../Page.svelte";
  
  import NavSection from "./nav/NavSection.svelte";
  import NavItem from "./nav/NavItem.svelte";
</script>

<Page>
  <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
    <aside class="border-b lg:border-r lg:border-b-0 border-gray-400 pt-4">
      <ul>
        <NavSection title="Game Database">
          <NavItem url="/admin/game/add" title="Add Game" />
          <NavItem url="/admin/developer/add" title="Add Developer" />
          <NavItem url="/admin/platform/add" title="Add Platform" />
          <NavItem url="/admin/manufacturer/add" title="Add Manufacturer" />
        </NavSection>
        <NavSection title="User Management">
          <NavItem url="/admin/user/" title="Manage Users" />
        </NavSection>
        <NavSection title="News">
          <NavItem url="/admin/news/post/add" title="New Post" />
          <NavItem url="/admin/news/post/manage" title="Manage Posts" />
        </NavSection>
      </ul>
    </aside>
    <section class="col-span-3">
      <slot />
    </section>
  </div>
</Page>
