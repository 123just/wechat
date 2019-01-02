<template>
  <div>
    <div class="sign-part">
      <div class="sign-part-time">
        <div class="now-time">{{nowTime}}</div>
        <div class="sign-time">{{signTime}}</div>
      </div>
      <div class="sign">

      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      nowTime,
      signTime
    }
  },

  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
