<template>
  <div class="sign-history-card">
    <div class="sign-in">
      <i-icon type="success" size="20" color="#4B9DF2"/>
      <div class="sign-text"> {{ signInTime }} 签到</div>
    </div>
    <div class="sign-out" v-if="signOutTime">
      <i-icon type="success" size="20" color="#4B9DF2"/>
      <div class="sign-text"> {{ signOutTime }} 签退</div>
    </div>
    <div class="sign-out" v-if="!signOutTime">
      <i-icon type="success" size="20" color="#FF0000"/>
      <div class="sign-text" style="color: #FF0000"> 请注意签退哟！ </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'signInTime': String,
    'signOutTime': String
  }
}
</script>

<style>
.sign-history-card{
  width: 100%;
}
.sign-in, .sign-out{
  display: flex;
  align-items: center;
  font-size: 15px;
}
.sign-text{
  margin-left: 15px;
}
</style>
