<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:59:23
 * @LastEditTime: 2020-05-30 19:00:54
 * @LastEditors: flyharvest
-->
<template>
  <div id="vue-ff-guide" v-if="guideShow">
    <div class="ff-guide-focus-shape"
      :style="createShapeStyle"
      v-if="focusEl">
    </div>
    <div class="ff-guide-extra" @click="goNext">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isEqualObj } from './util'
import eventMixin from './eventMixin'

export default {
  props: {
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
    },
    clickNext: {
      type: Boolean,
      default: true
    }
  },
  mixins: [eventMixin],
  data () {
    return {
      shape: null,
      guideShow: false,
      focusEl: null,
      isTrans: false,
      shapePos: {}
    }
  },
  created () {
    this._setEventProxy('$$event')
  },
  mounted () {
    this._on('show', this.handleShow)
    this._on('hide', this.handleHide)
    this._on('contentChange', this.handleContentChange)
    this._on('stepChange', this.handleStepChange)
    this._on('start', this.handleStart)
    this._on('end', this.handleEnd)
  },
  computed: {
    createShapeStyle () {
      let {width, height, top, left, ...others} = this.shape
      return {
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
        ...others
      }
    }
  },
  methods: {
    handleStart () {
      this.handleShow()
      this.$emit('start')
    },
    handleEnd () {
      this.handleHide()
      this.$emit('end')
    },
    handleShow () {
      this.stopScroll()
      this.guideShow = true
    },
    handleHide () {
      this.resetScroll()
      this.guideShow = false
    },
    handleContentChange (config) {
      this.step = config.step
      this.focusEl = config.el
      this.focusEl.scrollIntoView({
        block: 'center'
      })
      const shapeConfig = Object.assign(config._shapeConfig, config.shapeConfig)
      this.shape = this.getShape(shapeConfig || {})
    },
    handleStepChange (config) {
      this.step = config.step
      this.focusEl = config.el
      this.focusEl.scrollIntoView({
        block: 'center'
      })
      const shapeConfig = Object.assign(config._shapeConfig, config.shapeConfig)
      this.shape = this.getShape(shapeConfig || {})
      this.$emit('stepChange', config.step)
    },
    stopScroll () {
      document.documentElement.style.overflow = 'hidden'
    },
    resetScroll () {
      document.documentElement.style.overflow = 'auto'
    },
    getShape (shapeConfig) {
      if (this.focusEl) {
        let {top, left, width, height, bottom, right} = this.focusEl.getBoundingClientRect()
        const userConfig = {...shapeConfig}
        if (userConfig.pad && typeof userConfig.pad === 'number') {
          const pad = Math.floor(userConfig.pad)
          const pad2 = 2 * pad
          top -= pad
          left -= pad
          width += pad2
          height += pad2
          bottom += pad
          right += pad
          delete userConfig.pad
        }
        this.shapePos = {width, height, left, top, bottom, right}
        return Object.assign({top, left, width, height}, {...userConfig})
      }
      return {}
    },
    goNext () {
      this.$emit('layerClick')
      if (this.clickNext) {
        this.$guide.play()
      }
    }
  },
  watch: {
    shapeConfig: {
      handler () {
        this.$$event.$emit('shapeConfigChange', {...this.shapeConfig})
      },
      immediate: true
    },
    shapePos: {
      handler (newValue, oldValue) {
        if (isEqualObj(newValue, oldValue)) {
          return
        }
        const playload = {
          pos: {...this.shapePos},
          step: this.$guide.getCurrentStep()
        }
        this.$emit('shapePos', playload)
        this.$$event.$emit('shapePos', playload)
      },
      deep: true
    },
    autoPlay: {
      handler (value) {
        this.$$event.$emit('autoPlayChange', this.autoPlay)
      },
      immediate: true
    },
    autoPlayTimes: {
      handler (value) {
        this.$$event.$emit('autoPlayTimes', this.autoPlayTimes)
      },
      immediate: true
    }
  }
}
</script>

<style>
#vue-ff-guide {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}
.ff-guide-event-shape {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: transparent
}
.ff-guide-focus-shape {
  position: absolute;
  box-shadow: 0px 0px 0px 1000px rgba(0, 0, 0, .8);
  background: transparent;
  transition: all 0.3s;
  z-index:2;
}
.ff-guide-extra {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
}
</style>
