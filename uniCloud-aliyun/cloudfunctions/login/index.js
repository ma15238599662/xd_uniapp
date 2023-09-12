
// // 云函数
// /**
//  * @param {Object} event 客户端提交的参数包含 {access_token, openid}
//  * @param {Object} context 运行的设备信息
//  */
// exports.main = async function (event, context){
//   console.log('云函数参数event=>', event)
//   console.log('云函数参数context=>', context)
//   const res = await uniCloud.getPhoneNumber({
//     appid: '__UNI__F7BBE03', // 客户端callFunction时携带的AppId信息
//     provider: 'univerify',
//     apiKey: '7e74734b3b871ea5c2e5bb9d37609d8f', // 在开发者中心开通服务并获取apiKey
//     apiSecret: '11daf5801d9c6670b7bbf94bcc34e981', // 在开发者中心开通服务并获取apiSecret
//     access_token: event.access_token,
//     openid: event.openid
//   })
//   console.log('云函数结果res', res)
//   // 执行入库等操作，正常情况下不要把完整手机号返回给前端
//   return {
//     code: 0,
//     message: '获取手机号成功',
//     data: {
//       phoneNumber: res.phoneNumber
//     }
//   }
// }


// 云函数
/**
 * @param {Object} event 客户端提交的参数包含 {access_token, openid}
 * @param {Object} context 运行的设备信息
 */
exports.main = async function (event, context){
  console.log('云函数参数event=>', event)
  console.log('云函数参数context=>', context)
  const res = await uniCloud.getPhoneNumber({
    appid: '__UNI__F7BBE03', // 客户端callFunction时携带的AppId信息
    provider: 'univerify',
    apiKey: '7e74734b3b871ea5c2e5bb9d37609d8f', // 在开发者中心开通服务并获取apiKey
    apiSecret: '11daf5801d9c6670b7bbf94bcc34e981', // 在开发者中心开通服务并获取apiSecret
    access_token: event.queryStringParameters.access_token,
    openid: event.queryStringParameters.openid
  })
  console.log('云函数结果res', res)
  // 执行入库等操作，正常情况下不要把完整手机号返回给前端
  return {
    code: 200,
    message: '获取手机号成功',
    data: {
      phone: res.phoneNumber
    }
  }
}