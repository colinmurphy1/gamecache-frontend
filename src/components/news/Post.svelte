<script>
  // date-fns
  import { format, parseISO } from 'date-fns';

  // Font Awesome
  import Icon from 'svelte-awesome';
  import { calendar, user } from 'svelte-awesome/icons';

  // Marked
  import { marked } from 'marked';

  export let title;
  export let author;
  export let creationDate;
  export let content;

  creationDate = format(parseISO(creationDate), 'd MMM yyyy');
</script>

<article class="shadow bg-gray-100 my-4 border border-gray-400">
  <h2 class="border-b border-gray-400 font-semibold bg-gray-200 text-gray-800 py-1 px-2 text-xl">
    {title}
  </h2>

  <div class="border-b border-gray-400 text-sm">
    <div class="inline-block py-1 px-2">
      <Icon data={calendar} class="align-sub" /> {creationDate}
    </div>
    <div class="inline-block py-1 px-2">
      <a href="/users/{author}" class="px-2 py-0.5 rounded text-sm bg-blue-400 hover:bg-blue-500 text-white font-semibold">
        <Icon data={user} class="align-sub" /> 
        {author}
      </a>
    </div>
  </div>

  <div class="p-2">
    {@html marked.parse(content)}
  </div>

</article>
