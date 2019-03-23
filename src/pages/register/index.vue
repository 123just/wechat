<template>
  <div>
    <div class="register-part">
      <div class="register-title">{{ title }}</div>
      <form class="register-main">
        <i-input :value="name" title="姓名" autofocus placeholder="请输入姓名" maxlength="50" @change="inputName"/>
        <i-input :value="studentId" title="学号/工号" autofocus placeholder="请输入学号/工号" maxlength="50" @change="inputStudentId"/>
        <picker mode="selector" :range="academyList" :range-key="'academyName'" :value="academyIndex" @change="changeAcademy">
          <div class="picker">
            <div class="picker-title">学院</div>
            <div class="picker-info">{{ academyList[academyIndex].academyName }}</div>
          </div>
        </picker>
        <picker mode="selector" :range="classList" :range-key="'className'" :value="classIndex" @change="changeClass">
          <div class="picker">
            <div class="picker-title">班级</div>
            <div class="picker-info">{{ classList[classIndex].className }}</div>
          </div>
        </picker>
        <i-input :value="tel" title="联系电话" autofocus placeholder="请输入联系电话" maxlength="11" @change="inputTel"/>
        <button class="btn" type="success" :disabled="!name || !studentId || !tel" @click="submitClick">确  认</button>
        <div class="errorText">{{ errorText }}</div>
      </form>
    </div>
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
      title: '请完善您的信息',
      name: '',
      studentId: '',
      academyList: [{
        academyName: ''
      }],
      academyIndex: 0,
      classList: [{
        className: ''
      }],
      classIndex: 0,
      tel: '',
      errorText: '',
      Request: this.$api.api.prototype,
      operate: '',
      toastMsg: '',
      toastVisible: false
    }
  },
  onLoad (options) {
    // 初始化
    this.toastVisible = false
    this.title = '请完善您的信息'
    this.academyIndex = 0
    this.operate = options.operate
    console.log(this.operate)
    if (options.operate === 'edit') {
      this.title = '请修改您的信息'
      this.name = this.globalData.user.userInfo.name
      this.studentId = this.globalData.user.userInfo.code
      this.tel = this.globalData.user.userInfo.tel
    }
    this.Request.academyAll(this.globalData.api.token).then(res => {
      if (res.code !== 200) {
        console.log(res)
      } else {
        console.log(res)
        this.academyList = res.data
        let academyId = this.academyList[this.academyIndex].id
        this._getClassList(academyId)
      }
    })
  },
  methods: {
    _getClassList (academyId) {
      this.Request.classInfo(academyId, this.globalData.api.token).then(res => {
        if (res.code !== 200) {
          console.log(res)
        } else {
          this.classList = res.data
          console.log(this.classList)
        }
      })
    },
    inputName (e) {
      this.name = e.mp.detail.detail.value
    },
    inputStudentId (e) {
      this.studentId = e.mp.detail.detail.value
    },
    inputTel (e) {
      this.tel = e.mp.detail.detail.value
    },
    changeAcademy (e) {
      this.academyIndex = e.mp.detail.value
      this._getClassList(this.academyList[this.academyIndex].id)
    },
    changeClass (event) {
      this.classIndex = event.mp.detail.value
    },
    submitClick () {
      this.errorText = ''
      if (!new RegExp('^[0-9]{13}$').test(this.studentId)) {
        this.errorText = '*学号需为15位数'
      } else if (!new RegExp('^(13[0-9]|15[012356789]|17[0135678]|18[0-9]|14[579]|19[89]|166)[0-9]{8}$').test(this.tel)) {
        this.errorText = '*手机号码不正确'
      } else {
        let userInfo = {
          'academyId': this.academyList[this.academyIndex].id,
          'classId': this.classList[this.classIndex].id,
          'code': this.studentId,
          'name': this.name,
          'tel': this.tel
        }
        if (this.operate === 'new') {
          this.Request.register(userInfo, this.globalData.api.token).then(res => {
            if (res.code === -1) {
              this.errorText = '*' + res.msg
            } else if (res.code !== 200) {
              console.log(res)
              this.errorText = '*注册失败'
            } else {
              this.toastMsg = '注册成功'
              this.toastVisible = true
              this.globalData.api.token = res.msg
              Object.assign(this.globalData.user.userInfo, userInfo) // 修改userInfo信息
              const url = '../borrowerPages/borrowUmbrella/main'
              wx.redirectTo({ url })
            }
          })
        } else {
          this.Request.userInfo(userInfo, this.globalData.api.token).then(res => {
            if (res.code === -1) {
              this.errorText = '*' + res.msg
            } else if (res.code !== 200) {
              console.log(res)
              this.errorText = '*修改失败'
            } else {
              this.toastMsg = '修改成功'
              this.toastVisible = true
              // 修改userInfo信息
              Object.assign(this.globalData.user.userInfo, userInfo)
              wx.navigateBack()
            }
          })
        }
      }
    }
  }
}
</script>

<style>
.btn {
  width: 90%;
  height: 50px;
  margin-top: 20px;
  line-height: 50px;
  font-size: 19px;
  background-color: #19be6b;
  color: #ffffff;
}
.register-part {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9; 
}
.register-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
}
.picker {
  display: flex;
  height: 40px;
  padding: 7px 20px;
  font-size: 17px;
  color: #495060;
  background-color: #ffffff;
}
.picker-title {
  width: 75px;
  padding-right: 10px;
}
.errorText {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 15px;
  color: #FF0000;
}
</style>
