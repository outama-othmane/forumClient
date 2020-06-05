<template>
  <div v-if="error">
    <div class="w-full min-h-screen-16 flex items-center relative">
      <div class="w-full my-0 mx-auto mx-4 sm:px-0 px-4">
        <div class="text-center mb-8">
          <h1 class="text-center font-bold m-0 mb-1 text-gray-900 text-6xl">{{ error.statusCode }}.</h1>
            <template v-if="error.statusCode == 404">
              <h3 class="text-gray-600 font-bold text-xl">Let's <nuxt-link to="/" class="text-gray-700">head back home</nuxt-link>  and take it from there.</h3>
            </template>
            <template v-else>
              <h3 class="text-gray-600 font-bold text-xl">
                {{ error.message }}
              </h3>
              <a href="/" class="mt-8 inline-block font-bold bg-gray-600 text-white py-2 px-4 rounded transition-all duration-200 ease-in-out border-none outline-0 cursor-pointer hover:outline-none hover:bg-opacity-75">Back home</a> 
            </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout:'empty',
  data() {
    return {
      errors: {
        100: { statusCode: 500, message: 'Error occured while fetching discussions. #100' },
      }
    }
  },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    resolveCode() {
      return this.errors[this.statusCode] || { statusCode: null, message: '' }
    }
  },
  head() {
    return {
      title: this.error.message || 'Unexpected Error!'
    }
  }
}
</script>
