<script>
export default {
  name: "DashboardStatistic",
  props: {
    isMainItem: Boolean,
    googleIcon: String,
    label: String, 
    quantity: Number,
    color: String
  }
}
</script>

<template>

  <div class="statistic">
    
    <div class="value">

      <i class="material-icons-outlined" 
        :class="isMainItem ? 'main-dashboard-item' : ''"
        :style="color ? `color: ${color};` : null"
      >
        {{ googleIcon }}
      </i>

      <span>{{ quantity }}</span>

    </div>

    <div class="label">
      {{ label }}
    </div>

  </div>

</template>