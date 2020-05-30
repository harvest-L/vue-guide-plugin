/*
 * @Author: flyharvest
 * @Date: 2020-05-24 15:27:29
 * @LastEditTime: 2020-05-30 19:21:37
 * @LastEditors: flyharvest
 */
import Guide from './core/Guide'
import Step from './core/Step'

import { GuideControl } from './core/guideControl.js'

export default {
  install (Vue, options) {
    const vueInstance = new Vue()
    const guide = new GuideControl({vueInstance, options})
    Vue.prototype.$guide = guide
    Vue.prototype.$$event = vueInstance
    Vue.directive('guide', {
      bind (el, binding) {
        let raw = binding.rawName
        let step = raw.split('.')[1]
        guide.add({
          step: Number(step),
          el: el
        })
      },
      componentUpdated (el, binding) {
        if (guide.isRender) {
          return
        }
        let raw = binding.rawName
        let step = raw.split('.')[1]
        guide._update({
          step: Number(step),
          el: el
        })
      }
    })
    Vue.component('TuiaGuide', Guide)
    Vue.component('TuiaGuideStep', Step)
  }
}
