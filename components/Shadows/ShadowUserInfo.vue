<template>
	<content-placeholders class="flex flex-col mb-4 w-full" :rounded="true">
	    <div class="mb-4 mx-auto">
	        <content-placeholders-img style="border-radius: 100%;width: 8rem;height: 8rem;" />
	    </div>
	     <div class="flex justify-center flex-wrap">
	     	<content-placeholders-text class="justify-center flex mb-4" :lines="1" style="width: 65%" />
	     	<content-placeholders-text class="justify-center flex" :lines="1" style="width: 36%" />
	     </div>
	</content-placeholders>
</template>