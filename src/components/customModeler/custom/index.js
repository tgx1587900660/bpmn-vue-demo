import CustomPalette from './CustomPalette'
import CustomRender from './CustomRender'
import CustomContextPadProvider from './CustomContextPadProvider'

export default {
  __init__: ['paletteProvider', 'customRender', 'CustomContextPadProvider'],
  paletteProvider: ['type', CustomPalette],
  customRender: ['type', CustomRender],
  CustomContextPadProvider: ['type', CustomContextPadProvider]
}
