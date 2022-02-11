<script>
  export let stars;

  // Give a numeric rating on mouse over, and display "Unrated" on 0 stars
  const title = stars ? `${stars} stars` : 'Unrated';
</script>

<span class="star-rating-{stars}" title={title}></span>

<style>
.star-rating-0 {
  color:grey;
}
.star-rating-0:before {
  content:"\2606\2606\2606\2606\2606"
}
.star-rating-1:before {
  content:"\2605\2606\2606\2606\2606"
}
.star-rating-2:before {
  content:"\2605\2605\2606\2606\2606"
}
.star-rating-3:before {
  content:"\2605\2605\2605\2606\2606"
}
.star-rating-4:before {
  content:"\2605\2605\2605\2605\2606"
}
.star-rating-5:before {
  content:"\2605\2605\2605\2605\2605"
}
</style>