<script>
export default {
  name: "Register",
  data() {
    return {
      registerUsername: "",
      registerEmail: "",
      registerPassword: "",
      registerPhone: "",
      registerAddress: "",
    };
  },
  emits: ['submit'],
  methods: {
    submit() {
      const registerPhone = this.registerPhone ? this.registerPhone : null;
      const registerAddress = this.registerAddress ? this.registerAddress : null; 
      this.$emit("submit", 
        this.registerUsername, this.registerEmail, this.registerPassword,
        registerPhone, registerAddress
      );
    }
  }
};
</script>

<template>
  
  <form class="ui form" @submit.prevent="submit" id="register-form">

    <div class="field">
      <label>Username <span class="required-field-label">(*required)</span></label>
      <div class="ui left icon fluid input">
        <input type="text" v-model="registerUsername" placeholder="Enter your username..." autocomplete="off" required>
        <i class="user icon"></i>
      </div>
    </div>

    <div class="field">
      <label>Email <span class="required-field-label">(*required)</span></label>
      <div class="ui left icon fluid input">
        <input type="email" v-model="registerEmail" placeholder="Enter your email address..." autocomplete="off" required>
        <i class="envelope icon"></i>
      </div>
    </div>

    <div class="field">
      <label>Password <span class="required-field-label">(*required)</span></label>
      <div class="ui left icon fluid input">
        <input type="password" v-model="registerPassword" placeholder="Enter your password..." autocomplete="off" required>
        <i class="key icon"></i>
      </div>
    </div>

    <div class="field">
      <label>Phone Number</label>
      <div class="ui left icon fluid input">
        <input type="tel" v-model="registerPhone" placeholder="Enter phone number (optional)..." autocomplete="off">
        <i class="phone icon"></i>
      </div>
    </div>

    <div class="field">
      <label>Address</label>
      <div class="ui left icon fluid input">
        <input type="text" v-model="registerAddress" placeholder="Enter your address (optional)..." autocomplete="off">
        <i class="address card icon"></i>
      </div>
    </div>

    <div class="right">
      <button class="ui blue submit button" type="submit">
        Register
      </button>
    </div>

  </form>

</template>

<style>
#register-form {
  padding-top: 40px;
}
</style>