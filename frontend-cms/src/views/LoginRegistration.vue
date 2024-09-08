<script>
import Register from '../components/forms/Register.vue';
import Login from '../components/forms/Login.vue';

export default {
  name: "LoginRegistration",
  props: {  },
  components: {
    Register,
    Login
  },
  emits: ["submitRegister", "submitLogin", "googleLogin"]
};
</script>

<template>
  <section id="login-section">

    <img src="../assets/header.png" />

    <div class="ui segment" id="register-form">
      
      <div class="ui two column very relaxed stackable grid">
        
        <div class="column">
          <Register />
        </div>
        <div class="middle aligned column">
          <Login />
        </div>
      
      </div>
      
      <div class="ui vertical divider">
        Or
      </div>

    </div>
  </section>
</template>

<style>
#login-section {
  padding-bottom: 30px;
}
#login-section > div.ui.segment {
  margin: 20px 20px;
}
.login-headline {
  text-align: center;
}

img {
  width: 100%;
}

@media only screen and (max-width: 767px) {
  /* Collapse grid for login section */
  #login-section .ui.vertical.divider {
    display: none;
  }
}
</style>