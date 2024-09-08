<script>
import EditEntityButton from './EditEntityButton.vue';
import DeleteEntityButton from './DeleteEntityButton.vue';

export default {
  name: "TableRowType",
  props: {
    index: Number,
    id: Number,
    name: String,
    role: String
  },
  emits: ['handleEdit', 'handleDelete'],
  components: {
    EditEntityButton,
    DeleteEntityButton
  },
  computed: {
    showEditDeleteButtons() {
      return this.role === 'Admin'
    }
  }
}
</script>

<template>
  <tr>
    <td>#{{ index+1 }}</td>
    <td>{{ name }}</td>
    <td>
      <EditEntityButton 
        v-if="showEditDeleteButtons" 
        :entity="'Type'"
        @click="this.$emit('handleEdit', {id, name})"
      />
      <DeleteEntityButton 
        v-if="showEditDeleteButtons" 
        :entity="'Type'"
        @click="this.$emit('handleDelete', id)"
      />
    </td>
  </tr>
</template>