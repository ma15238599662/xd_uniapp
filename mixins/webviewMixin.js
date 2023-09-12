export default {
  mounted() {
    // 监听来自webview页面的消息
    uni.onWebviewMessage((event) => {
      const message = event.data;
      console.log(message); // 处理来自webview的消息
    });
  },
  methods: {
    sendMessageToH5(message) {
      // 向webview页面发送消息
      uni.postMessage(message);
    }
  }
};