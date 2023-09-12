
//基础mixin
import { mapState, mapActions } from "vuex";

const baseMixin = {
  computed: {
    ...mapState("auth", {
      userInfo: (state) => state.user,
      token: (state) => state.token,
    }),
  },
  
  methods: {
    onShareAppMessage() {
      let title, path, imageUrl, openUserName;
      return this.$base.methods.shareContent(title, path, imageUrl, openUserName);
    },
  }
};

export default baseMixin