/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory, globalConnect) {
  this.palette = palette
  this.create = create
  this.elementFactory = elementFactory
  this.globalConnect = globalConnect

  this.$inject = ['palette', 'create', 'elementFactory', 'globalConnect']

  this.palette.registerProvider(this)
}

PaletteProvider.prototype.getPaletteEntries = function (element) {
  const { create, elementFactory } = this

  function createTask() {
    return function (event) {
      const shape = elementFactory.createShape({
        type: 'bpmn:Task'
      })
      console.log(shape) // 只在拖动或者点击时触发
      create.start(event, shape)
    }
  }
  return {
    'create.my-custom-task': {
      group: 'model',
      className: 'icon-custom my-custom-task',
      title: '创建一个类型为 my-custom-task 的任务节点',
      action: {
        dragstart: createTask(),
        click: createTask()
      }
    }
  }
}
