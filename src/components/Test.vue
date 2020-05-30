<!--
 * @Author: flyharvest
 * @Date: 2020-05-30 19:08:17
 * @LastEditTime: 2020-05-30 19:28:27
 * @LastEditors: flyharvest
-->
<template>
  <div id="test" v-guide.1>
    <div v-for="item in list" :key="item.id">{{item}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      show: false
    }
  },
  mounted () {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push({
          item: i
        })
      }
      this.show = true
    }, 5000)
  }
}
</script>
