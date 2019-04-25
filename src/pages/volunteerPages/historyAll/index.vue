<template>
  <div class="history">
    <div class="history-part">
      <div class="history-title">历史借还伞记录</div>
      <div class="history-main">
        <div class="history-info" v-if="unsendList && unsendList.length === 0">无历史借还伞记录~</div>
        <div class="history-item" v-for="item in historyList" :key="item" @click="toDetails(item.id)">
          <div>{{item.umbrellaCode}}  {{item.userName}}</div>
          <div>
          {{item.borrowTime}} 借伞
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      current: 'history',
      historyList: [],
      Request: this.$api.api.prototype
    }
  },
  onShow () {
  },
  onLoad () {
    this.Request.borrowHistory(1, 200, this.globalData.api.token).then(res => {
      if (res.code !== 200) {
        console.log(res)
      } else {
        this.historyList = res.data.list
      }
    })
  },
  methods: {
    toDetails (id) {
      const url = '../../details/main?id=' + id + '&role=volunteer'
      wx.navigateTo({ url })
    }
  }
}
</script>

<style>
.history {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.history-part {
  flex: 1;
  background-color: #f9f9f9; 
}
.history-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
}
.history-more {
  text-align: end;
  margin-bottom: 13px;
  padding-right: 10px;
  font-size: 15px;
  color: #333;
}
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-size: 16px;
  background-color:  #ffffff;
}
.history-info {
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>
