<!--
 * @Author: flyharvest
 * @Date: 2020-05-25 15:08:29
 * @LastEditTime: 2020-05-28 10:04:58
 * @LastEditors: flyharvest
-->
<template>
  <div class="sss">
    我是一个测试的组件
  </div>
</template>

<script>
export default {
}
</script>

<style>
@keyframes HH {
  0% {
    transform: scale(0.9)
  }
  100% {
    transform: scale(1.4)
  }
}
.sss {
  width: 100px;
  height: 100px;
  background: blue;
  color: white;
  transform: scale(1.2);
  /* animation: HH 1s  infinite linear; */
}

</style>
