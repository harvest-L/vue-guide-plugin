/*
 * @Author: flyharvest
 * @Date: 2020-05-29 19:16:31
 * @LastEditTime: 2020-05-30 14:34:34
 * @LastEditors: flyharvest
 */

export default {
  data () {
    return {
      _events: {},
      __ec: null
    }
  },
  methods: {
    _on (eventName, handle) {
      if (this._events.eventName) {
        this._events.eventName.push(handle)
        this.__ec.$on(eventName, handle)
      } else {
        this._events.eventName = [handle]
        this.__ec.$on(eventName, handle)
      }
    },
    _off () {
      for (let eventName in this._events) {
        this._events[eventName].forEach(handle => {
          this.__ec.$off(eventName, handle)
        })
      }
    },
    _setEventProxy (event) {
      this.__ec = this[event]
    }
  },
  beforeDestory () {
    this.__off()
  }
}
