<template>
	<div class="w-full relative flex flex-wrap">
		<div class="w-full mb-8 text-center">
        	<div class="flex">
				<ShadowUserInfo />
			</div>
		</div>
		<div class="w-full">
			<content-placeholders class="flex pb-1 mb-4 border-b border-solid border-gray-200" :rounded="true">
				<content-placeholders-text :lines="1" style="width: 45%" />
			</content-placeholders>
			<template v-for="i in 5">
				<ShadowDiscussion />
			</template>
		</div>
	</div>
</template>

<script>
	import ShadowDiscussion from '~/components/Shadows/ShadowDiscussion'
	import ShadowUserInfo from '~/components/Shadows/ShadowUserInfo'
	export default {
		components: {
			ShadowUserInfo,
			ShadowDiscussion,
		},
	}
</script>