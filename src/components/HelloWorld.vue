<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:23:41
 * @LastEditTime: 2020-05-28 10:06:09
 * @LastEditors: flyharvest
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li v-guide.1 :style="{padding: padding+ 'px'}">
        我是有padding的元素， 5秒以后，我将变大。
      </li>
      <li v-guide.5>
        <span>我是行内元素1</span>
        <span v-guide.2>我是行内元素2</span>
      </li>
      <li>
        <Test v-guide.3></Test>
      </li>
        <li :style="{padding: padding+ 'px'}">
          我是有padding的元素， 5秒以后，我将变大。
        </li>
      <li>
      </li>
      <br>
      <li style="margin-bottom:1000px">
        ----我是分割符号------
      </li>
    </ul>
    <ul>
      <li v-guide.4>
        我在垂直的滚动条中
      </li>
      <li>
      </li>
      <li>
      </li>
      <li>
      </li>
    </ul>
  </div>
</template>

<script>
import Test from './test'
export default {
  name: 'HelloWorld',
  components: {
    Test
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false,
      padding: 20
    }
  },
  mounted () {
    setTimeout(() => {
      this.padding = 40
    }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}

</style>
