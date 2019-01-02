<template>
  <div class="card">
    <span class="card-title">{{title}}</span>
    <span class="card-text">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    'title': String,
    'text': String
  }
}
</script>

<style>
.card {
  display: flex;
  justify-content: space-between;
  background: #ffffff;
}
.card-title{
  width: 30%;
  font-size: 13px;
  color: #333;
  margin-right: 5px;
}
.card-title{
  flex: 1;
  font-size: 13px;
  color: #333;
}
</style>
