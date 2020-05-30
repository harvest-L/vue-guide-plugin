<!--
 * @Author: flyharvest
 * @Date: 2020-05-25 16:53:28
 * @LastEditTime: 2020-05-30 19:01:04
 * @LastEditors: flyharvest
-->
<template>
  <div v-if="show" class="ff-step-content">
    <slot></slot>
  </div>
</template>

<script >
import eventMixin from './eventMixin.js'

export default {
  mixins: [ eventMixin ],
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
      default: () => {}
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    this._setEventProxy('$$event')
    const step = this.$guide.getCurrentStep()
    this.changeShow(step)
    this._on('stepChange', this.handleStepChange)
    this._on('shapePos', this.emitPos)
  },
  watch: {
    shapeConfig: {
      handler () {
        this.$$event.$emit('shapeConfigChange', {...this.shapeConfig}, this.step)
      },
      immediate: true
    }
  },
  methods: {
    changeShow (step) {
      if (step === this.step) {
        this.show = true
      } else {
        this.show = false
      }
    },
    handleStepChange (config) {
      this.changeShow(config.step)
    },
    emitPos (config) {
      if (config.step === this.step) {
        this.$emit('shapePos', config.pos)
      }
    }
  }
}
</script>

<style>
.ff-step-content {
  position: absolute;
  z-index: 4;
  width: 100%;
  height: 100%;
}
</style>
