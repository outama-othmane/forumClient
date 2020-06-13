<template>
	<div class="">
		<template v-for="i in 1">
			<ShadowDiscussion />
		</template>
		<div class="">
			<div>
				<template v-for="i in 5">
					<ShadowPost />
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import ShadowPost from '~/components/Shadows/ShadowPost'
	import ShadowDiscussion from '~/components/Shadows/ShadowSlugDiscussion'
	export default {
		components: {
			ShadowPost,
			ShadowDiscussion,
		},
	}
</script>