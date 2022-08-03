import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer'
import { append as svgAppend, create as svgCreate } from 'tiny-svg'
import { customElements, customConfig, hasLabelElements } from '../../utils'

export default class CustomRenderer extends BaseRenderer {
  $inject = ['eventBus', 'styles', 'bpmnRenderer']
  constructor(eventBus, bpmnRenderer, styles) {
    super(eventBus, 2000)
    this.bpmnRenderer = bpmnRenderer
    const computeStyle = styles.computeStyle
    console.dir(computeStyle)
  }

  drawCustomElements(parentNode, element) {
    const type = element.type // 获取到类型

    // 如果不是自定义类型，则返回默认绘图结果
    if (!customElements.includes(type)) {
      const shape = this.bpmnRenderer.drawShape(parentNode, element)
      return shape
    }

    // 自定义类型，则返回自定义绘图结果
    const { url, attr } = customConfig[type]
    const customIcon = svgCreate('image', {
      ...attr,
      href: url
    })

    element['width'] = attr.width
    element['height'] = attr.height

    svgAppend(parentNode, customIcon)

    // 判断是否有name属性来决定是否要渲染出label
    if (!hasLabelElements.includes(type) && element.businessObject.name) {
      const text = svgCreate('text', {
        x: attr.x,
        y: attr.y + attr.height + 20, // y取的是父元素的y+height+20
        'font-size': '14',
        fill: '#000'
      })
      text.innerHTML = element.businessObject.name
      svgAppend(parentNode, text)
      console.log(text)
    }

    return customIcon
  }
}

CustomRenderer.prototype.canRender = function (element) {
  // ignore labels
  return !element.labelTarget
}

CustomRenderer.prototype.drawShape = function (p, element) {
  return this.drawCustomElements(p, element)
}

CustomRenderer.prototype.getShapePath = function (shape) {
  console.log(shape)
}
