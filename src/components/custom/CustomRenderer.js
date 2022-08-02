// 引入默认的renderer (bpmn-js的依赖, 装了就有)
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'

// 引入绘图工具 (bpmn-js的依赖, 装了就有)
import { append as svgAppend, attr as svgAttr, create as svgCreate } from 'tiny-svg'

// 引入配置项
import { customElements, customConfig, HIGH_PRIORITY } from '../utils'

// 继承BaseRenderer
export default class CustomRenderer extends BaseRenderer {
  $inject = ['eventBus', 'bpmnRenderer']

  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY)
    this.bpmnRenderer = bpmnRenderer
  }

  // ignore labels
  canRender(element) {
    return !element.labelTarget
  }

  // 核心函数就是绘制shape
  drawShape(parentNode, element) {
    const type = element.type // 获取到类型
    if (customElements.includes(type)) {
      const { url, attr } = customConfig[type]

      const customIcon = svgCreate('image', {
        ...attr,
        href: url
      })
      console.log(element)

      element['width'] = attr.width
      element['height'] = attr.height

      svgAppend(parentNode, customIcon)
      return customIcon
    }
    const shape = this.bpmnRenderer.drawShape(parentNode, element)
    return shape
  }

  getShapePath(shape) {
    return this.bpmnRenderer.getShapePath(shape)
  }
}
