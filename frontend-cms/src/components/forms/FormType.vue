<script>
import FormSubmitCancelButton from '../composables/FormSubmitCancelButton.vue';

export default {
  name: "AddNewLodging",
  emits: ["addType", "editType", "goBack"],
  props: { 
    editData: Object
  },
  components: {
    FormSubmitCancelButton
  },
  data() {
    return {
      typeName: this.editData ? this.editData.name : ''
    }
  },
  computed: {
    mode() {
      return this.editData ? 'Edit' : 'Add'
    },
    headline() {
      return this.mode === 'Add' ? 'Add new lodging type' : 'Edit lodging type'
    }
  },
  methods: {
    submit() {
      if (this.mode === 'Add') {
        this.$emit('addType', this.typeName);
      } else {
        const typeId = this.editData.id;
        this.$emit('editType', typeId, this.typeName);
      }
    },
    goBack() {
      this.typeName = "";
      this.$emit('goBack', 'Types');
    }
  }
}
</script>

<template>

  <article>
    <h2 class="dashboard-headline">{{ headline }}</h2>
    <form class="ui form" @submit.prevent="submit">

      <div class="field">
        <label>Name <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="typeName" placeholder="Enter name" autocomplete="off" required>
          <i class="font icon"></i>
        </div>
      </div>

      <FormSubmitCancelButton 
        @cancel-button="goBack"
      />

    </form>
  </article>
</template>