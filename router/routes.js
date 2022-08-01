const demo1 = () => import('../view/demo1.vue')
const demo2 = () => import('../view/demo2.vue')
const customPalette = () => import('@/components/custom-palette.vue')

const routes = [
  { path: '/', redirect: '/demo1' },
  { path: '/demo1', component: demo1 },
  { path: '/demo2', component: demo2 },
  { path: '/custom-palette', component: customPalette }
]

export default routes
