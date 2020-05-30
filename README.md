<!--
 * @Author: flyharvest
 * @Date: 2020-05-24 15:23:41
 * @LastEditTime: 2020-05-30 19:03:25
 * @LastEditors: flyharvest
--> 
# vue-guide-plugin

一个简单的蒙层引导， 新手引导 的 vue 插件.

## 安装

```
npm i vue-guide-plugin
或
// 使用github


```

## 用法

```
import VueGuidePlugin from 'vue-guide-plugin'

Vue.use(VueGuidePlugin)
```
1. 对任何页面中,你需要聚焦的节点 使用 指令 ```v-guide.[number]```

2. 然后在 根组件使用内置组件 ```<TuiaGuide></TuiaGuide>```

3. 在开始新手引导的时候,使用 ```this.$guide.play()```就可以开始了.

## 例子

App组件
```
<template>
  <div id="app">
    <div class="title">vue-guide-plugin</div>
    <div v-guide.1>
      <div class="sub-title">异步列表测试</div>
      <div v-for="item in list" :key="item.id">{{item}}</div>
    </div>
    <div>
      <span v-guide.2>文字测试1111</span>
      <span>文字测试</span>
    </div>
    <div style="height:200px;textAlign:center">间隔:200px</div>
    <div style="marginTop: -40px" v-guide.3>负 margin-top: 40px</div>
    <div class="box-wrapper">
      <div class="box box1" v-guide.4>绝对定位的元素 left: 20, top: 10</div>
      <div class="box box2" v-guide.5>transform的元素 x: 200, y: 200</div>
      <div class="box box3" v-guide.6>scale: 1.2</div>
    </div>
    <div style="height: 1000px">我是一个很高的高度: 1000px</div>
    <div>
      <div v-guide.7>垂直滚动的测试</div>
    </div>
    <Guide></Guide>
  </div>
</template>

<script>
import Guide from './components/Guide'
export default {
  name: 'App',
  components: {
    Guide
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

```

Guide 组件
```
<!--
 * @Author: flyharvest
 * @Date: 2020-05-30 13:05:37
 * @LastEditTime: 2020-05-30 17:03:50
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
    posChange({step, pos}) {
      console.log(step, pos)
    },
    step2PosChange(pos) {
      console.log('我坚挺')
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
```

## 原理

1. 利用指令```v-guide```,获取需要的聚焦元素```el``
2. 在需要聚焦该元素的时候调用 ```el.getBoundingClientRect()``` 获取当前元素的 ```width, height, left, top``` 根据形状绘制一个镂空的元素, 镂空的元素的```box-shadow ``` 设置为一个较大的值,用来当引导层.

3. 元素更新的时候,重复1,2动作

## API

1. ```$guide```

流程控制器, 在安装插件的时候被扩展到```Vue.prototype``` 上


| 方法 | 参数 | 返回值 | 描述 |
| ---- | ---- | ---- | ---- |
| play | num 步数(从1开始) 或者 空 | void | 开始蒙层引导, 为空的时候,自动调用下一步 |
| show | void | void | 展示 |
| hide | void | void | 隐藏 |

2. ```<TuiaGuide />```
  * ```props```

    | name | 描述 | 类型
    | ---- | ---- | ---- |
    | autoPlay | 自动下一步 | boolean |
    | autoTimes | 自动下一步的时间 | number |
    | shapeConfig | 聚焦形状的style | object |
    | clickNext | 是否开启点击任意位置,自动到一步 | boolean |

    注意: shapeConfig 聚焦形状的通用属性,会```<TuiaGuideStep />```中传递的属性覆盖掉.
  
  * ```event```

    | name | 描述 | 回调参数 |
    | ---- | ---- | ---- |
    | start | 引导开始时触发 | void |
    | end | 引导结束触发 | void |
    | layerClick | 引导层被点击 | void |
    | shapePos | 引导聚焦元素的位置改变 | {step: 位置, pos: {width, height, left, top, right, bottom}} |
    | stepChange | 引导步数变化 | step 引导步数 |

3. ```<TuiaGuideStep />```

  * ```props```
    | name | 描述 | 类型 |
    | ---- | ---- | ---- |
    | step | 必须的参数 | number |
    | shapeConfig | 同上, 但优先级较高 | -- |
  * ```event```
    | name | 描述 | 类型 |
    | ---- | ----| ----|
    | shapePos | 形状改变的时候触发 | {width,height, left, top, bottom, right} |

    同 ```getBoundingClientRect```的意义.



## 注意

> __shapeConfig中支持 pad: number 和 padding不同的是会将其计算到 width, height, left, bottom, top, right 保证 聚焦元素处于居中位置__

> __对于位置随 聚焦元素变化的引导元素,应该通过 监听 shapePos 来计算绝对位置,参见例子的第二步引导__

> __应该确保this.$guide.play()调用的时候,聚焦元素已经初始化渲染完毕__
