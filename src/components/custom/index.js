/**
 * 这里面是基于原有的功能，进行的自定义改造学习
 */

import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'

export default {
  __init__: ['customPalette', 'customRenderer'], // 该 属性值 对应下面的 属性名
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer]
}