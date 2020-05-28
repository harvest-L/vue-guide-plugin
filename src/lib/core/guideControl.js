/*
 * @Author: flyharvest
 * @Date: 2020-05-24 16:51:22
 * @LastEditTime: 2020-05-27 20:14:22
 * @LastEditors: flyharvest
 */

export class GuideControl {
  constructor ({vueInstance, options}) {
    // 当前步骤
    this.step = 0
    // 保存所有的更新步骤
    this.steps = {}
    // 当前的vue实际例子
    this.vue = vueInstance
    // 是否已经开始步骤
    this.started = false
    // 是否触发了下一步
    this.isRender = false
    // 是否已经完成
    this.ended = false
    // 是否开启自动到一下步骤
    this.autoPlay = false
    // 自动到下一步步骤的秒数量
    this.autoTimes = 5000
    // 统一的计时器
    this.timer = null
    // 当前的镂空的图形形状
    this.shape = null
    // 当前的落空的形状自定义配置
    this.shapeConfig = {}

    // 用户配置变化
    this.vue.$on('shapeConfigChange', (config, step) => {
      if (step) {
        this.setShapeConfig(config, step)
      } else {
        this.shapeConfig = config
      }
    })

    this.vue.$on('autoPlay', (value, step) => {
      let stepConfig = this.getStepConfig(step)
      if (stepConfig) {
        stepConfig.autoPlay = value
      }
    })

    this.vue.$on('autoTimes', (value, step) => {
      let stepConfig = this.getStepConfig(step)
      if (stepConfig) {
        stepConfig.autoTimes = value
      }
    })
  }
  _mixConfig (num) {
    const stepConfig = this.getStepConfig(num)
    if (stepConfig) {
      return Object.assign({_shapeConfig: {...this.shapeConfig}}, {...stepConfig})
    }
    return {}
  }
  // 移动到下一步 或指定 步数
  _setStepNum (num) {
    if (num) {
      this.step = num
    } else {
      this.step += 1
    };
  }
  _canMoveNext (num) {
    if (num) return this.getStepConfig(num)
    num = this.step + 1
    return this.getStepConfig(num)
  }
  // 增加一步
  add (config) {
    let step = config.step
    let stepConfig = this.getStepConfig(step)
    if (stepConfig) {
      this.steps['step' + step] = Object.assign(config, stepConfig)
    } else {
      this.steps['step' + step] = config
    }
  }

  // if当前的步骤
  getCurrentStep () {
    return this.step
  }

  // 获取步骤
  getStepConfig (num) {
    if (!num) {
      return this.steps['step' + this.step]
    }
    return this.steps['step' + num]
  }
  // 设置步骤的内容
  setShapeConfig (config, num) {
    const stepNum = num || this.step
    if (this.steps['step' + stepNum]) {
      this.steps['step' + stepNum].skinConfig = config
    }
  }
  _next (num) {
    if (this._canMoveNext(num)) {
      this.isRender = true
      this._setStepNum(num)
      const stepConfig = this.getStepConfig()
      if (stepConfig.auto || this.autoPlay) {
        this.timer = setTimeout(() => {
          this._next()
        }, stepConfig.autoTimes || this.autoTimes)
      }
      this.vue.$emit('$stepChange', this._mixConfig(num))
      this.vue.$nextTick(() => {
        this.isRender = false
      })
    } else {
      this.vue.$emit('guideEnd')
    }
  }
  // 开始
  start (num) {
    if (this._started) {
      return
    }
    this.vue.$emit('guideStart')
    // 防止step1还没创建，监听函数还没有准备好
    this.vue.$nextTick(() => {
      this._next(num)
    })
  }

  _update (config) {
    this.add(config)
    if (this.step === config.step) {
      // this.vue.$emit('$stepChange', this.getStepConfig())
      this.vue.$emit('$contentChange', this._mixConfig(config.step))
    }
  }

  play (num) {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    if (!this.started) {
      this.started = true
      this.start(num)
    } else {
      this._next(num)
    }
  }

  $on (...args) {
    this.vue.$on(...args)
  }

  $emit (...args) {
    this.vue.$emit(...args)
  }

  hide () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.vue.$emit('guideHide')
  }

  show () {
    this.vue.$emit('guideShow')
  }

  reset () {
    this.step = 0
  }

  getShape () {
    return this.shape
  }
}
