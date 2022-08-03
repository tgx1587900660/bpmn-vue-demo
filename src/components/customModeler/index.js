/**
 * 这里面是完全自定义的一个 CustomModeler 类 （通过继承原始类 Modeler 实现）
 */
import Modeler from 'bpmn-js/lib/Modeler'
import CustomModule from './custom'

class CustomModeler extends Modeler {
  // _customElements = [] // 自定义元素

  constructor(options) {
    super(options) // 调用父类 Modeler 的 constructor 构造函数
  }
}

CustomModeler.prototype._modules = CustomModeler.prototype._modules.concat([CustomModule]) // 使用 concat 是为了避免影响原数组

export default CustomModeler
