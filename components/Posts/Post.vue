<template>
	<div class="relative flex rounded py-2 px-3 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 flex-col sm:flex-row sm:border-none sm:mb-0 border border-solid border-gray-200 mb-4 post" :id="`post_${post.id}`">
		<div class="w-full mr-0 sm:w-auto sm:mr-6 sm:block hidden">
	        <nuxt-link :to="authorLink" class="relative w-12-5 h-12-5 inline-block">
	          <img :src="author.avatar" class="w-full h-full rounded-full object-cover border border-solid border-text-gray-500" alt="avatar" :title="author.name" />
	        </nuxt-link>
      	</div>
		<div class="w-full sm:w-5/6 mb-3">
			<div class="text-xs text-gray-600 font-bold mb-4">
				<nuxt-link :to="authorLink" class="uppercase font-bold text-sm text-gray-900">
					<template v-if="$auth.loggedIn && author.id == $auth.user.id">
						<span class="text-blue-400 text-capitalize">You</span>
					</template>
					<template v-else>
						{{ author.name }}
					</template>
				</nuxt-link>
				•
				<span>{{ post.created_at_humans }}</span>
			</div>
			<div class="">
				<template v-if="!editing">
					<div class="contentMark tracking-normal mb-4 text-gray-900 text-sm" v-highlightjs v-html="post.content_markdown"></div>
				</template>
				<template v-else>
					<EditPost :post="post" />
				</template>
			</div>
			<div class="flex visible sm:invisible items-center transition-all duration-200 ease-in-out reaction">
				<a href="#" class="flex text-gray-600 text-xs mr-3 font-bold transition-all duration-200 ease-in-out hover:text-gray-900" :class="{ 'text-blue-400 hover:text-blue-400': user.isLiked }" @click.prevent="vote">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 h-4 fill-current"><path class="heroicon-ui" d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"/></svg>
					&nbsp;
					{{ (post.votes_count > 0) ? post.votes_count : '' }}
				</a>
				<template v-if="$auth.loggedIn && !discussion.isClosed">
					<!-- <a href="#" class="text-gray-600 font-bold text-xs transition-all duration-200 ease-in-out hover:text-gray-900">
						Replay
					</a> -->
					<template v-if="user.canEdit">
						<a href="#" class="ml-3 text-gray-600 font-bold text-xs transition-all duration-200 ease-in-out hover:text-gray-900" @click.prevent="edit">
							<template v-if="editing">Close editing</template>
							<template v-else>Edit</template>
						</a>
					</template>
					<template v-if="user.canDelete">
						<a href="#" class="ml-3 text-blue-400 font-bold text-xs transition-all duration-200 ease-in-out hover:text-gray-900" @click.prevent="destroy">
							Delete
						</a>
					</template>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import { EventBus } from '~/plugins/event-bus'
	import EditPost from '~/components/Posts/EditPost'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				editing: false,
			}
		},
		props: {
	      post:{
	        type: Object,
	        required: true
	      }
	    },
	    components: {
	    	EditPost,
	    },
	    computed: {
	    	author() {
	    		return this.post.author.data
	    	},
	    	authorLink() {
	    		return ''
	    	},
	    	user() {
	    		return this.post.user
	    	},
	    	...mapGetters({
	    		discussion: 'currentDiscussion'
	    	})
	    },

	    methods: {
	    	async destroy () {
                if (confirm('Are you sure you want to delete this post?')) {
                    try {
                    	await this.$axios.delete(`/discussions/${this.$route.params.discussion}/posts/${this.post.id}`)
                    	
                    	EventBus.$emit('post:deleted', this.post)
                    } catch(e) {
                    	if (e.response) {
                    		if (e.response.status >= 400 && e.response.status < 500) {
                    			this.$nuxt.error({ statusCode: 400, message: 'An error occured while deleting your post. Please try again later.' })
                    		}
                    	} else {
                    		this.$nuxt.error({ statusCode: 500, message: 'An error occured while deleting your post. Please refresh the page and try again.' })
                    	}
                    }
                }
            },
            async vote() {
            	if (!this.$auth.loggedIn) return
            	try {
            		if (!this.user.isLiked) {
            			this.user.isLiked = true
            			this.post.votes_count++
            			await this.$axios.$post(`posts/${this.post.id}/votes`)
            		} else {
            			this.user.isLiked = false
            			this.post.votes_count--
            			await this.$axios.$delete(`posts/${this.post.id}/votes/delete`)
            		}
            	} catch(e) {
            		//
            	}
            },
            edit() {
            	this.editing = !this.editing
            	
            	if(this.editing)
					this.scrollToEdit()
            },
            scrollToEdit() {
            	const el = document.querySelector(`#post_${this.post.id}`)
			    if (el) {
			    	const scrollTo = el.getBoundingClientRect().top - 64
			      	window.scrollBy({ 
			      		top: scrollTo, 
			      		left: 0, 
			      		behavior: 'smooth' 
			      	})
			    }
            },
            editPost(post) {
            	if (post.id != this.post.id) return
            	this.post = post
            	this.editing = false
            }
	    },

	    mounted() {
	    	EventBus.$on('post:edited', this.editPost)
	    }
	}
</script>	