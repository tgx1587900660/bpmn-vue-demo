<template>
  <div class="custom-renderer">
    <div class="tool-bar">
      <p>
        自定义左侧工具栏图标
        <strong>绘制的图形改造</strong>
        （不再复用原图形，这里把前面的也改掉了，因为是通过直接修改原图形实现的）
      </p>
    </div>
    <div class="containers">
      <div class="view-box" id="bpmn"></div>
    </div>
  </div>
</template>

<script>
import CustomModeler from './customModeler'
// import BpmnModeler from 'bpmn-js/lib/Modeler'
// import customModule from './custom'
import { demoXml } from '@/mock/xmlStr.js'
// 左边工具栏和节点相关
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'

export default {
  name: 'custom-renderer',
  data() {
    return {
      // bpmn 实例对象
      bpmnModeler: null,
      // 要被绘制的初始 xml 文件
      viewXml: ''
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
      this.initInstance()
      this.viewXml = demoXml
      this.createNewView(this.viewXml)
    },
    // 初始化 bpmn 实例对象
    initInstance() {
      this.bpmnModeler = new CustomModeler({
        container: '#bpmn',
        // additionalModules: [
        //   // 左边工具栏以及节点
        //   propertiesProviderModule,
        //   // 自定义的节点
        //   customModule
        // ]
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
.custom-renderer {
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
