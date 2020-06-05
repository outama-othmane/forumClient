<template>
  <div>
    <Navigation />
    <div class="container">
      <div class="relative flex justify-between mt-16">
        <Sidebar />
        <section class="w-full md:w-4/5 relative">
          <nuxt keep-alive />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigation from "~/layouts/_partials/Navigation.vue";
  import Sidebar from "~/layouts/_partials/Sidebar.vue";
  export default {
    components: {
      Navigation,
      Sidebar,
    }
  }
</script>