// 本文件由FirstUI授权予行道京雄（北京）信息技术有限公司（手机号： 130 31 0 55 5  2   7，身份证尾号：DWQD02）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
// #ifdef APP-VUE || H5
export default {
	data() {
		return {
			percentage: -1
		}
	},
	watch: {
		percent(val) {
			this.percentage = Number(val) || 0
		}
	},
	mounted() {
		this.percentage = Number(this.percent) || 0
	},
	methods: {
		change(e) {
			this.$emit('change', e);
		},
		end(e) {
			this.$emit('end', e);
		}
	}
}

// #endif

// #ifndef APP-VUE || H5
export default {}
// #endif