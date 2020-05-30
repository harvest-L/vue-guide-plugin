<!--
 * @Author: flyharvest
 * @Date: 2020-05-30 13:05:37
 * @LastEditTime: 2020-05-30 18:01:02
 * @LastEditors: flyharvest
-->
<template>
  <div>
    <TuiaGuide
    @shapePos="posChange"
    :clickNext="false"
    @layerClick="layerClick"
    :shapeConfig="{borderRadius: '10px'}"
    @end="guideEnd"
    @start="guideStart">
      <TuiaGuideStep
        :step="2"
        :shapeConfig="{pad: 20}"
        @shapePos="step2PosChange">
        <div class="step2-button">我是第二步的引导按钮</div>
        <div class="step2-pop" :style="step2Style">
          我是第二步的pop提示
        </div>
      </TuiaGuideStep>
    </TuiaGuide>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step2Pos: null
    }
  },
  computed: {
    step2Style () {
      if (this.step2Pos) {
        console.log(this.step2Pos)
        return {
          top: this.step2Pos.bottom + 60 + 'px',
          left: this.step2Pos.left + 40 + 'px'
        }
      }
      return {}
    }
  },
  methods: {
    posChange ({step, pos}) {
      console.log(step, pos)
    },
    step2PosChange (pos) {
      this.step2Pos = pos
    },
    layerClick () {
      this.$guide.play()
    },
    guideEnd () {
      console.log('结束了')
    },
    guideStart () {
      console.log('开始了')
    }
  }
}
</script>

<style>
.step2-pop {
  position: absolute;
  color: white;
  transition: 0.3s all
}
.step2-button {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  background: white;
}
</style>
