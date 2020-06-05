<template>
	<header class="fixed inset-x-0 top-0 z-50 w-full h-16 bg-white flex items-center border-b border-solid border-gray-200">
		<div class="container">
			<div class="flex items-center justify-between">
				<div class="w-1/4 py-0 px-6">
					<nuxt-link to="/" class="block mr-4">
						<img src="/images/logo.svg" alt="logo" title="Fresh" class="object-cover" />
					</nuxt-link>
				</div>
				<div class="w-3/4 flex items-center justify-between">
					<div class="relative w-3/4 flex items-center justify-center">
						<div class="relative w-full">
							<input type="text" class="block w-full border border-solid border-transparent rounded bg-gray-200 py-2 pr-4 pl-10 appearance-none transition-colors duration-100 ease-in-out outline-0 focus:outline-none focus:bg-white focus:border-gray-300 placeholder-gray-600" placeholder="Search forum" />
						</div>
						<div class="flex items-center absolute inset-0 pl-4 text-gray-600 pointer-events-none">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 fill-current"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
						</div>
					</div>
					<button class="flex px-6 items-center text-gray-500 outline-none border-none bg-transparent cursor-pointer focus:text-gray-700 md:hidden focus:outline-none" type="button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="fill-current"><path class="heroicon-ui" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg>
					</button>
					<nav class="hidden items-center justify-center md:flex">
						<template v-if="!$auth.loggedIn">
							<nuxt-link to="/auth/signin" class="inline-block text-gray-500 mr-5 hover:text-gray-700">Sign in</nuxt-link>
							<nuxt-link to="/auth/signup" class="inline-block bg-blue-400 text-white px-3 py-2 rounded transition-all duration-200 ease-in-out hover:bg-opacity-75">Sign up</nuxt-link>
						</template>
						<template v-else>
							<nuxt-link to="/" class="inline-block text-gray-500 mr-5 hover:text-gray-700">{{ $auth.user.name }}</nuxt-link>
							<a href="/" @click.prevent="logout" class="inline-block text-gray-500 hover:text-gray-700">Log out</a>
						</template>
					</nav>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		methods: {
            async logout () {
            	console.log('Hello')
                try {
                    let response = await this.$auth.logout()

                } catch(e) {
                    //
                }
            },
        }
	}
</script>