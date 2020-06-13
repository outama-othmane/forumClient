<template>
	<div class="flex items-center justify-between pb-1 mb-4 border-b border-solid border-gray-200 flex-col sm:flex-row">
		<div class="w-full">
			<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900">{{ discussion.title }}</h3>
		</div>
		<div class="flex items-center justify-between flex-row-reverse my-2 sm:my-0">
			<template v-if="user.canEdit">
				<nuxt-link to="/" class="block bg-blue-400 text-white py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded">Edit this discussion</nuxt-link>
			</template>
			<nuxt-link :to="channelLink" class="block bg-gray-500 text-white py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded">{{ channel.name }}</nuxt-link>
			<div class="flex items-center justify-center text-gray-600 ml-4">
	          <div class="mr-1">
	            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 fill-current"><path class="heroicon-ui" d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"/></svg>
	          </div>
	          <span class="text-xs font-bold">{{ discussion.posts_count }}</span>
	        </div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			discussion: {
				required: true,
				type: Object,
			}
		},
		computed: {
			channel() {
				return this.discussion.channels.data || {}
			},
			user() {
				return this.discussion.user || {}
			},
		    channelLink() {
				return '/channels/' + this.channel.slug || ''
		    },
		},
		methods: {
			close() {

			},
			destroy() {

			}
		},
	}
</script>