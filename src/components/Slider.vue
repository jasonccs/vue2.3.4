<template>
    <div class="center">
        <vue-core-image-upload
                class="btn btn-primary"
                :crop="false"
                @imageuploaded="imageuploaded"
                :max-file-size="5242880"
                text="上传"
                inputOfFile="file"
                :multiple="true"
                url="http://www.new_silvapi.dev/upload" >
        </vue-core-image-upload>

    </div>
</template>

<script>
	import VueCoreImageUpload from 'vue-core-image-upload'

	export default {
		components: {
			'vue-core-image-upload': VueCoreImageUpload,
		},
        data() {
			return {
				src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
			}
		},
		methods: {
			imageuploaded(res) {
				if (res.errcode == 0) {
					this.src = res.data.src;
				}
			}
		}
	};
</script>