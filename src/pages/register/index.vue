<template>
  <div>
    <div class="register-part">
      <div class="register-title">{{ title }}</div>
      <div class="register-main">
        <i-input :value="name" title="姓名" autofocus placeholder="请输入姓名" maxlength="50" @change="inputName"/>
        <i-input :value="studentId" title="学号/工号" autofocus placeholder="请输入学号/工号" maxlength="50" @change="inputStudentId"/>
        <picker mode="selector" :range="academyList" :value="academyInfo" @change="changeAcademy">
          <div class="picker">
            <div class="picker-title">学院</div>
            <div class="picker-info">{{ academyList[academyInfo] }}</div>
          </div>
        </picker>
        <picker mode="selector" :range="classList" :value="classInfo" @change="changeClass">
          <div class="picker">
            <div class="picker-title">班级</div>
            <div class="picker-info">{{ classList[classInfo] }}</div>
          </div>
        </picker>
        <i-input :value="tel" title="联系电话" disabled/>
        <i-button @click="submitClick" type="success">确  认</i-button>
      </div>
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
      academyList: ['杭州国际服务工程学院', '教育学院'],
      academyInfo: 0,
      classList: ['软工152', '软工151'],
      classInfo: 0,
      tel: ''
    }
  },
  onShow () {
  },
  methods: {
    inputName (e) {
      this.name = e.mp.detail.detail.value
    },
    inputStudentId (e) {
      this.studentId = e.mp.detail.detail.value
    },
    changeAcademy (event) {
      this.academyInfo = event.mp.detail.value
    },
    changeClass (event) {
      this.classInfo = event.mp.detail.value
    },
    submitClick () {
      // 保存数据至后端
      const url = '../sign/main'
      wx.navigateTo({ url })
    }
  }
}
</script>

<style>
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
</style>
