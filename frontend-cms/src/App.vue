<script>
import LoginRegistration from './views/LoginRegistration.vue';
import Sidebar from './components/Sidebar.vue';
import Dashboard from './views/Dashboard.vue';
import Lodgings from './views/Lodgings.vue';
import Types from './views/Types.vue';
import Users from './views/Users.vue';
import FormLodging from './components/forms/FormLodging.vue';
import FormType from './components/forms/FormType.vue';
import EditUserDetail from './components/forms/EditUserDetail.vue';
import History from './views/History.vue';
import Preloader from './components/Preloader.vue';

import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/cms`;

export default {
  components: {
    LoginRegistration,
    Sidebar,
    Dashboard,
    Lodgings,
    Types,
    Users,
    FormLodging,
    FormType,
    EditUserDetail,
    History,
    Preloader
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.currentPage = "Dashboard";
      this.userId = +localStorage.getItem("userId");
      this.username = localStorage.getItem("username");
      this.role = localStorage.getItem("role");
    }
    this.isLoading = false;
  },
  data() {
    return {

      /* Credentials */
      userId: null,
      username: '',
      role: '',

      /* Navigation */
      currentPage: 'Login',

      /* Pre-loader is on */
      isLoading: true,

      /* Data */
      editData: null,
      dashboardSummary: {lodgings:{}},
      lodgings: [],
      types: [],
      users: [],
      histories: [],
      userData: null
    }
  },
  methods: {

    /* Messages */
    fireSuccessMessage(message) {
      this.$toast.open({
        message,
        duration: 5000
      });
    },
    fireErrorMessage(err) {
      const res = err?.response?.data;
      let message = res ? res.message : err.message;
      if (res && res.errors) {
        message += `<ul>${res.errors.map(el => `<li>${el}</li>`).join('')}</ul>`;
      }
      this.$toast.open({
        message,
        type: 'error',
        duration: 5000
      });
    },

    /* 
     * Credentials 
     */
    async handleRegister(username, email, password, phone, address) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: {username, email, password, phone, address},
        });
        await this.handleLogin(email, password);
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async handleLogin(email, password) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: {email, password},
        });
        this.setupOnLogin(data);
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async handleGoogleLogin(response) {
      try {
        this.isLoading = true;
        const { data }= await axios({
          url: `${baseUrl}/glogin`,
          method: "POST",
          headers: {
            google_token: response.credential
          }
        });
        this.setupOnLogin(data);
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    setupOnLogin(res) {
      const { access_token, id, username, role } = res;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("userId", id);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      this.userId = id;
      this.username = username;
      this.role = role;

      this.navigate("Dashboard");
      this.fireSuccessMessage(`Successfully logged in as ${role}.<br>Welcome, ${username}.`);
    },
    logout() {
      this.isLoading = true;
      localStorage.removeItem("access_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.userId = null;
      this.username = "";
      this.role = "";
      this.navigate("Login");
      this.fireSuccessMessage("You've successfully logged out.");
      this.isLoading = false;
    },

    /* 
     * Application Navigation 
     */
    navigate(page, editData) {
      // console.log("I'm in App", page);
      this.currentPage = page;
      this.editData = editData;
    },

    /* 
     * Fetch Data 
     */
    async getDashboardSummary() {
      try {
        this.isLoading = !this.dashboardSummary.types;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/dataSummary`
        });
        this.dashboardSummary = data.data;
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getLodgings() {
      try {
        this.isLoading = this.lodgings.length === 0;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/lodgings`
        });
        this.lodgings = data.data;
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getTypes() {
      try {
        this.isLoading = this.types.length === 0;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/types`
        });
        this.types = data.data;
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getUsers() {
      try {
        this.isLoading = this.users.length === 0;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/users`
        });
        this.users = data.data;
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getEditingHistory() {
      try {
        this.isLoading = this.histories.length === 0;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/history`
        });
        this.histories = data.data;
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async handleEditUserDetail() {
      try {
        console.log("Fetching");
        this.isLoading = !this.user;
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/users/${this.userId}`
        });
        this.editData = data.data;
        this.navigate("EditUserDetail", this.editData);
        console.log("Saved");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },

    /* 
     * Post Data
     */
    async addLodging(
      name, typeId, facility, 
      location, roomCapacity, price, 
      imgUrl
    ) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/lodgings`,
          data: {
            name, typeId, facility, 
            location, roomCapacity, price, 
            imgUrl
          },
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.navigate('Lodgings');
        this.fireSuccessMessage("Successfully added data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async editLodging(
      lodgingId, name, typeId, facility, 
      location, roomCapacity, price, 
      imgUrl
    ) {
      try {
        this.isLoading = true;
        this.editData = null;
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/lodgings/${lodgingId}`,
          data: {
            name, typeId, facility, 
            location, roomCapacity, price, 
            imgUrl
          },
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.navigate('Lodgings');
        this.fireSuccessMessage("Successfully edited data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async updateLodgingStatus(lodgingId, newStatus) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrl}/lodgings/${lodgingId}`,
          data: {
            status: newStatus
          },
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.getLodgings();
        this.fireSuccessMessage("Successfully updated status");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteLodging(lodgingId) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrl}/lodgings/${lodgingId}`,
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.getLodgings();
        this.fireSuccessMessage("Successfully deleted data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async addType(name) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/types`,
          data: {
            name
          },
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.navigate('Types');
        this.fireSuccessMessage("Successfully added data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async editType(typeId, name) {
      try {
        this.isLoading = true;
        this.editData = null;
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/types/${typeId}`,
          data: {
            name
          },
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.navigate('Types');
        this.fireSuccessMessage("Successfully edited data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteType(typeId) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrl}/types/${typeId}`,
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.getTypes();
        this.fireSuccessMessage("Successfully deleted data");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async editUser(userId, username, email, phoneNumber, address) {
      try {
        this.isLoading = true;
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/users/${userId}`,
          data: {username, email, phoneNumber, address},
          headers: {
            access_token: localStorage?.getItem("access_token")
          }
        });
        this.logout();
        this.fireSuccessMessage("Successfully edited user data; please log back in to re-authenticate");
      } catch (err) {
        this.fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<template>

  <LoginRegistration 
    v-if="currentPage === 'Login'" 
    @submit-register="handleRegister" 
    @submit-login="handleLogin"
    @google-login="handleGoogleLogin"
  />

  <section id="home-section" v-else>

    <Sidebar 
      v-bind="{username, currentPage, role}"
      @navigate="navigate"
      @handle-edit-user-detail="handleEditUserDetail"
      @logout="logout"
    />

    <Dashboard
      v-if="currentPage === 'Dashboard'"
      v-bind="dashboardSummary"
      @fetch="getDashboardSummary"
    />

    <Lodgings 
      v-if="currentPage === 'Lodgings'" 
      v-bind="{lodgings, userId, role}"
      @fetch="getLodgings"
      @update-lodging-status="updateLodgingStatus"
      @delete-lodging="deleteLodging"
      @navigate="navigate"
    />

    <FormLodging 
      v-if="currentPage === 'FormLodging'" 
      v-bind="{types, editData}"
      @fetch="getTypes"
      @add-lodging="addLodging"
      @edit-lodging="editLodging"
      @go-back="navigate"
    />

    <Types
      v-if="currentPage === 'Types'" 
      v-bind="{types, role}" 
      @fetch="getTypes"
      @delete-type="deleteType"
      @navigate="navigate"
    />

    <FormType 
      v-if="currentPage === 'FormType'" 
      v-bind="{editData}"
      @add-type="addType"
      @edit-type="editType"
      @go-back="navigate"
    />

    <History 
      v-if="currentPage === 'History'"
      v-bind="{histories}"
      @fetch="getEditingHistory"
    />

    <Users 
      v-if="currentPage === 'Users'"
      v-bind="{users}"
      @fetch="getUsers"
    />

    <EditUserDetail 
      v-if="currentPage === 'EditUserDetail'"
      v-bind="{editData}"
      @edit-user="editUser"
      @go-back="navigate"
    />

    <Preloader 
      v-if="isLoading"
    />
    
  </section>
  
</template>

<style>
/* Shared CSS for home-section elements */
#home-section {
  margin: 20px 20px 20px 250px;
  padding-bottom: 50px;
}
#home-section > section {
  margin-top: 20px;
  margin-bottom: 40px;
  /* border: 1px solid black; */
}
.dashboard-headline {
  border-bottom: 1px solid var(--txt-color);
}
.right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

@media only screen and (max-width: 767px) {

  /* Collapse sidebar for home section */
  /* .sidebar {
    display: none !important;
  } */
  #home-section {
    margin-left: 70px;
  }

}
</style>