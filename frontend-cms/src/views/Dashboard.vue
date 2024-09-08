<script>
import DashboardStatistic from '../components/composables/DashboardStatistic.vue';

export default {
  name: "Dashboard",
  components: {
    DashboardStatistic
  },
  props: {
    lodgings: Object,
    types: Number,
    users: Number
  },
  emits: ["fetch"],
  computed: {
    activeLodgings() {
      return this?.lodgings["Active"] ? this.lodgings["Active"] : 0
    },
    inactiveLodgings() {
      return this?.lodgings["Inactive"] ? this.lodgings["Inactive"] : 0
    },
    archivedLodgings() {
      return this?.lodgings["Archived"] ? this.lodgings["Archived"] : 0
    },
    totalLodgings() {
      return this.activeLodgings + this.inactiveLodgings + this.archivedLodgings
    },

    mainDashboardStatistics() {
      return [
        {
          id: 1, 
          isMainItem: true, 
          googleIcon: 'hotel', 
          label: 'Total Lodgings', 
          quantity: this.totalLodgings
        },
        {
          id: 2, 
          isMainItem: true, 
          googleIcon: 'category', 
          label: 'Total Types', 
          quantity: this.types
        },
        {
          id: 3, 
          isMainItem: true, 
          googleIcon: 'groups', 
          label: 'Total Users', 
          quantity: this.users
        }
      ]
    },
    lodgingStatistics() {
      return [
        {
          id: 1, 
          googleIcon: 'check_circle', 
          label: 'Active Lodgings', 
          quantity: this.activeLodgings, 
          color: 'green'
        },
        {
          id: 2, 
          googleIcon: 'cancel', 
          label: 'Inactive Lodgings', 
          quantity: this.inactiveLodgings, 
          color: 'red'
        },
        {
          id: 3, 
          googleIcon: 'inventory_2', 
          label: 'Archived Lodgings', 
          quantity: this.archivedLodgings, 
          color: 'grey'
        }
      ]
    }
  },
  created() {
    // console.log("CREATING DASHBOARD FOR THE FIRST TIME");
    this.$emit("fetch");
    // console.log(this.lodgings, this.types, this.users);
  }
}
</script>

<template>

  <article>

    <h2 class="dashboard-headline">Management Dashboard</h2><br>

    <div>
      <h4 class="dashboard-headline">Your Dashboard Summary</h4>
      <div class="ui statistics">

        <DashboardStatistic 
          v-for="statistic in mainDashboardStatistics" 
          v-bind="statistic" 
          :key="statistic.id"
        />

      </div>
    </div>

    <div>
      <h4 class="dashboard-headline">Lodging Status</h4>
      <div class="ui statistics">

        <DashboardStatistic 
          v-for="statistic in lodgingStatistics" 
          v-bind="statistic" 
          :key="statistic.id"
        />

      </div>
    </div>
  </article>
</template>

<style>
.ui.statistics {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.main-dashboard-item {
  background-color: var(--txt-color);
  color: var(--fg-color-1);
  padding: 10px;
  border-radius: 50px;
}
div.value > * {
  vertical-align: middle;
}
div.value > i.material-icons-outlined ~ span {
  margin-left: 10px;
}
div.value ~ div.label {
  padding-top: 5px;
}
</style>