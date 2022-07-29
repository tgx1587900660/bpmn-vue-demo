<template>
  <div class="demo1">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="tool-bar">
      <button ref="saveAsBpmnRef" @click="saveAsBpmn">保存为bpmn</button>
      <button ref="saveAsSvgRef" @click="saveAsSvg">保存为svg</button>
    </div>
    <div class="containers">
      <div class="view-box" id="bpmn"></div>
      <div class="tool-box">
        <div id="properties"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import { demoXml } from '../src/mock/xmlStr'
import pizzaXml from '../src/mock/pizza-collaboration.bpmn'
import customXml from '../src/mock/custom.bpmn'

import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

export default {
  name: '',
  props: {},
  data() {
    return {
      // 是否加载中
      loading: false,
      // bpmn 实例对象
      bpmnInstance: null,
      // 要被绘制的初始 xml 文件
      viewXml: '',
      // 变更后最新的 xml
      newXml: '',
      // 变更后最新的 svg
      newSvg: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initView()
    },
    async initView() {
      this.detachView()
      this.initInstance()
      this.viewXml = await this.getBpmnXml()
      this.createNewView(this.viewXml)
      this.initListener()
    },
    // 初始化 bpmn 实例对象
    initInstance() {
      this.bpmnInstance = new BpmnModeler({
        container: '#bpmn',
        //添加控制板
        propertiesPanel: {
          parent: '#properties'
        },
        additionalModules: [
          // 右边的属性栏
          propertiesPanelModule,
          propertiesProviderModule
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
    },
    // 初始化事件监听器
    initListener() {
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnInstance.on('commandStack.changed', () => {
        console.log('commandStack.changed')
        this.getNewXml()
        this.getNewSvg()
      })
    },
    // 获取最新的 xml
    getNewXml() {
      this.bpmnInstance.saveXML({ format: true }, (err, newXml) => {
        if (err) console.warn(err)
        this.newXml = newXml
      })
    },
    // 获取最新的 svg
    getNewSvg() {
      this.bpmnInstance.saveSVG((err, newSvg) => {
        if (err) console.warn(err)
        this.newSvg = newSvg
      })
    },
    // 获取 xml
    getBpmnXml() {
      return new Promise((resolve, reject) => {
        this.loading = true
        setTimeout(() => {
          resolve(demoXml)
          // resolve(pizzaXml)
          // resolve(customXml)
          this.loading = false
        }, 1500)
      })
    },
    // 绘制 demo 图
    createNewView(xml) {
      this.bpmnInstance.importXML(xml, err => {
        if (err) return console.warn(err)
        console.log('绘制 demo 图成功!')
        // 让图能自适应屏幕
        this.bpmnInstance.get('canvas').zoom('fit-viewport')
      })
    },
    // 销毁图形
    detachView() {
      this.bpmnInstance && this.bpmnInstance.detach()
    },
    // 销毁配置栏
    detachToolBox() {
      const propertiesPanel = this.bpmnInstance.get('propertiesPanel')
      propertiesPanel.detach()
    },
    // 下载为 bpmn 文件
    saveAsBpmn() {
      this.getNewXml()
      const encodedData = window.encodeURIComponent(this.newSvg)
      this.downloadFn(encodedData, `view${Date.now()}.bmpn`)
    },
    // 下载为 svg 文件
    saveAsSvg() {
      this.getNewSvg()
      const encodedData = window.encodeURIComponent(this.newSvg)
      this.downloadFn(encodedData, `view${Date.now()}.svg`)
    },
    // 下载函数: (文件码, 文件名) => viod
    downloadFn(data, fileName) {
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = `data:application/bpmn20-xml;charset=UTF-8,${data}`
      a.setAttribute('download', fileName)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo1 {
  padding: 10px 20px;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  .tool-bar {
    height: 35px;
  }
  .containers {
    flex: 1;
    position: relative;
    border: 1px solid #c0c0c0;
    height: 100%;
    width: 100%;
    .view-box {
      height: 100%;
      width: 100%;
    }
    .tool-box {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 100%;
      padding: 10px;
      overflow: auto;
      background-color: #fff;
      border-left: 1px solid #c0c0c0;
    }
  }
}
:deep(.bjs-container .bjs-powered-by) {
  display: none;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  background-color: #fff;
}
</style>
