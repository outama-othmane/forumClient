<template>
	<content-placeholders class="relative flex rounded py-2 px-3 cursor-pointer flex-col sm:flex-row sm:mb-0 mb-4 post" :rounded="true">
		<div class="w-full mr-0 sm:w-auto sm:mr-6 sm:block hidden">
	        <div class="relative w-12-5 h-12-5 inline-block">
	          <content-placeholders-img class="w-full h-full rounded-full" style="height: 100%; border-radius: 100%" />
	        </div>
	    </div>
		<div class="w-full sm:w-5/6 mb-3">
			<div class="flex items-center h-4 mb-4">
				<content-placeholders-text class="inline-block" style="width: 5rem" :lines="1" />
	          <span class="text-gray-300 mr-4 block">•</span>
	          <content-placeholders-text class="inline-block" style="width: 5rem" :lines="1" />
	        </div>
			<div class="">
				<content-placeholders-text class="mb-4" style="width: 65%" :lines="1" />
				<content-placeholders-text class="mb-4" style="width: 50%" :lines="1" />
				<content-placeholders-text class="mb-4" style="width: 70%" :lines="1" />
			</div>
		</div>
	</content-placeholders>
<!-- 	<div class="relative flex rounded py-2 px-3 transition-all duration-200 ease-in-out cursor-pointer flex-col sm:flex-row sm:border-none sm:mb-0 border border-solid border-gray-200 mb-4 post">
		<div class="w-full mr-0 sm:w-auto sm:mr-6 sm:block hidden">
	        <div class="relative w-12-5 h-12-5 inline-block">
	          <div class="w-full h-full rounded-full object-cover bg-gray-300"></div>
	        </div>
	    </div>
		<div class="w-full sm:w-5/6 mb-3">
			<div class="h-4 mb-4 text-gray-300">
	          <span style="width: 5rem" class="inline-block h-full bg-gray-300 rounded mr-2">
	          </span>
	          •
	          <span style="width: 5rem" class="inline-block h-full bg-gray-300 rounded"></span>
	        </div>
			<div class="">
				<span style="width:65%;" class="block h-4 rounded bg-gray-300 mb-4"></span>
				<span style="width:50%;" class="block h-4 rounded bg-gray-300 mb-4"></span>
				<span style="width:75%;" class="block h-4 rounded bg-gray-300 mb-4"></span>
			</div>
		</div>
	</div> -->
</template>

<script>
	export default {
		
	}
</script>	