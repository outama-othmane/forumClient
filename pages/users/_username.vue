<template>
	<div class="w-full pt-10 md:pt-20 pr-12 pb-5 pl-12 relative">
		<!-- <template v-if="$fetchState.pending">
			<UserPageShadow />
		</template> -->
		<template v-if="user.name">
			<div class="w-full relative flex flex-wrap">
				<div class="w-full mb-8 text-center">
                	<div class="flex">
	                    <div class="flex flex-col mb-4 w-full">
						    <div class="mb-4 mx-auto">
						        <nuxt-link :to="$route.path">
						        	<img :src="user.avatar" alt="User avatar" :title="user.name" class="w-full max-w-32 rounded-full" />
						        </nuxt-link>
						    </div>
						    <h2 class="text-2xl text-gray-900 mb-4">{{ user.name }}</h2>
						    <p class="text-gray-600 text-sm mb-4">
						        {{ user.created_at }}
						    </p>
						    <p class="text-gray-600 text-sm mb-4">
						    	<strong>{{ user.discussions_count }}</strong> discussion{{ user.discussions_count > 1 ? 's' : '' }}
						    	&mdash;
						    	<strong>{{ user.posts_count }}</strong> post{{ user.posts_count > 1 ? 's' : '' }}
						    </p>
						</div>
					</div>
				</div>
				<template v-if="discussions.length > 0">
					<div class="w-full">
						<div class="flex pb-1 mb-4 border-b border-solid border-gray-200">
							<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900">Latest disucssions</h3>
						</div>
						<template v-for="discussion in discussions">
							<Discussion :discussion="discussion" />
						</template>
					</div>
				</template>
				<template v-if="posts.length > 0">
					<div class="w-full mt-12">
						<div class="flex pb-1 mb-4 border-b border-solid border-gray-200">
							<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900">Latest posts</h3>
						</div>
						<template v-for="post in posts">
							<div class="mb-4 border px-6 py-4 rounded shadow">
								<div>{{ post.content.slice(0, 100) }}...</div>
							</div>
						</template>
					</div>
				</template>
				<template v-if="$fetchState.pending">
					<UserContentShadow class="mt-12" />
				</template>
				<template v-if="loaded.length > 0 && !$fetchState.pending">
					<div v-observe-visibility="lazyLoadPosts"><span class="invisible">h</span></div>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
	import Discussion from '~/components/Discussions/Discussion'
	import UserContentShadow from '~/components/Shadows/UserContentShadow'
	export default {
		data() {
			return {
				user: {},
				discussions: [],
				posts: [],
				loaded: []
			}
		},
		components: {
			UserContentShadow,
			Discussion,
		},
		async asyncData({ params, app }) {
			try {
				let response = await app.$axios.$get(`users/${params.username}`)

				return {
					user: response.data
				}
			} catch (e) {
				if (e.response) {
					if (e.response.status === 404) 
						this.$nuxt.error({ statusCode: 404, message: 'User not found!' })
				} else {
					this.$nuxt.error({ statusCode: 500, message: 'Server error!' })
				}
			}
		},
		async fetch() {
			if (this.loaded.length > 2) {
				this.loaded = []
			}

			try {
				let load = (!this.loaded.length) ? 'discussions' : 'posts'

				let response = await this.$axios.$get(`users/${this.$route.params.username}/${load}`)

				if (load == 'discussions') {
					this.discussions = response.data
				} else if (load === 'posts') {
					this.posts = response.data
				}
				this.loaded.push(load)
			} catch(e) {
				//
			}
		},
		activated() {
			if (this.$fetchState.timestamp <= Date.now() - process.env.CACHE_TIME) {
				this.$fetch()
			}
		},
		fetchOnServer: false,
		methods: {
			lazyLoadPosts(isVisible) {
				if (!isVisible) { return }
				if (this.loaded.length > 1) { return }

				this.$fetch()
			},
		},
		head() {
			return {
				title: `${this.user.name} | ${process.env.APP_NAME}`
			}
		}
	}
</script>