<script>
import Register from '../components/forms/Register.vue';

import { mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'RegisterView',
  components: {
    Register
  },
  methods: {
    ...mapActions(useSiteVarStore, ['register', 'glogin'])
  }
}
</script>

<template>

  <section>

  <div id="login-container">

    <div id="form-block">

      <div>
        <Register @submit="register" />
      </div>

      <div class="ui horizontal divider">
        Or sign-in with social media
      </div>

      <div id="glogin">
        <GoogleLogin :callback="glogin"/>
      </div>

    </div>

    <div id="text-block">
      <h2>Register to enjoy the services of AeroBnB Lodgings</h2>
    </div>

  </div>

  </section>

</template>