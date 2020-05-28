<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:59:23
 * @LastEditTime: 2020-05-28 10:03:24
 * @LastEditors: flyharvest
-->
<template>
  <div id="vue-ff-guide" v-if="guideShow">
    <div class="ff-guide-event-shape" @click="goNext"></div>
    <div class="ff-guide-focus-shape"
      :style="createShapeStyle"
      v-if="focusEl">
    </div>
    <div class="ff-guide-extra">
      <slot></slot>
    </div>
  </div>
</template>

<script>

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
      defalut: {}
    }
  },
  data () {
    return {
      shape: null,
      guideShow: false,
      focusEl: null,
      isTrans: false,
      shapePos: {}
    }
  },
  mounted () {
    this.$$event.$on('show', () => {
      this.resetScroll()
      this.guideShow = false
    })
    this.$$event.$on('hide', () => {
      this.resetScroll()
      this.guideShow = false
    })
    this.$$event.$on('guideEnd', () => {
      this.resetScroll()
      this.guideShow = false
    })
    this.$$event.$on('$contentChange', (config) => {
      this.step = config.step
      this.focusEl = config.el
      this.focusEl.scrollIntoView({
        block: 'center'
      })
      const shapeConfig = Object.assign(config._shapeConfig, config.shapeConfig)
      this.shape = this.getShape(shapeConfig || {})
    })
    this.$$event.$on('$stepChange', (config) => {
      this.step = config.step
      this.focusEl = config.el
      this.focusEl.scrollIntoView({
        block: 'center'
      })
      const shapeConfig = Object.assign(config._shapeConfig, config.shapeConfig)
      this.shape = this.getShape(shapeConfig || {})
    })
    this.$$event.$on('guideStart', (config) => {
      this.stopScroll()
      this.guideShow = true
    })
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
    stopScroll () {
      document.documentElement.style.overflow = 'hidden'
    },
    resetScroll () {
      document.documentElement.style.overflow = 'auto'
    },
    getShape (shapeConfig) {
      if (this.focusEl) {
        let {top, left, width, height} = this.focusEl.getBoundingClientRect()
        const userConfig = {...shapeConfig}
        if (userConfig.pad && typeof userConfig.pad === 'number') {
          const pad = Math.floor(userConfig.pad)
          const pad2 = 2 * pad
          top = top - pad
          left = left - pad
          width += pad2
          height += pad2
          delete userConfig.pad
        }
        this.shapePos = {width, height, left, top}
        return Object.assign({top, left, width, height}, {...userConfig})
      }
      return {}
    },
    goNext () {
      this.$guide.play()
    }
  },
  watch: {
    shapeConfig: {
      handler () {
        console.log(this.shapeConfig)
        this.$$event.$emit('shapeConfigChange', {...this.shapeConfig})
      },
      immediate: true
    },
    shapePos: {
      handler () {
        const playload = {
          pos: {...this.shapePos},
          step: this.$guide.getCurrentStep()
        }
        this.$emit('shapePos', playload)
        this.$$event.$emit('shapePos', playload)
      },
      deep: true
    },
    autoPlay () {
      this.$$event.$emit('autoPlayChange', this.autoPlay)
    },
    autoPlayTimes () {
      this.$$event.$emit('autoPlayTimes', this.autoPlayTimes)
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
}
</style>
