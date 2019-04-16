<template>
  <div class="container">
    <div class="backgroud">
      <div class="title">
        <div class="logo">
          <img src="https://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/umbrella_active.png" style="width:40px; height:40px;">
        </div>
        <div class="titleText">{{titleText}}</div>
        <div class="introText">{{introText}}</div>
      </div>
      <div>
        <i-button class="role-judge vButton" type="primary" @click="goToVolunteer">志愿者</i-button>
        <i-button class="role-judge bButton" type="success" @click="goToBorrower">借伞人</i-button>
      </div>
      <div class="copyright">{{copyrightText}}</div>
      <mptoast />
    </div>
  </div>
</template>

<script>
import mptoast from 'mptoast'
export default {
  components: {
    mptoast
  },
  data () {
    return {
      titleText: '杭州师范大学校园爱心伞',
      introText: '校园爱心伞项目微信小程序端为一般借伞人和志愿者所使用，请在注册时填写真实信息。进入系统前应先选择身份。',
      copyrightText: 'Copyright © 2019 杭州师范大学校园爱心伞管理系统',
      userInfo: {},
      role: [], // 1-管理员 2-志愿者 3-普通用户 4-负责人
      Request: this.$api.api.prototype
    }
  },
  onLoad () {
    this.login()
  },
  methods: {
    // 获取个人信息
    goToVolunteer () {
      if (this.role.length !== 0) {
        // 是否注册（若注册...）确认是否是志愿者
        if (this.role.indexOf(2) === -1) {
          this.$mptoast('您目前不是志愿者', 'info', 2000)
        } else {
          const url = '../volunteerPages/sign/main'
          wx.redirectTo({ url })
        }
      } else {
        this.$mptoast('未登录成功', 'info', 2000)
      }
    },
    goToBorrower () {
      // 是否注册（若注册...）
      if (this.userInfo) {
        if (this.userInfo.userStatus === 4) { // 0-停用 1-过期 2-正常 3-账号删除 4- 未初始化
          const url = '../register/main?operate=new'
          wx.redirectTo({ url })
        } else {
          const url = '../borrowerPages/borrowUmbrella/main'
          wx.redirectTo({ url })
        }
      } else {
        this.$mptoast('未登录成功', 'info', 2000)
      }
    },
    // 登录
    login () {
      wx.login({
        success: (res) => {
          if (res.code) {
            // 后台获取openId & 用户信息(role 是否注册) & token
            this.Request.login(res.code).then(res => {
              if (res.code !== 200) {
                console.log('未登录成功')
              } else {
                this.globalData.api = {token: res.data.token}
                this.role = res.data.role
                this.userInfo = res.data.user
                this.globalData.user = {userInfo: this.userInfo}
              }
            })
          } else {
            console.log('获取用户登陆态失败')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  background: url(http://justdj-umbrella.oss-cn-hangzhou.aliyuncs.com/wechatBg.png) no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
}
.backgroud {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 120px 0 80px 0;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 76px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 38px;
}
.titleText {
  font-size: 20px;
  margin: 5px 0 20px 0;
}
.introText {
  width: 85%;
  font-size: 12px;
  color: #dddddd;
}
.role-judge {
  width: 100%;
  height: 80px;
  background: #dddddd;
  border-radius: 0;
}
.copyright {
  margin-bottom: 5px;
  font-size: 11px;
  text-align: center;
}
</style>
