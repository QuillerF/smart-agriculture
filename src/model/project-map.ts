import useHttpStore from '@/store/http'
import waterImg from '@/assets/img/marker-water.png'
import watchImg from '@/assets/img/marker-watch.png'
import fourImg from '@/assets/img/marker-four.png'

export const MachineEnum = {
  water: waterImg,
  watch: watchImg,
  four: fourImg
}

const { api } = useHttpStore()
export const ApiEnum = {
  water: api.webFertilization,
  watch: api.webCamera,
  four: api.webCollector,
  center: ''
}
