<script>
import AddNewEntityButton from '../components/composables/AddNewEntityButton.vue';
import TableRowType from '../components/composables/TableRowType.vue';

export default {
  name: "Types",
  components: {
    AddNewEntityButton,
    TableRowType
  },
  props: {
    role: String,
    types: Array
  },
  emits: ['fetch', 'navigate', 'deleteType'],
  methods: {
    showFormAddType() {
      this.$emit('navigate', 'FormType');
    },
    showFormEditType(editData) {
      this.$emit('navigate', 'FormType', editData);
    },
    handleDelete(id) {
      this.$emit('deleteType', id);
    }
  },
  created() {
    this.$emit("fetch");
  }
}
</script>

<template>

  <article>

    <AddNewEntityButton 
      :entity="'type'" 
      @clickButton="showFormAddType"
    />
    <h2 class="dashboard-headline">All lodging types</h2>
    <table class="ui unstackable selectable striped table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th width="80px">Actions</th>
        </tr>
      </thead>
      <tbody>

        <TableRowType 
          v-for="(type, index) in types"
          v-bind="{...type, index, role}"
          :key="index"
          @handle-edit="showFormEditType"
          @handle-delete="handleDelete"
        />

      </tbody>
    </table>
  </article>
</template>

<style>
.button {
  cursor: pointer;
}
</style>