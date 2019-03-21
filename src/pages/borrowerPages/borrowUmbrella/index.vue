<template>
  <div class="borrow" >
    <div class="borrow-part">
      <div class="borrow-title">借  伞</div>
      <div class="borrow-main" v-if="!isBorrow">
        <i-input :value="borrowInfo.umbrellaCode" title="伞编号" autofocus placeholder="请输入伞编号（如：T01）" maxlength="5" @change="inputUmbrellaCode"/>
        <i-input :value="borrowInfo.volunteerId" title="借伞志愿者编号" autofocus placeholder="请输入借伞志愿者编号" maxlength="10" @change="inputVolunteerId"/>
        <i-input :value="borrowInfo.remark" title="备注" type="textarea" autofocus placeholder="可不填" maxlength="150" @change="inputRemark"/>
        <i-button @click="borrowClick" type="success">确认借伞</i-button>
        <div class="errorText">{{ errorText }}</div>
      </div>
      <div class="borrow-info-main" v-if="isBorrow">
        <i-cell-group>
          <i-cell title="伞编号" :value='borrowItem.umbrellaCode'>
          </i-cell>
          <i-cell title="借伞时间" :value='borrowItem.borrowTime'>
          </i-cell>
          <i-cell title="借伞志愿者" :value='borrowItem.volunteerId'>
          </i-cell>
          <i-cell title="应还伞时间" :value='borrowItem.deadLine'>
          </i-cell>
          <i-cell title="备注" :value='borrowItem.remark'>
          </i-cell>
        </i-cell-group>
        <div class="remarks">注意：爱心伞使用后需及时归还至原借伞点（伞编号首字母T代表图书馆、S代表食堂、J代表恕园教学区），若一周内未及时归还则扣除信用积分1分</div>
      </div>
    </div>
    <i-modal :visible="modalVisible" @ok="modalOk" @cancel="modalCancel">
      <div>确认向{{ volunteerId }}志愿者借{{ umbrellaCode }}伞？</div>
    </i-modal>
    <i-tab-bar :current="current" color="#4B9DF2" @change="handleChange" style="height:50px">
      <i-tab-bar-item key="borrowUmbrella" icon="group" current-icon="group_fill" title="借伞"></i-tab-bar-item>
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
      current: 'borrowUmbrella',
      isBorrow: false,
      borrowInfo: {},
      borrowItem: {
        'umbrellaCode': 'T003',
        'borrowTime': 'T003',
        'volunteerId': 'T003',
        'deadLine': 'T003'
      },
      errorText: '',
      Request: this.$api.api.prototype,
      modalVisible: false
    }
  },
  onShow () {
    this.current = 'borrowUmbrella'
  },

  methods: {
    handleChange (el) {
      this.current = el.mp.detail.key
      if (this.current !== 'borrowUmbrella') {
        const url = '../' + this.current + '/main'
        wx.navigateTo({ url })
      }
    },
    inputUmbrellaCode (e) {
      this.borrowInfo.umbrellaCode = e.mp.detail.detail.value
    },
    inputVolunteerId (e) {
      this.borrowInfo.volunteerId = e.mp.detail.detail.value
    },
    inputRemark (e) {
      this.borrowInfo.remark = e.mp.detail.detail.value
    },
    // 确认借伞
    borrowClick () {
      this.errorText = ''
      this.modalVisible = true
    },
    modalOk () {
      if (new RegExp('^[JST][0-9]{3}$').test(this.borrowInfo.umbrellaCode) && this.borrowInfo.volunteerId) {
        this.Request.borrowUmbrella(this.borrowInfo, this.globalData.api.token).then(res => {
          if (res.code !== 200) {
            console.log(res)
            this.errorText = '*' + res.msg
          } else {
            this.isBorrow = true
            this.borrowInfo = res.data
          }
        })
      } else {
        this.errorText = '*伞编号不正确或借伞志愿者编号为空'
      }
      this.modalVisible = false
    },
    modalCancel () {
      this.modalVisible = false
    }
  }
}
</script>

<style>
.borrow {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.borrow-part {
  flex: 1;
  background-color: #f9f9f9; 
}
.borrow-title {
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
.remarks {
  font-size: 11px;
  color: #999;
  margin: 0 20px;
}
</style>
