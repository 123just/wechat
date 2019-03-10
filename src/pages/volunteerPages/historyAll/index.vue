<template>
  <div class="history">
    <div class="history-part">
      <div class="history-title">历史借还伞记录</div>
      <div class="history-main">
        <div class="history-item" v-for="item in unsendList" :key="item" @click="toDetails(item.id)">
          <div>{{item.umbrellaId}}  {{item.borrowerName}}</div>
          <div>
          {{item.borrowTime}} {{isBorrow ? '借伞': '还伞'}}
          </div>
        </div>
      </div>
    </div>
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
        borrowTime: new Date(),
        isBorrow: true
      }, {
        unsendId: '002',
        umbrellaId: 'T02',
        borrowerName: 'just1',
        borrowTime: new Date(),
        isBorrow: false
      }]
    }
  },
  onShow () {
  },
  onLoad () {
    // 获取unsendList数组
    this.unsendList.forEach(e => {
      e.borrowTime = formatTime(e.borrowTime)
    })
  },
  methods: {
    toDetails (id) {
      const url = '../../details/main?id=' + id
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
