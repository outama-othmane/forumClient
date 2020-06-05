<template>
	<div>
		<template v-for="post in posts">
			<Post :post="post" />
		</template>
		<template v-if="$fetchState.pending">
			<template v-for="i in 1">
				<ShadowPost />
			</template>
		</template>
		<div v-observe-visibility="(posts.length > 0 && !$fetchState.pending) ? lazyLoadPosts : false"></div>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	import Post from '~/components/Posts/Post'
	import ShadowPost from '~/components/Posts/ShadowPost'
	import Alert from '~/components/Alert'
	import { mapGetters } from 'vuex'
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
			Alert
		},
		computed: {
			...mapGetters({
				discussion: 'currentDiscussion'
			})
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
				} else {
					this.$nuxt.error({ statusCode: 500, message: 'Server error!' })
				}
			}
		},
		fetchOnServer: false,
		activated() {
			// Call fetch again if last fetch more than 5min ago
			if (this.$fetchState.timestamp <= Date.now() - 5*60000) {
				this.$fetch()
			}
		},
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
				Object.assign(this.posts.find((p) => p.id == post.id ), post)
			}
		},
		mounted() {
			EventBus.$on('post:stored', this.appendPost)
			EventBus.$on('post:deleted', this.deletePost)
			EventBus.$on('post:edited', this.editPost)
		}
	}
</script>