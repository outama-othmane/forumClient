<template>
	<content-placeholders class="flex items-center justify-between pb-1 mb-4 flex-col sm:flex-row" :rounded="true">
		<div class="w-full">
			<content-placeholders-text :lines="1" />
		</div>
		<div class="flex items-center justify-between flex-row-reverse my-2 sm:my-0">
	      	<div class="block ml-4 w-24">
	    		<content-placeholders-text :lines="1" />
	      	</div>
	      	<div class="flex items-center justify-center ml-4" style="height: 15px">
	        	<content-placeholders-text style="width: 3rem" :lines="1" />
	      	</div>
	    </div>
	</content-placeholders>
<!-- 	<div class="flex items-center justify-between pb-1 mb-4 border-b border-solid border-gray-200 flex-col sm:flex-row">
		<div class="w-full">
			<h3 class="m-0 tracking-tight font-medium mb-1 text-lg text-gray-900">
				<span style="width:65%;" class="block h-4 rounded bg-gray-300"></span>
			</h3>
		</div>
		<div class="flex items-center justify-between flex-row-reverse my-2 sm:my-0">
	      <span class="block bg-gray-300 ml-4 w-24 rounded"><span style="visibility: hidden;">h</span></span>
	      <div class="flex items-center justify-center ml-4" style="height: 15px">
	        <span style="width: 3rem" class="inline-block h-full bg-gray-300 rounded"></span>
	      </div>
	    </div>
	</div> -->
</template>