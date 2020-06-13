<template>
	<div class="w-full pt-10 md:pt-20 pr-12 pb-5 pl-12">
		<template v-if="$fetchState.pending">
			<ShadowTheDiscussion />
		</template>
		<template v-else-if="discussion.title">
			<TheDiscussion :discussion="discussion" />
			<TheDiscussionPosts />
			<!-- New Post -->
			<div class="mt-8">
				<template v-if="discussion.isClosed">
					<Alert icon="info">This discussion is closed. It cannot accept replies anymore.</Alert>
				</template>
				<template v-else-if="$auth.loggedIn">
					<NewPost />
				</template>
				<template v-else>
					<p class="text-sm text-gray-600">
						Please 
						<nuxt-link to="/auth/signin" class="text-blue-400 font-medium text-decoration">sign in</nuxt-link> or 
						<nuxt-link to="/auth/signup" class="text-blue-400 font-medium">sign up</nuxt-link> to participate in this discussion!
					</p>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	import Alert from '~/components/Cards/Alert'
	import TheDiscussion from '~/components/Discussions/TheDiscussion'
	import NewPost from '~/components/Posts/NewPost'
	import TheDiscussionPosts from '~/components/Posts/TheDiscussionPosts'
	import ShadowTheDiscussion from '~/components/Shadows/ShadowTheDiscussion'
	export default {
		data() {
			return {
				discussion: {}
			}
		},
		components: {
			TheDiscussion,
			TheDiscussionPosts,
			NewPost,
			Alert,
			ShadowTheDiscussion,
		},
		async fetch() {
			try {
				let discussion = await this.$axios.$get(`discussions/${this.$route.params.discussion}`)

				this.discussion = discussion.data
				this.$store.commit('SET_CURRENT_DISCUSSION', this.discussion)
			} catch(e) {
				if (e.response) {
					if (e.response.status === 404) 
						this.$nuxt.error({ statusCode: 404, message: 'Discussion not found!' })
				} else {
					this.$nuxt.error({ statusCode: 500, message: 'Server error!' })
				}
			}
		},
		activated() {
			if (this.$fetchState.timestamp <= Date.now() - 5000) {
				this.$fetch()
			}
		},
		fetchOnServer: true,
		methods: {
			editDiscussion(discussion) {
				this.discussion = discussion

				this.$route.params.discussion = discussion.slug
				history.replaceState({}, null, `/discussions/${discussion.slug}`)
			}
		},
		mounted() {
			EventBus.$on('discussions:edited', this.editDiscussion)
		},
		head() {
			return {
				title: `${this.discussion.title || 'Loading'} - Forum`
			}
		}
	}
</script>