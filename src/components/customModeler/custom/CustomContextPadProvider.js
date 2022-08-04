export default class ContextPadProvider {
  $inject = ['contextPad', 'config', 'injector', 'translate', 'bpmnFactory', 'elementFactory', 'create', 'modeling', 'connect']

  constructor(contextPad, config, injector, translate, bpmnFactory, elementFactory, create, modeling, connect) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate
    this.bpmnFactory = bpmnFactory
    this.modeling = modeling
    this.connect = connect
    config = config || {}
    if (config.autoPlace !== false) {
      this._autoPlace = injector.get('autoPlace', false)
    }
    contextPad.registerProvider(this)
  }
}

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const { autoPlace, create, elementFactory, translate, modeling } = this
  function removeElement(e) {
    modeling.removeElements([element])
  }

  function appendTask(event, element) {
    if (autoPlace) {
      const shape = elementFactory.createShape({ type: 'bpmn:Task' })
      autoPlace.append(element, shape)
    } else {
      appendTaskStart(event, element)
    }
  }

  function appendTaskStart(event) {
    const shape = elementFactory.createShape({ type: 'bpmn:Task' })
    create.start(event, shape, element)
  }

  return {
    'append.my-first-task': {
      group: 'model',
      className: 'icon-custom my-first-task',
      title: translate('创建一个类型为my-first-task的任务节点'),
      action: {
        click: appendTask,
        dragstart: appendTaskStart
      }
    },
    delete: {
      group: 'edit',
      className: 'icon-custom icon-custom-delete',
      title: translate('删除'),
      action: {
        click: removeElement
      }
    }
  }
}
