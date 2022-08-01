export default class CustomPalette {
  bpmnFactory
  create
  elementFactory
  palette
  translate

  // 1. 要注入的属性(固定写法)。引入该类，并放入 additionalModules 后，就可以在该类内部使用这些 bpmn.js原有属性
  $inject = ['bpmnFactory', 'create', 'elementFactory', 'palette', 'translate']

  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory
    this.create = create
    this.elementFactory = elementFactory
    this.palette = palette
    this.translate = translate

    // 2. 传入该类的 this (固定写法)
    this.palette.registerProvider(this)
  }

  // 3. 绘制函数(固定写法)
  getPaletteEntries() {
    const { bpmnFactory, create, elementFactory, translate } = this

    function createTask() {
      return function (event) {
        const businessObject = bpmnFactory.create('bpmn:Task') // 其实这个也可以不要
        const shape = elementFactory.createShape({
          type: 'bpmn:Task',
          businessObject
        })
        console.log(shape) // 只在拖动或者点击时触发
        create.start(event, shape)
      }
    }

    return {
      'create.my-firtst-task': {
        group: 'model', // 分组名, 比如tools、event、gateway、activity等等, 用于分类
        // className: 'bpmn-icon-task red', // 样式类名, 可以通过它给元素修改样式
        className: 'icon-custom my-firtst-task', // 样式类名, 可以通过它给元素修改样式
        title: translate('创建一个类型为my-firtst-task的任务节点'), // 鼠标移动到元素上面给出的提示信息
        // 操作
        action: {
          dragstart: createTask(), // 开始拖拽时调用的事件
          click: createTask() // 点击时调用的事件
        }
      }
    }
  }
}
