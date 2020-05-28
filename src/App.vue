<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:23:41
 * @LastEditTime: 2020-05-28 10:06:50
 * @LastEditors: flyharvest
-->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <button @click="haha">点我</button>
    </div>
    <HelloWorld/>
    <TuiaGuide
      :shapeConfig="shape"
      @shapePos="shapePos">
      <TuiaGuideStep :step="1"
        :shapeConfig="{background:'red'}"
        @shapePos="step1ShapePos">
        <div class="text">我是第一步的引导</div>
      </TuiaGuideStep>
      <TuiaGuideStep :step="2" :shapeConfig="{ pad: 10 }">
        <div class="text">我是第二部的按钮</div>
      </TuiaGuideStep>
      <TuiaGuideStep :step="3" :shapeConfig="{ pad: 80 }">
        <div class="text">我是第三部的按钮</div>
      </TuiaGuideStep>
      <TuiaGuideStep :step="4" >
        <div class="text">我是第四步的按钮</div>
      </TuiaGuideStep>
      <TuiaGuideStep :step="5">
        <div class="text">我是第5步的按钮</div>
      </TuiaGuideStep>
    </TuiaGuide>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data () {
    return {
      shape: {
        borderRadius: '20px',
        border: '1px solid red'
        // padding: '20px'
      }
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    this.$nextTick(() => {
      // this.$guide.play()
      // this.$guide.$on('$stepChange', () => {
      //   console.log(this.$guide.getCurrentStep())
      // })
    })
  },
  methods: {
    haha () {
      // console.log('下一步')
      this.$guide.play()
      this.$guide.autoPlay = true
    },
    shapePos (config) {
      console.log('监听到位置变化了')
      console.log(config)
    },
    step1ShapePos (pos) {
      console.log('step监听到位置变化了')
      console.log(pos)
    }
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
.text {
  background: red;
  color: white
}
</style>
