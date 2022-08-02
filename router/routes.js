const demo1 = () => import('../view/demo1.vue')
const demo2 = () => import('../view/demo2.vue')
const customPalette = () => import('@/components/custom-palette.vue')
const customModeler = () => import('@/components/custom-modeler.vue')
const customRenderer = () => import('@/components/custom-renderer.vue')

const routes = [
  { path: '/', redirect: '/demo1' },
  { path: '/demo1', component: demo1 },
  { path: '/demo2', component: demo2 },
  { path: '/custom-palette', component: customPalette },
  { path: '/custom-modeler', component: customModeler },
  { path: '/custom-renderer', component: customRenderer }
]

export default routes
