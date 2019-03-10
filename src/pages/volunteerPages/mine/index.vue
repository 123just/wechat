<template>
  <div class="mine">
    <div class="mine-part">
        <div class="mine-item" style="height: 70px">
          <div class="user-name">
            <div>{{ name }}</div>
            <div>志愿者号：{{ volunteerId }}</div>
          </div>
          <div class="user-motto">
            <div class="avatar"></div>
            <div @click="changeRole">切换身份>></div>
          </div>
        </div>
        <i-cell-group>
          <i-cell title="个人信息" is-link url="/pages/index/main">
            <i-icon type="addressbook_fill" size="20" slot="icon" color="#4B9DF2" />
          </i-cell>
          <i-cell title="负责人">
            <i-icon type="mine_fill" size="20" slot="icon" color="#4B9DF2" />
          </i-cell>
          <i-cell title="负责人联系方式">
            <i-icon type="mobilephone_fill" size="20" slot="icon" color="#4B9DF2" />
          </i-cell>
        </i-cell-group>
    </div>
    <i-tab-bar :current="current" color="#4B9DF2" @change="handleChange" style="height:50px">
      <i-tab-bar-item key="sign" icon="homepage" current-icon="homepage_fill" title="首页"></i-tab-bar-item>
      <i-tab-bar-item key="sendUmbrella" icon="group" current-icon="group_fill" title="还伞"></i-tab-bar-item>
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
      name: 'JUST',
      volunteerId: '001',
      umbrellaId: 'T01',
      remark: '',
      current: 'mine'
    }
  },
  onShow () {
    this.current = 'mine'
  },
  methods: {
    handleChange (el) {
      this.current = el.mp.detail.key
      if (this.current !== 'mine') {
        const url = '../' + this.current + '/main'
        wx.navigateTo({ url })
      }
    },
    changeRole () {
      wx.reLaunch({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style>
.mine {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.mine-part {
  flex: 1;
  background-color: #f9f9f9; 
}
.mine-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
}
.mine-more {
  text-align: end;
  margin-bottom: 13px;
  padding-right: 10px;
  font-size: 15px;
  color: #333;
}
.mine-item {
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
