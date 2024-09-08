<script>
export default {
  name: "Login",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
    };
  },
  emits: ['submit'],
  methods: {
    submit() {
      console.log("Submitting");
      this.$emit("submit", this.loginEmail, this.loginPassword);
    }
  },
};
</script>

<template>

  <form class="ui form" @submit.prevent="submit" id="login-form">

    <div class="field">
      <label>Email</label>
      <div class="ui left icon fluid input">
        <input type="email" v-model="loginEmail" placeholder="Enter your email..." autocomplete="off" required>
        <i class="envelope icon"></i>
      </div>
    </div>

    <div class="field">
      <label>Password</label>
      <div class="ui left icon fluid input">
        <input type="password" v-model="loginPassword" placeholder="Enter your password..." autocomplete="off" required>
        <i class="key icon"></i>
      </div>
    </div>

    <div class="right">
      <button class="ui blue submit button" type="submit">
        Login
      </button>
    </div>

  </form>

</template>