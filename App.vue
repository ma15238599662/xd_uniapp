<!--本文件由FirstUI授权予行道京雄（北京）信息技术有限公司（手机号：     13 03 105 5 52 7，身份证尾号：DWQD02）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//App2.6.5+ 仅iOS
			// #ifndef APP-PLUS || H5
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate((res) => {
					if (res.hasUpdate) {
						updateManager.onUpdateReady(() => {
							this.fui.modal('更新提示', '发现新版本，为了获得更好的体验，建议立即更新', (res) => {
								updateManager.applyUpdate();
							});
						});
						updateManager.onUpdateFailed(() => {
							this.fui.modal('更新失败', '新版本更新失败，请稍后再试或删除小程序重新搜索打开',
								(res) => {});
						});
					}
				});
			}
			// #endif
		},
		onShow: function() {

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/fui-app.scss';
	@import './common/base.scss';
	@import './components/firstui/fui-theme/fui-theme.css';
	/*自定义字体css */
	@import './static/icon/fui-custom-icon.css';
</style>