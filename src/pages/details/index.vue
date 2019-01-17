<template>
  <div>
    <div class="details-part">
      <i-notice-bar backgroundcolor="#ff0000" color="#ffffff"
       v-if="role === 'volunteer'">已超时，请志愿者及时催还伞</i-notice-bar>
      <i-notice-bar v-if="role === 'borrower'">请及时还伞</i-notice-bar>
      <div class="details-title">详细信息</div>
      <div class="details-main">
        <div class="details-item">
          <div class="item-title">学院</div>
          <div>{{ historyItem.academy }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">班级</div>
          <div>{{ historyItem.classInfo }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">姓名</div>
          <div>{{ historyItem.name }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">联系方式</div>
          <div>{{ historyItem.tel }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">借伞时间</div>
          <div>{{ historyItem.borrowTime }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">借伞志愿者</div>
          <div>{{ historyItem.bVolunteer }}</div>
        </div>
        <div class="details-item">
          <div class="item-title">应还伞时间</div>
          <div>{{ historyItem.sendTime }}</div>
        </div>
        <div class="details-item" v-if="isRuturn">
          <div class="item-title">还伞志愿者</div>
          <div>{{ historyItem.sVolunteer }}</div>
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
      historyTitle: {},
      historyItem: {
        isRuturn: false,
        academy: '杭州国际服务工程学院',
        classInfo: '软工152',
        name: 'just',
        tel: '13588221947',
        borrowTime: new Date(),
        bVolunteer: 'just1',
        sendTime: new Date(),
        sVolunteer: ''
      }
    }
  },
  methods: {
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
