<template>
  <div class="borrow" >
    <div class="borrow-part">
      <div class="borrow-title">借  伞</div>
      <div class="borrow-main" v-if="!isBorrow">
        <i-input :value="borrowInfo.umbrellaId" title="伞编号" autofocus placeholder="请输入伞编号（如：T01）" maxlength="5"/>
        <i-input :value="borrowInfo.borrowVolunteerId" title="借伞志愿者编号" autofocus placeholder="请输入借伞志愿者编号" maxlength="10"/>
        <i-input :value="borrowInfo.remark" title="备注" type="textarea" autofocus placeholder="可不填" maxlength="150"/>
        <i-button @click="borrowClick" type="success">确认借伞</i-button>
      </div>
      <div class="borrow-info-main" v-if="isBorrow">
        <div class="details-item">
          <div class="item-title">伞编号</div>
          <div>{{ borrowInfo.umbrellaId }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">借伞时间</div>
          <div>{{ borrowInfo.borrowTime }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">联系方式</div>
          <div>{{ historyItem.tel }}</div>
        </div>
      </div>
    </div>
    <i-tab-bar :current="current" color="#4B9DF2" @change="handleChange" style="height:50px">
      <i-tab-bar-item key="borrowUmbrella" icon="group" current-icon="group_fill" title="借伞"></i-tab-bar-item>
      <i-tab-bar-item key="borrowHistory" icon="remind" current-icon="remind_fill" title="历史"></i-tab-bar-item>
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
      current: 'borrowUmbrella',
      isBorrow: false,
      borrowInfo: {
        umbrellaId: '',
        borrowTime: new Date(),
        borrowVolunteerId: '',
        sendTime: new Date(),
        remark: ''
      }
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
    inputUmbrellaId (e) {
      this.umbrellaId = e.mp.detail.detail.value
    },
    inputRemark (e) {
      this.remark = e.mp.detail.detail.value
    },
    borrowClick () {
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
</style>
