<template>
  <div class="send">
    <div class="send-part">
      <div class="send-title">志愿还伞/维修伞</div>
      <div class="send-main">
        <i-input :value="umbrellaId" title="伞编号" autofocus placeholder="请输入归还伞编号（如：T01）" maxlength="5" @change="inputUmbrellaId"/>
        <i-input :value="remark" title="备注" type="textarea" autofocus placeholder="（若损坏）请输入具体损坏情况" maxlength="150" @change="inputRemark"/>
        <i-button @click="sendClick" type="success">确认还伞</i-button>
        <i-button @click="repairClick" type="error">维修</i-button>
        <div class="errorText">{{ errorText }}</div>
      </div>
    </div>
    <i-modal :visible="modalVisible" @ok="modalOk" @cancel="modalCancel">
      <div>确认{{modalMsg === 'return' ? '归还' : '维修'}}{{ umbrellaId }}伞？</div>
    </i-modal>
    <toast :message="toastMsg" :visible="toastVisible"></toast>
    <i-tab-bar :current="current" color="#4B9DF2" @change="handleChange" style="height:50px">
      <i-tab-bar-item key="sign" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="sendUmbrella" icon="group" current-icon="group_fill" title="还伞"></i-tab-bar-item>
      <i-tab-bar-item key="history" icon="remind" current-icon="remind_fill" title="历史"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
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
      openId: '',
      umbrellaId: '',
      remark: '',
      current: 'sendUmbrella',
      errorText: '',
      Request: this.$api.api.prototype,
      modalVisible: false, // modal是否弹出
      modalMsg: 'return',
      toastVisible: false,
      toastMsg: '成功'
    }
  },
  onShow () {
    this.current = 'sendUmbrella'
  },

  methods: {
    modalOk () {
      // 调用信息，并调用后台还伞接口
      if (new RegExp('^[JST][0-9]{3}$').test(this.umbrellaId)) {
        let info = {
          'remark': this.remark,
          'umbrellaCode': this.umbrellaId
        }
        if (this.modalMsg === 'return') {
          this.Request.returnUmbrella(info, this.globalData.api.token).then(res => {
            if (res.code !== '200') {
              this.errorText = '*' + res.msg
            } else {
              this.toastMsg = '归还成功'
              this.toastVisible = true
            }
          })
        } else {
          this.Request.repairUmbrella(info, this.globalData.api.token).then(res => {
            if (res.code !== '200') {
              this.errorText = '*' + res.msg
            } else {
              this.toastMsg = '维修成功'
              this.toastVisible = true
            }
          })
        }
      } else {
        this.errorText = '*请输入正确的伞编号'
      }
      this.modalVisible = false
    },
    modalCancel () {
      this.modalVisible = false
    },
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
      this.modalMsg = 'return'
      this.modalVisible = true
      this.errorText = ''
    },
    repairClick () {
      // 调用信息，并调用后台维修伞接口
      this.modalMsg = 'repair'
      this.modalVisible = true
      this.errorText = ''
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
.errorText {
  margin-left: 20px;
  margin-top: 10px;
  font-size: 15px;
  color: #FF0000;
}
</style>
