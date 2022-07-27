<template>
  <div class="demo1">
    <div class="containers">
      <div class="view-box" id="container" ref="canvasRef"></div>
    </div>
  </div>
</template>

<script>
import BpmnViewer from 'bpmn-js'
import { xmlStr } from '../src/mock/xmlStr'
export default {
  name: '',
  props: {},
  data() {
    return {
      // bpmn 实例对象
      bpmnModeler: null
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
      this.bpmnModeler = new BpmnViewer({
        container: '#container'
      })
      console.log(this.bpmnModeler)
      this.createNewDiagram()
    },
    createNewDiagram() {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(xmlStr, err => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success()
        }
      })
    },
    success() {
      console.log('创建成功!')
    }
  }
}
</script>

<style lang="scss" scoped>
.demo1 {
  padding: 20px;
  height: calc(100% - 100px);
  .containers {
    border: 1px solid #c0c0c0;
    height: 100%;
    .view-box {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
