<script>
import Login from '../components/forms/Login.vue';

import { mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'LoginView',
  components: {
    Login
  },
  methods: {
    ...mapActions(useSiteVarStore, ['login', 'glogin']),
  }
}
</script>

<template>

  <section>

  <div id="login-container">

    <div id="text-block">
      <h2>Login to enjoy the services of AeroBnB Lodgings</h2>
    </div>

    <div id="form-block">

      <div>
        <Login @submit="login" />
      </div>

      <div class="ui horizontal divider">
        Or sign-in with social media
      </div>

      <div id="glogin">
        <GoogleLogin :callback="glogin"/>
      </div>

    </div>

  </div>

  </section>

</template>