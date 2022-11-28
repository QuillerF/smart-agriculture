<template>
  <div class="over">
    <section class="over-item">
      <img :src="planArea" alt="" />
      <div>
        <section class="over-item-title">计划总亩数</section>
        <!-- <dv-digital-flop :config="config1" /> -->
        <section class="over-item-num blue">
          <span>4000000000</span>
          <span class="unit">亩</span>
        </section>
      </div>
    </section>
    <section class="over-item">
      <img :src="currentArea" alt="" />
      <div>
        <section class="over-item-title">当前亩数</section>
        <section class="over-item-num yellow">
          <span>620000</span>
          <span class="unit">亩</span>
        </section>
      </div>
    </section>
    <section class="over-item">
      <img :src="greenArea" alt="" />
      <div>
        <section class="over-item-title">年环比增长</section>
        <section class="over-item-num green">
          <span>400</span>
          <span class="unit">%</span>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import currentArea from '@/assets/img/current-area.png'
import greenArea from '@/assets/img/green-area.png'
import planArea from '@/assets/img/plan-area.png'

const config1 = reactive({
  number: [4000000000],
  content: '{nt}亩'
})
</script>

<style lang="less" scoped>
.over {
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  grid-gap: 50px;
  align-items: center;
  letter-spacing: 0px;
  padding-top: 20px;
  padding-bottom: 27px;
  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: inline-block;
      margin-right: 10px;
    }
    &-title {
      font-size: 14px;
      line-height: 28px;
      color: #d5e4f9;
      opacity: 0.9;
    }
    &-num {
      font-size: 30px;
      line-height: 28px;
    }
  }
}
.unit {
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  color: #dcdcdc;
  opacity: 0.8;
  margin-left: 10px;
}

.blue {
  color: #48ece7;
}
.green {
  color: #47ff88;
}
.yellow {
  color: #ffd452;
}
</style>
