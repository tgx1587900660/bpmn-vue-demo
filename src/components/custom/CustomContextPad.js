export default class CustomContextPad {
  $inject = ['create', 'elementFactory', 'translate', 'config', 'contextPad', 'injector']

  constructor(create, elementFactory, translate, config, contextPad, injector) {
    this.create = create
    this.elementFactory = elementFactory
    this.translate = translate

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false)
    }

    contextPad.registerProvider(this) // 定义这是一个contextPad
  }

  // 核心方法
  getContextPadEntries(element) {
    console.log('element :>> ', element);
    const { autoPlace, create, elementFactory, translate } = this

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
      }
    }
  }
}
