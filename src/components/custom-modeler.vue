<template>
  <div class="custom-palette">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="tool-bar">
      <button ref="saveAsBpmnRef">保存为bpmn</button>
      <button ref="saveAsSvgRef">保存为svg</button>
    </div>
    <div class="containers">
      <div class="view-box" id="bpmn"></div>
    </div>
  </div>
</template>

<script>
import CustomModeler from './customModeler'
import { demoXml } from '@/mock/xmlStr.js'
// import customModule from './custom'

// 左边工具栏和节点相关
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'

export default {
  name: 'custom-palette',
  props: {},
  data() {
    return {
      // 是否加载中
      loading: false,
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
        additionalModules: [
          // 左边工具栏和节点 模块
          // propertiesProviderModule,
          // 自定义 模块
          // customModule
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
.custom-palette {
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
