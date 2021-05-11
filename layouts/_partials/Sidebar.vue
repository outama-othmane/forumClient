<template>
	<aside class="relative w-1/5 bg-white sticky?lg:h-(screen-16) overflow-y-auto pt-8 px-3 pb-5 hidden md:block">
		<div class="py-12 pl-6 pr-8">
			<div class="mb-8">
				<nuxt-link to="/discussions/new" class="inline-block bg-blue-400 text-white py-2 px-3 rounded transition-all duration-200 ease-in-out hover:bg-opacity-75">Start a discussion</nuxt-link>
			</div>
			<nav class="mb-8">
				<nuxt-link to="/" class="relative block py-1 px-2 font-medium text-sm transition-all duration-200 ease-in-out mb-1" :class="currentPage('/')">All discussions</nuxt-link>
				<!-- <nuxt-link to="/channels" class="relative block py-1 px-2 font-medium text-sm transition-all duration-200 ease-in-out mb-1" :class="currentPage('/channels')">All channels</nuxt-link> -->
			</nav>
			<nav class="tags">
				<span class="block text-gray-500 font-bold uppercase mb-2 tracking-wide	text-xs">Channels</span>
				<template v-if="channels.length">
					<template v-for="channel in channels">
						<nuxt-link :to="(`/channels/${channel.slug}`)" class="relative block py-1 px-2 text-gray-600 text-sm font-medium transition-all duration-200 ease-in-out mb-1 hover:text-gray-900" :key="channel.id" :class="currentPage(`/channels/${channel.slug}`)">{{ channel.name }}</nuxt-link>
					</template>
				</template>
				<nuxt-link to="/channels" class="relative block py-1 px-2 text-gray-600 text-sm font-medium transition-all duration-200 ease-in-out mb-1 hover:text-gray-900">See more ...</nuxt-link>
			</nav>
		</div>
	</aside>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				classes: {
					active: 'rounded text-blue-400 bg-blue-400 bg-opacity-10 hover:text-blue-400',
					inactive: 'text-gray-600 hover:text-gray-900'
				}
			}
		},
		computed: {
			...mapGetters({
				channels: 'channels',
			}),
		},

		methods: {
			currentPage(page) {
				return page == this.$route.path ? this.classes.active : this.classes.inactive
			}
		}
	}
</script>