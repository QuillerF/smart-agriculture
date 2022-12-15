<!--
 * @Descripttion: 地块显示
 * @Author: yuanxiongfeng
 * @Date: 2022-11-27 02:36:29
 * @LastEditors: yuanxiongfeng
 * @LastEditTime: 2022-12-15 01:29:43
-->
<template>
  <div class="img">
    <el-image :src="imgUrl">
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
  </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue'
defineProps(['imgUrl'])
</script>

<style scoped lang="less">
.img {
  width: 100%;
  height: 100%;
  background: rgba(6, 14, 44, 0.4) !important;
  border: solid 1px rgba(26, 118, 131, 0.4);
  box-sizing: border-box;
  padding: 10px 20px;
  cursor: pointer;
}
.el-image {
  width: 100%;
  height: 100%;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #f0f0f0;
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
