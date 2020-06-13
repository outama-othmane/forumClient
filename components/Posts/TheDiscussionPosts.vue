<template>
	<div>
		<template v-for="post in posts">
			<Post :post="post" />
		</template>
		<template v-if="$fetchState.pending">
			<template v-for="i in (posts.length > 0) ? 1 : 5">
				<ShadowPost />
			</template>
		</template>
		<template v-else-if="$fetchState.error">
			<FetchingPostsError />
    	</template>
    	<template v-else>
			<div v-observe-visibility="(posts.length > 0 && !$fetchState.pending) ? lazyLoadPosts : false"></div>
    	</template>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	import Post from '~/components/Posts/Post'
	import ShadowPost from '~/components/Shadows/ShadowPost'
	import Alert from '~/components/Cards/Alert'
	import FetchingPostsError from '~/components/Cards/FetchingPostsError'
	export default {
		data() {
			return {
				posts: [],
				page: 1,
      			lastPage: 1,
			}
		},
		components: {
			Post,
			ShadowPost,
			Alert,
			FetchingPostsError
		},
		async fetch() {
			try {
				let posts = await this.$axios.$get(`discussions/${this.$route.params.discussion}/posts?page=${this.page}`)

				this.posts.push(...posts.data)
				this.lastPage = posts.meta.last_page
			} catch(e) {
				if (e.response) {
					if (e.response.status === 404) 
						this.$nuxt.error({ statusCode: 404, message: 'Discussion not found!' })
					else if (e.response.status >= 400)
						this.$nuxt.error({ statusCode: 500, message: e.response.data.message || 'Server Error!' })
				} else {
					this.page--
					throw new Error('Error while fetching posts')
				}
			}
		},
		fetchOnServer: false,
		methods: {
			lazyLoadPosts(isVisible) {
				if (!isVisible) { return }
				if (this.page >= this.lastPage) { return }

				this.page++
				this.$fetch()
			},
			appendPost(post) {
				this.posts.push(post)
			},
			deletePost(post) {
                this.posts = this.posts.filter((c) => c.id !== post.id)
                // pop up notification
			},
			editPost(post) {
				let the = this.posts.find((p) => p.id == post.id )
				if (the) {
					Object.assign(this.posts.find((p) => p.id == post.id ), post)
				}
			}
		},
		mounted() {
			EventBus.$on('post:stored', this.appendPost)
			EventBus.$on('post:deleted', this.deletePost)
			EventBus.$on('post:edited', this.editPost)

			EventBus.$on('fetching:posts:again', this.lazyLoadPosts)
		}
	}
</script>