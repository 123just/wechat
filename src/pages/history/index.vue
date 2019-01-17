<template>
  <div class="history">
    <div class="history-part">
      <div class="history-title">超时未还伞记录</div>
      <div class="history-more" @click="historyMore">历史经手伞记录>></div>
      <div class="history-main">
        <div class="history-item" v-for="item in unsendList" :key="item" @click="toDetails(item.id)">
          <div>{{item.umbrellaId}}  {{item.borrowerName}}</div>
          <div>
          {{item.borrowTime}} 借伞
        </div>
        </div>
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
import { formatTime } from '@/utils/index'

export default {

  data () {
    return {
      openId: '',
      umbrellaId: '',
      remark: '',
      current: 'history',
      unsendList: [{
        unsendId: '001',
        umbrellaId: 'T01',
        borrowerName: 'just',
        borrowTime: new Date()
      }, {
        unsendId: '002',
        umbrellaId: 'T02',
        borrowerName: 'just1',
        borrowTime: new Date()
      }]
    }
  },
  onShow () {
    this.current = 'history'
  },
  onLoad () {
    // 获取unsendList数组
    this.unsendList.forEach(e => {
      e.borrowTime = formatTime(e.borrowTime)
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
    historyMore () {
      const url = '../index/main'
      wx.navigateTo({ url })
    },
    toDetails (id) {
      const url = '../details/main?id=' + id
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
</style>
