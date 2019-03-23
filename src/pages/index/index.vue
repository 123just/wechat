<template>
  <div class="container">
    <div class="hint-text">
      {{hintText}}
    </div>
    <button class="role-judge" @click="goToVolunteer">志愿者</button>
    <button class="role-judge" @click="goToBorrower">借伞人</button>
    <toast :message="toastMsg" :visible="toastVisible"></toast>
  </div>
</template>

<script>
import toast from 'mpvue-toast'
export default {
  components: {
    toast
  },
  data () {
    return {
      hintText: '请选择你的角色：',
      userInfo: {},
      role: [], // 1-管理员 2-志愿者 3-普通用户 4-负责人
      Request: this.$api.api.prototype,
      toastMsg: '',
      toastVisible: false
    }
  },
  onLoad () {
    this.toastMsg = false
    this.login()
  },
  methods: {
    // 获取个人信息
    goToVolunteer () {
      if (this.role) {
        // 是否注册（若注册...）确认是否是志愿者
        if (this.role.indexOf(2) === -1) {
          this.toastMsg = '您目前不是志愿者'
          this.toastVisible = true
        } else {
          const url = '../volunteerPages/sign/main'
          wx.redirectTo({ url })
        }
      } else {
        this.toastMsg = '未登录成功'
        this.toastVisible = true
      }
    },
    goToBorrower () {
      console.log(this.userInfo)
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
        this.toastMsg = '未登录成功'
        this.toastVisible = true
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hint-text {
  font-size: 15px;
  margin: 0 0 10px 15px;
  width: 100%;
}

.role-judge{
  width: 100%;
  height: 80px;
  margin: 10px;
  background: #dddddd;
  line-height: 80px;
  border-radius: 0;
}
</style>
