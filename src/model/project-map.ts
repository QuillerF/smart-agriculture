import useHttpStore from '@/store/http'

export const MachineEnum = {
  water: '/src/assets/img/marker-machine.png',
  watch: '/src/assets/img/marker-watch.png',
  four: '/src/assets/img/marker-four.png',
  center: '/src/assets/img/marker-center.png'
}
const { api } = useHttpStore()
export const ApiEnum = {
  water: api.webFertilization,
  watch: api.webCamera,
  four: api.webCollector,
  center: ''
}
