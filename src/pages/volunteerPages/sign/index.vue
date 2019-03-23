<template>
  <div class="sign">
    <div class="sign-part" style="background:url('../../../img/sign_bg.png') no-repeat">
      <div class="sign-part-time">
        <div class="now-time">{{nowTime}}</div>
        <div class="sign-time" v-if='signTime'>签到时间：{{signTime}}</div>
      </div>
      <div class="sign-btn" @click="signClick">
        {{ signBtnText === 'signIn' ? '签 到' : '签 退' }}
      </div>
    </div>
    <div class="history">
      <div class="history-title">历史签到签退记录</div>
      <div class="history-main">
        <div class="history-item" v-for="item in signHistory" v-bind:key="item.index">
          <sign-history-card :signInTime='item.signInTime' :signOutTime = item.signBackTime></sign-history-card>
        </div>
      </div>  
    </div>
    <i-tab-bar :current="current" color="#4B9DF2" @change="handleChange">
      <i-tab-bar-item key="sign" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="sendUmbrella" icon="group" current-icon="group_fill" title="还伞"></i-tab-bar-item>
      <i-tab-bar-item key="history" icon="remind" current-icon="remind_fill" title="历史"></i-tab-bar-item>
      <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" title="我的"></i-tab-bar-item>
    </i-tab-bar>
  </div>
</template>

<script>
import { formatTime, formatOnlyTime } from '@/utils/index'
import { setInterval, clearInterval } from 'timers'
import SignHistoryCard from '@/components/sign-history-card'

export default {
  components: {
    SignHistoryCard
  },

  data () {
    return {
      nowTime: '',
      signTime: '',
      interval: '',
      signBtnText: 'signIn',
      current: 'sign',
      signHistory: [],
      Request: this.$api.api.prototype
    }
  },
  onShow () {
    this.current = 'sign'
  },
  onLoad () {
    this.Request.signStatus(this.globalData.api.token).then(res => {
      if (res.code !== 200) {
        console.log(res)
      } else {
        if (res.data.type) { // 已签到,显示签退 type = 1
          this.signBtnText = 'signOut'
          this.signTime = res.data.time.replace(/-/g, '/') // 时间
        } else { // 已签退，显示签到
          this.signBtnText = 'signIn'
          this.signTime = ''
        }
      }
    })
    this._getNowTime()
    this._getSignHistory()
  },
  onUnload () {
    this._stopInterval()
  },
  methods: {
    handleChange (el) {
      this.current = el.mp.detail.key
      if (this.current !== 'sign') {
        const url = '../' + this.current + '/main'
        wx.navigateTo({ url })
      }
    },
    signClick () {
      console.log('signClick')
      this.Request.sign(this.globalData.api.token).then(res => {
        if (res.code !== 200) {
          console.log(res)
        } else {
          if (this.signBtnText === 'signOut') { // 签退
            this.signBtnText = 'signIn'
            this.signTime = ''
          } else { // 签到
            this.signBtnText = 'signOut'
            this.signTime = formatOnlyTime(new Date())
          }
          this._getSignHistory()
        }
      }).catch(res => {
        console.log(res)
      })
    },
    _getSignHistory () {
      let that = this
      this.Request.signInfo(1, 30, this.globalData.api.token).then(res => {
        if (res.code !== 200) {
          console.log(res)
        } else {
          console.log(res)
          that.signHistory = res.data.list
        }
      })
    },
    _getNowTime () {
      this.interval = setInterval(() => {
        this.nowTime = formatTime(new Date())
      }, 1000)
    },
    _stopInterval () {
      clearInterval(this.interval)
    }
  }
}
</script>

<style>
.sign {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.sign-part {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 210px;
}
.sign-part-time {
  width: 100%;
  height: 50px;
  font-size: 16px;
  color: #ffffff;
  padding: 5px 0 0 20px;
}
.sign-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border-radius: 50px;
  font-size: 18px;
  background-color: #ffffff;
}
.history{
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  background-color: #F2F2F2;
}
.history-title{
  height: 20px;
  margin: 0 0 10px 10px;
  font-size: 16px;
  color: #333;
}
.history-main{
  flex: 1;
  overflow: scroll;
}
.history-item{
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffffff; 
}
i-tab-bar{
  height: 60px;
}
</style>
