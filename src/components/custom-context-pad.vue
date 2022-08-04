<template>
  <div class="custom-context-pad">
    <div class="tool-bar">
      <p>
        自定义图形右键菜单
        <strong>点击图形时出来的东西</strong>
      </p>
    </div>
    <div class="containers">
      <div class="view-box" id="bpmn"></div>
    </div>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import { demoXml } from '@/mock/xmlStr.js'
import customModule from './custom'

export default {
  name: 'custom-context-pad',
  data() {
    return {
      // bpmn 实例对象
      bpmnModeler: null,
      // 要被绘制的初始 xml 文件
      viewXml: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initView()
    },
    async initView() {
      this.initInstance()
      this.viewXml = demoXml
      this.createNewView(this.viewXml)
    },
    // 初始化 bpmn 实例对象
    initInstance() {
      this.bpmnModeler = new BpmnModeler({
        container: '#bpmn',
        additionalModules: [
          // 自定义 模块
          customModule
        ]
      })
    },
    // 绘制 demo 图
    createNewView(xml) {
      this.bpmnModeler.importXML(xml, err => {
        if (err) return console.warn(err)
        console.log('绘制 demo 图成功!')
        // 让图能自适应屏幕
        this.bpmnModeler.get('canvas').zoom('fit-viewport')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-context-pad {
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
  }
}
:deep(.bjs-container .bjs-powered-by) {
  display: none;
}
</style>
