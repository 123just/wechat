<template>
  <div class="container" style="background: url(../../img/wechat.jpg) no-repeat">
    <div class="hint-text">
      {{hintText}}
    </div>
    <div class="role-judge" @click="goToVolunteer">志愿者</div>
    <div class="role-judge" @click="goToBorrower">借伞人</div>
    <mptoast />
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
      hintText: '请选择你的角色：',
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
