<script>
import FormSubmitCancelButton from '../composables/FormSubmitCancelButton.vue';

export default {
  name: "EditUserDetail",
  props: {
    editData: Object
  },
  components: {
    FormSubmitCancelButton
  },
  emits: ["editUser", "goBack"],
  data() {
    return {
      username: this.editData ? this.editData.username : '',
      email: this.editData ? this.editData.email : '',
      phoneNumber: this.editData ? this.editData.phoneNumber : '',
      address: this.editData ? this.editData.address : '',
    }
  },
  methods: {
    submit() {
      this.$emit('editUser', this.editData.id, this.username, this.email, this.phoneNumber, this.address);
    },
    goBack() {
      this.$emit('goBack', 'Dashboard');
    }
  },
}
</script>

<template>
  <section>
    <h2 class="dashboard-headline">Edit user data</h2>
    <form class="ui form" @submit.prevent="submit">
      <div class="field">
        <label>Username <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="username" placeholder="Enter username" autocomplete="off" required>
          <i class="user circle icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Email <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="email" v-model="email" placeholder="Enter email" autocomplete="off" required>
          <i class="envelope icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Phone Number</label>
        <div class="ui left icon fluid input">
          <input type="tel" v-model="phoneNumber" placeholder="Enter phone number" autocomplete="off" required>
          <i class="phone icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Address</label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="address" placeholder="Enter address" autocomplete="off" required>
          <i class="address card icon"></i>
        </div>
      </div>      
      
      <FormSubmitCancelButton 
        @cancel-button="goBack"
      />

    </form>
  </section>
</template>