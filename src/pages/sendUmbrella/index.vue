<template>
  <div class="send">
    <div class="send-part">
      <div class="send-title">志愿还伞/维修伞</div>
      <div class="send-main">
        <i-input :value="umbrellaId" title="伞编号" autofocus placeholder="请输入归还伞编号（如：T01）" maxlength="5" @change="inputUmbrellaId"/>
        <i-input :value="remark" title="备注" type="textarea" autofocus placeholder="（若损坏）请输入具体损坏情况" maxlength="150" @change="inputRemark"/>
        <i-button @click="sendClick" type="success">确认还伞</i-button>
        <i-button @click="repairClick" type="error">维修</i-button>
      </div>
    </div>
    <i-tab-bar :current="current" color="#f759ab" @change="handleChange" style="height:50px">
      <i-tab-bar-item key="sign" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="sendUmbrella" icon="group" current-icon="group_fill" title="还伞"></i-tab-bar-item>
      <i-tab-bar-item key="history" icon="remind" current-icon="remind_fill" title="历史"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>

export default {

  data () {
    return {
      openId: '',
      umbrellaId: '',
      remark: '',
      current: 'sendUmbrella'
    }
  },
  onShow () {
    this.current = 'sendUmbrella'
  },

  methods: {
    handleChange (el) {
      this.current = el.mp.detail.key
      if (this.current !== 'sendUmbrella') {
        const url = '../' + this.current + '/main'
        wx.navigateTo({ url })
      }
    },
    inputUmbrellaId (e) {
      this.umbrellaId = e.mp.detail.detail.value
    },
    inputRemark (e) {
      this.remark = e.mp.detail.detail.value
    },
    sendClick () {
      // 调用信息，并调用后台还伞接口
      console.log(this.umbrellaId + this.remark)
    },
    repairClick () {
      // 调用信息，并调用后台维修伞接口
      console.log('成功申报维修')
    }
  }
}
</script>

<style>
.send {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.send-part {
  flex: 1;
  background-color: #f9f9f9; 
}
.send-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
}
</style>
