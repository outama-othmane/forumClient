<template>
	<Alert class="mt-4">
		An error occured while fetching posts. <a href="#" class="text-blue-400 bold" @click.prevent="tryAgain">Try again</a>
	</Alert>
</template>

<script type="text/javascript">
	import Alert from '~/components/Cards/Alert'
	import { EventBus } from '~/plugins/event-bus'
	export default {
		components: {
			Alert,
		},
		methods: {
			tryAgain() {
				EventBus.$emit('fetching:posts:again', true)
			}
		}
	}
</script>