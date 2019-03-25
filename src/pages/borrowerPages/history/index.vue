<template>
  <div class="history">
    <div class="history-part">
      <div class="history-title">历史借还伞记录</div>
      <div class="history-main">
        <div class="history-info" v-if="unsendList.length === 0">无历史借还伞记录~</div>
        <div class="history-item" v-for="item in unsendList" :key="item" @click="toDetails(item.id)">
          <div>{{item.umbrellaCode}}  {{item.userName}}</div>
          <div>{{item.borrowTime}} 借伞</div>
        </div>
      </div>
    </div>
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
      umbrellaId: '',
      remark: '',
      current: 'history',
      unsendList: [],
      Request: this.$api.api.prototype
    }
  },
  onShow () {
    this.current = 'history'
  },
  onLoad () {
    this.Request.personBorrow(1, 100, this.globalData.api.token).then(res => {
      if (res.code !== 200) {
        console.log(res)
      } else {
        this.unsendList = res.data.list
        console.log(res)
      }
    })
  },
  methods: {
    handleChange (el) {
      this.current = el.mp.detail.key
      if (this.current !== 'history') {
        const url = '../' + this.current + '/main'
        wx.navigateTo({ url })
      }
    },
    toDetails (id) {
      const url = '../../details/main?id=' + id + '&role=borrower'
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
