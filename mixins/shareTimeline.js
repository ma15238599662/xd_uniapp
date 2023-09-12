
//分享到朋友圈mixin

module.exports = {
  onReady() {
    uni.showShareMenu({
      withShareTicket: false,
      menus: ["shareAppMessage", "shareTimeline"],
    });
  },
  onShareTimeline() {
    let title, query, imageUrl, openUserName;
    return this.$base.methods.shareTimeline(
      title,
      query,
      imageUrl,
      openUserName
    );
  },
};
