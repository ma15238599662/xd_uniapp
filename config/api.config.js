
import AppConfig from './app.config';

const { BASE_URL,WEB_SOCKET_URL, OSS_URL } = AppConfig;

export default {
  BASE_URL,
  // WebSocket
  WEB_SOCKET_URL,
  // 第三方接口
  OPEN_API: {
  
	},
	//我的模块
	APP_MINE_API:{
		MY_USER_INFO: `${BASE_URL}/mine/userinfo`,
		ABOUT:`${BASE_URL}/mine/about`,
	},
  
	//基础接口
	APP_BASE_API:{
		LOGIN_URL: `${BASE_URL}/login/`, // 账号密码登录
		PHONE_LOGIN_URL: `${BASE_URL}/login/phone/`, // 手机号登录
		WECHAT_LOGIN_URL: `${BASE_URL}/login/wechat/`, // 微信登录
		WECHAT_BIND_URL: `${BASE_URL}/wechat/bind/`, // 微信绑定
		WECHAT_UNBIND_URL: `${BASE_URL}/wechat/unbind/`, // 微信解绑
		SMS_LOGIN_URL: `${BASE_URL}/login/sms/`,  // 短信验证码登录
    SIGNUP_URL: `${BASE_URL}/register/`,  // 注册
    GET_SMS_URL: `${BASE_URL}/sms/`,  // 获取验证码
    USER_INFO_URL: `${BASE_URL}/user`, // 获取用户信息
    RESET_PWD_URL: `${BASE_URL}/pwd/reset/`,  // 重置密码
    PUT_LOGO_URL: `${BASE_URL}/logo/`,  // 编辑头像
    POST_LOGO_URL: `${OSS_URL}/location/`,  // 上传头像
    PUT_NICKNAME_URL: `${BASE_URL}/nickname/`,  // 修改昵称
    GET_COLLECT_URL: `${BASE_URL}/collects/`,  // 获取收藏列表
    ADD_COLLECT_URL: `${BASE_URL}/collects/`,  // 新增收藏
    DEL_COLLECT_URL: `${BASE_URL}/collect/`,  // 删除收藏
    DEL_COLLECTS_URL: `${BASE_URL}/collects/`,  // 批量删除收藏
    GET_NAVIGATION_URL: `${BASE_URL}/navigations/`,  // 获取导航列表
    ADD_NAVIGATION_URL: `${BASE_URL}/navigations/`,  // 新增收藏
    DEL_NAVIGATION_URL: `${BASE_URL}/navigation/`,  // 删除收藏
    DEL_NAVIGATIONS_URL: `${BASE_URL}/navigations/`,  // 批量删除收藏
	}
};
