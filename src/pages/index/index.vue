<template>
  <div class="container" >

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <span>{{userInfo.nickName}}</span>
      </div>
    </div>
    <div class="hint-text">
      {{hintText}}
    </div>
    <div class="role-judge" @click="bindViewTap">
      志愿者
    </div>
    <div class="role-judge" @click="bindViewTap">
      借伞人
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      hintText: '请选择你的角色：',
      userInfo: {}
    }
  },
  methods: {
    bindViewTap () {
      const url = '../counter/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.hint-text {
  font-size: 15px;
  margin: 15px 0 10px 15px;
  width: 100%;
}

.role-judge{
  width: 100%;
  height: 80px;
  background: #dddddd;
  margin-bottom: 20px;
  line-height: 80px;
  padding-left: 30px;
}
</style>
