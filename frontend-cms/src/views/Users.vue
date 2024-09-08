<script>
import TableRowUser from '../components/composables/TableRowUser.vue';

export default {
  name: "Users",
  components: {
    TableRowUser
  },
  props: {
    users: Array
  },
  emits: ['fetch'],
  created() {
    this.$emit("fetch");
  }
}
</script>

<template>

  <article>

    <h2 class="dashboard-headline">Admin & Staff</h2>
      <table class="ui selectable striped table">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <TableRowUser 
            v-for="(user, index) in users" 
            v-bind="{...user, index}"
          />
        </tbody>
      </table>

  </article>

</template>