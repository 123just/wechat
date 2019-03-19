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
    <button class="role-judge" open-type="getPhoneNumber" bindgetphonenumber="getVPhoneNum">志愿者</button>
    <button class="role-judge" open-type="getPhoneNumber" bindgetphonenumber="getBPhoneNum">借伞人</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      hintText: '请选择你的角色：',
      userInfo: {},
      tel: '13588221947'
    }
  },
  onLoad () {
    this.login()
    this.getUserInfo()
  },
  submit () {
    console.log('submit')
  },
  methods: {
    getVPhoneNum () {
      this.login()
      const url = '../volunteerPages/sign/main'
      wx.navigateTo({ url })
    },
    getBPhoneNum () {
      this.login()
      const url = '../borrowerPages/borrowUmbrella/main'
      wx.navigateTo({ url })
    },
    // 登录
    login () {
      wx.checkSession({
        success: (res) => {
          console.log(res, '登录未过期')
        },
        fail: function (res) {
          console.log(res, '登录过期啦')
          wx.login({
            success: (res) => {
              // console.log(res.code)
              // wx.request传递code参数
            }
          })
        }
      })
      // 调取login接口获取token，并判断是否注册
      let that = this
      wx.request({
        url: 'http://139.199.88.87:9001/login/in',
        method: 'post',
        data: {
          'password': 123456,
          'phone': 13588221947
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: (res) => {
          that.globalData.api = {token: res.data.data}
          // if (!that.globalData.api.token) {
          const url = '../register/main?tel=' + that.tel
          wx.navigateTo({ url })
          // }
          // console.log(that.globalData.api.token)
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      wx.getUserInfo({
        success: (res) => {
          // console.log(res)
          this.userInfo = res.userInfo
        },
        fail: (res) => {
          // console.log(res + 'fail')
        }
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: cednter;
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
  line-height: 80px;
  border-radius: 0;
}
</style>
