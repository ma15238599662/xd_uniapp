
import ApiClinet from './api-clinet';
import ApiConfig from '../config/api.config';
import AppConfig from '../config/app.config'
const ApiService = {
  get(url, data, options) {
    return ApiClinet.get(url, data, options);
  },
  post(url, data, options) {
    return ApiClinet.post(url, data, options);
  },
  put(url, data, options) {
    return ApiClinet.put(url, data, options);
  },
  delete(url, data, options) {
    return ApiClinet.delete(url, data, options);
  }
};

export default ApiService;

const HeaderTypr = {
	header: {
		Accept: '*/*',
		'Content-Type': 'multipart/form-data; charset=utf-8'
	},
};

// 用户管理服务
export const UserService = {
  // 手机号一键登录
  phoneLogin(params) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.PHONE_LOGIN_URL, params)
  },
  // 微信登录
  wechatLogin(params) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.WECHAT_LOGIN_URL, params)
  },
  // 微信绑定
  wechatBind(params) {
    return ApiClinet.put(ApiConfig.APP_BASE_API.WECHAT_BIND_URL, params)
  },
  // 微信解绑
  wechatUnbind(params) {
    return ApiClinet.delete(ApiConfig.APP_BASE_API.WECHAT_UNBIND_URL, params)
  },
  // 用户登录
  login(params) {
     if(params.password) {
      // 账号密码登录
      return ApiClinet.post(ApiConfig.APP_BASE_API.LOGIN_URL, {phone: params.phone, password: params.password})
    } else if (params.code) {
      // 验证码登录
      return ApiClinet.post(ApiConfig.APP_BASE_API.SMS_LOGIN_URL, {phone: params.phone, code: params.code})
    }
    // if (['weixin'].includes(AppConfig.PROVIDER)) {
    //   //微信登陆
    //   return new Promise((resolve, reject) => {
    //     uni.login({
    //       provider: AppConfig.PROVIDER,
    //       success: result=> {
    //         console.log(result)
    //         ApiClinet.post(ApiConfig.APP_BASE_API.WECHAT_LOGIN_URL, {
    //           code: result.code
    //         })
    //         .then(res=>{
    //           resolve(res);
    //         })
    //         .catch(err=>{
    //           resolve(err);
    //         })
    //       },
    //       fail:err=>{
    //         console.log(err);
    //       }
    //     });
    //   });
    // }
    
  },
	
  // 查询用户
  get(params) {
    return ApiClinet.get(ApiConfig.APP_BASE_API.USER_INFO_URL, params);
  },
  // 获取验证码
  getSms(params) {
    return ApiClinet.get(ApiConfig.APP_BASE_API.GET_SMS_URL, params);
  },
  // 用户注册
  signup(data) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.SIGNUP_URL, data);
  },
  // 用户修改昵称
  putNickname(data) {
    return ApiClinet.put(ApiConfig.APP_BASE_API.PUT_NICKNAME_URL, data);
  },
  // 用户修改头像
  putLogo(data) {
    return ApiClinet.put(ApiConfig.APP_BASE_API.PUT_LOGO_URL, data);
  },
  // 上传头像
  uploadLogo(data) {
    return ApiClinet.post(ApiConfig.APP_BASE_API.POST_LOGO_URL, data);
  },
  // 重置密码
  resetPwd(data) {
    return ApiClinet.put(ApiConfig.APP_BASE_API.RESET_PWD_URL, data);
  }
  // // 找回密码
  // findPassword(params) {
  //   return ApiClinet.post(ApiConfig.APP_BASE_API.FIND_PASSWORD_URL, params);
  // },
  // // 修改密码
  // modifyPassword(params) {
  //   return ApiClinet.post(ApiConfig.APP_BASE_API.MODIFY_PASSWORD_URL, params);
  // },
  
 
};

//其他服务模块
export const AppService = {
  // 获取导航列表
  getNavigations(params){
    return ApiClinet.get(ApiConfig.APP_BASE_API.GET_NAVIGATION_URL,params);
  },
  // 新增导航
  addNavigation(params){
    return ApiClinet.post(ApiConfig.APP_BASE_API.ADD_NAVIGATION_URL,params);
  },
  // 删除导航
  delNavigation(id, params){
    return ApiClinet.delete(ApiConfig.APP_BASE_API.DEL_NAVIGATION_URL + `${id}/`,params);
  },
  // 批量删除导航
  delNavigations(ids, params){
    return ApiClinet.delete(ApiConfig.APP_BASE_API.DEL_NAVIGATIONS_URL + `${ids}/`,params);
  },
  
  // 获取收藏列表
  getCollects(params){
    return ApiClinet.get(ApiConfig.APP_BASE_API.GET_COLLECT_URL,params);
  },
  // 新增收藏
  addCollect(params){
    return ApiClinet.post(ApiConfig.APP_BASE_API.ADD_COLLECT_URL,params);
  },
  // 删除收藏
  delCollect(id, params){
    return ApiClinet.delete(ApiConfig.APP_BASE_API.DEL_COLLECT_URL + `${id}/`,params);
  },
  // 批量删除收藏
  delCollects(ids, params){
    return ApiClinet.delete(ApiConfig.APP_BASE_API.DEL_COLLECTS_URL + `${ids}/`,params);
  },
};



