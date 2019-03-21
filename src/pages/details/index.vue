<template>
  <div>
    <div class="details-part">
      <i-notice-bar backgroundcolor="#ff0000" color="#ffffff"
       v-if="role === 'volunteer' && !historyItem.send  && isOverTime < 0">已超时，请志愿者及时催还伞</i-notice-bar>
      <i-notice-bar backgroundcolor="#ff0000" color="#ffffff"
       v-if="role === 'borrower' && !historyItem.send  && isOverTime < 0">请及时还伞</i-notice-bar>
      <i-notice-bar backgroundcolor="#FF9900" color="#ffffff"
      v-if="role === 'volunteer' && !historyItem.send && isOverTime >= 0">目前伞未还但未超时</i-notice-bar>
      <i-notice-bar backgroundcolor="#FF9900" color="#ffffff"
      v-if="role === 'borrower' && !historyItem.send && isOverTime >= 0">如无需使用请尽早归还</i-notice-bar>
      <i-notice-bar backgroundcolor="#09BB07" color="#ffffff"
      v-if="historyItem.send">已还伞</i-notice-bar>
      <div class="details-title">详细信息</div>
      <div class="details-main">
        <div class="details-item">
          <div class="item-title">学院</div>
          <div>{{ historyItem.academyName }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">班级</div>
          <div>{{ historyItem.className }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">姓名</div>
          <div>{{ historyItem.userName }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">联系方式</div>
          <div>{{ historyItem.phone }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">借伞时间</div>
          <div>{{ historyItem.borrowTime }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">借伞志愿者</div>
          <div>{{ historyItem.borrowVolunteerName }}</div>
        </div>
        <div class="details-item" v-if="!historyItem.send">
          <div class="item-title">应还伞时间</div>
          <div>{{ historyItem.deadLine }}</div>
        </div>
        <div class="details-item" v-if="historyItem.send">
          <div class="item-title">还伞时间</div>
          <div>{{ historyItem.sendTime }}</div>
        </div>
        <div class="details-item" v-if="historyItem.send">
          <div class="item-title">还伞志愿者</div>
          <div>{{ historyItem.sendVolunteerName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      role: 'volunteer',
      historyItem: {},
      id: 0,
      isOverTime: 0,
      Request: this.$api.api.prototype
    }
  },
  onLoad (options) {
    // 获取historyItem数据
    this.id = options.id
    this.role = options.role
    this.Request.borrowDetails(this.id, this.globalData.api.token).then(res => {
      if (res.code !== 200) {
        console.log(res)
      } else {
        this.historyItem = res.data
        // 计算是否超时
        let deadLineDate = new Date((this.historyItem.deadLine).replace(/-/g, '/'))
        this.isOverTime = deadLineDate - new Date()
      }
    })
  }
}
</script>

<style>
.details-part {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9; 
}
.details-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
}
.details-item {
  display: flex;
  background-color: #ffffff;
  margin-bottom: 5px;
  padding: 10px;
  font-size: 15px;
}
.item-title {
  width: 80px;
}
</style>
