import CustomPalette from './CustomPalette'
import CustomRender from './CustomRender'

export default {
  __init__: ['paletteProvider', 'customRender'],
  paletteProvider: ['type', CustomPalette],
  customRender: ['type', CustomRender]
}
