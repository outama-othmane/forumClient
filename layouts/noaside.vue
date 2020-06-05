<template>
  <div>
    <Navigation />
    <div class="container">
      <div class="relative flex justify-between mt-16">
        <section class="w-full relative">
          <nuxt />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from "~/layouts/_partials/Navigation.vue";
  export default {
    components: {
      Navigation,
    }
  }
</script>