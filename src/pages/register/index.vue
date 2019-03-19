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
        <i-input :value="tel" title="联系电话" disabled/>
        <button class="btn" type="success" :disabled="!name || !studentId || !tel" @click="submitClick">确  认</button>
        <div class="errorText">{{ errorText }}</div>
      </form>
    </div>
  </div>
</template>

<script>

export default {

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
      Request: this.$api.api.prototype
    }
  },
  onLoad (option) {
    // 初始化
    this.academyIndex = 0
    this.tel = option.tel

    let that = this
    wx.request({
      url: 'http://139.199.88.87:9001/api/class/academy/all',
      method: 'get',
      header: {
        'content-type': 'application/json', // 默认值
        'token': that.globalData.api.token
      },
      success: (res) => {
        this.academyList = res.data.data
        let academyId = this.academyList[that.academyIndex].id
        this._getClassList(academyId)
      }
    })
  },
  methods: {
    _getClassList (academyId) {
      let that = this
      wx.request({
        url: 'http://139.199.88.87:9001/api/class/' + academyId,
        method: 'get',
        header: {
          'content-type': 'application/json', // 默认值
          'token': that.globalData.api.token
        },
        success: (res) => {
          this.classList = res.data.data
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
    changeAcademy (e) {
      this.academyIndex = e.mp.detail.value
      this._getClassList(this.academyList[this.academyIndex].id)
    },
    changeClass (event) {
      this.classIndex = event.mp.detail.value
    },
    submitClick () {
      this.errorText = ''
      console.log(new RegExp('^[0-9]{13}$').test(this.studentId))
      if (!new RegExp('^[0-9]{13}$').test(this.studentId)) {
        this.errorText = '*学号需为15位数'
      } else {
        let that = this
        let userInfo = {
          'academyId': this.academyList[this.academyIndex].id,
          'classId': this.classList[this.classIndex].id,
          'code': this.studentId,
          'gzhOpenId': 'string',
          'name': this.name,
          'openId': 'string',
          'roleId': 1,
          'tel': this.tel,
          'unionId': 'string',
          'volunteerId': 'string',
          'weChat': 'string'
        }
        that.Request.register(userInfo, this.globalData.api.token).then(res => {
          if (res.code !== 400) { // 应为200
            console.log(res)
            this.errorText = '*注册失败'
          } else {
            const url = '../volunteerPages/sign/main'
            wx.redirectTo({ url })
          }
        }).catch(res => {
          console.log('fail' + res)
        })
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
