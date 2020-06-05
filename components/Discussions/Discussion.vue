<template>
	<div class="relative flex rounded py-2 px-3 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-200 flex-col sm:flex-row sm:border-none sm:mb-0 border border-solid border-gray-200 mb-4">
      <div class="w-full mr-0 sm:w-auto sm:mr-6 sm:block hidden">
        <a href="#" class="relative w-12-5 h-12-5 inline-block">
          <img :src="lastPostAuthor.avatar" class="w-full h-full rounded-full object-cover border border-solid border-text-gray-500" alt="avatar" :title="lastPostAuthor.name" />
        </a>
      </div>
      <div class="w-full sm:w-5/6" @click="discussionClicked">
        <h3 class="m-0 tracking-tight font-medium mb-1 text-lg">
          <nuxt-link :to="link" class="text-gray-900">
            {{ discussion.title }}
          </nuxt-link>
        </h3>
        <div class="text-xs text-gray-600">
          <a href="#" class="uppercase font-bold text-blue-400">{{ lastPostAuthor.name }}</a>
          {{ postedOrCreated }}
          <span class="font-bold">{{ lastPost.created_at_humans }}</span>
        </div>
      </div>
      <div class="flex items-center justify-between flex-row-reverse mt-2 sm:mt-0">
        <nuxt-link :to="channelLink" class="block bg-gray-500 text-white py-1 px-2 transition-all duration-200 ease-in-out text-xs ml-4 text-center w-24 rounded">{{ channel.name }}</nuxt-link>
        <div class="flex items-center justify-center text-gray-600 ml-4">
          <div class="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 fill-current"><path class="heroicon-ui" d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2zM20 5H4v10h13a1 1 0 0 1 .7.3l2.3 2.29V5z"/></svg>
          </div>
          <span class="text-xs font-bold">{{ discussion.posts_count }}</span>
        </div>
        <!-- <div class="flex items-center justify-center text-gray-600 ml-4">
          <div class="mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  class="w-4 fill-current"><path class="heroicon-ui" d="M17.62 10H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5c-1.2 0-2.3-.72-2.74-1.79l-3.5-7-.03-.06A3 3 0 0 1 5 9h5V4c0-1.1.9-2 2-2h1.62l4 8zM16 11.24L12.38 4H12v7H5a1 1 0 0 0-.93 1.36l3.5 7.02a1 1 0 0 0 .93.62H16v-8.76zm2 .76v8h2v-8h-2z"/></svg>
          </div>
          <span class="text-xs font-bold">{{ discussion.votes_count }}</span>
        </div> -->
      </div>
    </div>
</template>

<script>
	export default {
    props: {
      discussion:{
        type: Object,
        required: true
      }
    },
    computed: {
      link() {
        return '/discussions/' + this.discussion.slug
      },
      channel() {
        return this.discussion.channels.data
      },
      channelLink() {
        return '/channels/' + this.channel.slug
      },
      lastPost() {
        return this.discussion.last_post.data
      },
      lastPostAuthor() {
        return this.lastPost.author.data
      },
      postedOrCreated() {
        return this.discussion.created_at == this.lastPost.created_at ? 'created' : 'posted'
      }
    },
		methods: {
			discussionClicked() {
				this.$router.push(this.link)
			}
		}
	}
</script>