// 自定义元素的类型
const customElements = ['bpmn:Task']

// 自定义元素的配置
const customConfig = {
  'bpmn:Task': {
    url: 'https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/rules.png',
    attr: {
      x: 0,
      y: 0,
      width: 48,
      height: 48
    }
  }
}

// 设置最高优先级
const HIGH_PRIORITY = 1500

// 一开始就有label标签的元素类型
const hasLabelElements = ['bpmn:StartEvent', 'bpmn:EndEvent']

export { customElements, customConfig, HIGH_PRIORITY, hasLabelElements }
