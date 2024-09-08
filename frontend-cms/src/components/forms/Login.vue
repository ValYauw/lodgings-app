<script>
export default {
  name: "Login",
  data() {
    return {
      loginEmail: "",
      loginPassword: "",
    };
  },
  methods: {
    submit() {
      this.$parent.$emit("submitLogin", this.loginEmail, this.loginPassword);
    },
    handleGoogleLogin(...args) {
      this.$parent.$emit("googleLogin", ...args);
    }
  },
};
</script>

<template>

  <h2 class="top aligned login-headline">Log-in if you're a registered user</h2>
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

    <div class="ui horizontal divider" style="margin-top: 40px;">
      Or sign-in with social media
    </div>

    <div id="glogin">
      <GoogleLogin :callback="handleGoogleLogin"/>
    </div>

  </form>

</template>

<style>
#glogin {
  display: flex;
  justify-content: center;
}
</style>