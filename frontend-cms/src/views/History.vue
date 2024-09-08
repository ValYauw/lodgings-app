<script>
import TableRowHistory from '../components/composables/TableRowHistory.vue';

export default {
  name: "History",
  components: {
    TableRowHistory
  },
  props: {
    histories: Array
  },
  emits: ['fetch'],
  created() {
    this.$emit("fetch");
  }
}
</script>

<template>

  <article>
    <h2 class="dashboard-headline">Editing History</h2>
    <table class="ui selectable striped table">
      <thead>
        <tr>
          <th>No</th>
          <th>Edited</th>
          <th>Description</th>
          <th>Edited by</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>

        <TableRowHistory 
          v-for="(history, index) in histories"
          v-bind="{...history, index}"
          :key="index"
        />

      </tbody>
    </table>
  </article>
</template>