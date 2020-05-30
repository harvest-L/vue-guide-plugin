<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:23:41
 * @LastEditTime: 2020-05-30 19:20:12
 * @LastEditors: flyharvest
-->
<template>
  <div id="app">
    <div class="title">vue-guide-plugin</div>
    <Test></Test>
    <div v-guide.2>
      <div class="sub-title">异步列表测试</div>
      <div v-for="item in list" :key="item.id">{{item}}</div>
    </div>
    <div>
      <span v-guide.3>文字测试1111</span>
      <span>文字测试</span>
    </div>
    <div style="height:200px;textAlign:center">间隔:200px</div>
    <div style="marginTop: -40px" v-guide.4>负 margin-top: 40px</div>
    <div class="box-wrapper">
      <div class="box box1" v-guide.5>绝对定位的元素 left: 20, top: 10</div>
      <div class="box box2" v-guide.6>transform的元素 x: 200, y: 200</div>
      <div class="box box3" v-guide.7>scale: 1.2</div>
    </div>
    <div style="height: 1000px">我是一个很高的高度: 1000px</div>
    <div>
      <div v-guide.8>垂直滚动的测试</div>
    </div>
    <Guide></Guide>
  </div>
</template>

<script>
import Guide from './components/Guide'
import Test from './components/Test'
export default {
  name: 'App',
  components: {
    Guide,
    Test
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$guide.play()
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push({
          item: i,
          id: i
        })
      }
    }, 5000)
  },
  methods: {
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title {
  font-size: 40px;
  font-weight: 700;
}
.box-wrapper {
  position: relative;
}
.box {
  width: 100px;
  height: 100px;
}
.box1 {
  position: absolute;
  bottom: -200px;
  right: 100px;
  background: coral;
}
.box2 {
  transform: translate(50px, 250px);
  background: red;
}
.box3 {
  transform: scale(1.3);
  background: blue;
}
</style>
