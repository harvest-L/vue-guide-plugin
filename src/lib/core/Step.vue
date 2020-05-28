<!--
 * @Author: flyharvest
 * @Date: 2020-05-25 16:53:28
 * @LastEditTime: 2020-05-28 10:03:52
 * @LastEditors: flyharvest
-->
<template>
  <div v-if="show" class="ff-step-content">
    <slot></slot>
  </div>
</template>

<script >
export default {
  props: {
    step: {
      type: Number | String,
      default: null
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    autoTimes: {
      type: Number,
      default: 5000
    },
    shapeConfig: {
      type: Object,
      defalut: {}
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    const step = this.$guide.getCurrentStep()
    if (this.step === step) {
      this.show = true
    } else {
      this.show = false
    }
    this.$$event.$on('$stepChange', (config) => {
      this.$nextTick(() => {
        if (config.step === this.step) {
          this.show = true
        } else {
          this.show = false
        }
      })
    })
    this.$$event.$on('shapePos', (config) => {
      if (config.step === this.step) {
        this.$emit('shapePos', config.pos)
      }
    })
  },
  watch: {
    shapeConfig: {
      handler () {
        this.$$event.$emit('shapeConfigChange', {...this.shapeConfig}, this.step)
      },
      immediate: true
    }
  }
}
</script>

<style>
.ff-step-content {
  position: absolute;
  z-index: 4;
}
</style>
