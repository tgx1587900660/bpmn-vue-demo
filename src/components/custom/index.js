/**
 * 这里面是基于原有的功能，进行改造的内容
 */

import CustomPalette from './CustomPalette'
import CustomRenderer from './CustomRenderer'
import CustomContextPad from './CustomContextPad'

export default {
  __init__: ['customPalette', 'customRenderer', 'customContextPad'], // 该 属性值 对应下面的 属性名
  // __init__: ['customContextPad'], // 该 属性值 对应下面的 属性名
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer],
  customContextPad: ['type', CustomContextPad]
}
