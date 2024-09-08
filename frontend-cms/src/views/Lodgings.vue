<script>
import AddNewEntityButton from '../components/composables/AddNewEntityButton.vue';
import TableRowLodging from '../components/composables/TableRowLodging.vue';

export default {
  name: "Lodgings",
  components: {
    AddNewEntityButton,
    TableRowLodging
  },
  props: {
    userId: Number,
    role: String,
    lodgings: Array
  },
  emits: ['fetch', 'navigate', 'deleteLodging'],
  methods: {
    showFormAddLodging() {
      this.$emit('navigate', 'FormLodging');
    },
    showFormEditLodging(editData) {
      this.$emit('navigate', 'FormLodging', editData);
    },
    updateLodgingStatus(id, newStatus) {
      this.$emit('updateLodgingStatus', id, newStatus);
    },
    deleteLodging(id) {
      this.$emit('deleteLodging', id);
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
      :entity="'lodging'" 
      @clickButton="showFormAddLodging"
    />

    <h2 class="dashboard-headline">Your managed lodgings</h2>
    <table class="ui selectable striped table">
      <thead>
        <tr>
          <th>No</th>
          <th width="250px">Image</th>
          <th>Facility</th>
          <th>Price</th>
          <th>Author</th>
          <th width="40px">Status</th>
          <th width="80px">Actions</th>
        </tr>
      </thead>
      <tbody>

        <TableRowLodging 
          v-for="(lodging, index) in lodgings" 
          v-bind="{...lodging, index, userId, role}"
          :key="index"
          @handle-update-status="updateLodgingStatus"
          @handle-edit="showFormEditLodging"
          @handle-delete="deleteLodging"
        />

      </tbody>
    </table>
  </article>
</template>

<style>

  .description {
    white-space: pre-line;
  }

  .flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .flex > p {
    width: 40%;
    vertical-align: middle;
    margin: auto 0px;
  }
  .flex > p > .material-icons-outlined {
    font-size: smaller;
  }
  .flex-center {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin: auto;
    line-height: 200%;
  }

  tr.archived img {
    opacity: 0.5;
  }

  .button {
    cursor: pointer;
  }
  .status-active-toggle, .status-inactive-toggle, .status-archived-toggle {
    font-size: medium;
  }
  .status-active-toggle {
    color: green;
  }
  .status-inactive-toggle {
    color: red;
  }
  .status-archived-toggle {
    color: grey;
  }
  a.ui.label {
    cursor: default !important;
  }
</style>