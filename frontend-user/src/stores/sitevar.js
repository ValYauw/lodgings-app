import { defineStore } from 'pinia';
import router from '../router';
import axios from 'axios';

const SERVER_URL = `${import.meta.env.VITE_API_URL}/pub`;

export const useSiteVarStore = defineStore('sitevar', {
  state: () => ({

    isLoggedIn: false,
    username: null,

    lodgings: {
      query: {},
      data: [],
      total: null,
      fetched: 0
    },

    recentlyAdded: [],

    types: [],

    bookmarks: {
      data: [],
      total: null,
      fetched: 0
    },

  }),
  getters: { },
  actions: {

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

    async login(email, password) {
      try {
        const { data } = await axios.post(
          `${SERVER_URL}/login`, 
          { email, password }
        )
        const { username, access_token } = data;
        localStorage.setItem('access_token', access_token);
        this.isLoggedIn = true;
        this.username = username;
        router.push('/');
        this.fireSuccessMessage(`Welcome, ${this.username}`);
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async glogin(response) {
      try {
        const { data }= await axios.post(
          `${SERVER_URL}/glogin`, null, 
          {
            headers: {
              google_token: response.credential
            }
          }
        );
        const { username, access_token } = data;
        localStorage.setItem('access_token', access_token);
        this.isLoggedIn = true;
        this.username = username;
        router.push('/');
        this.fireSuccessMessage(`Welcome, ${this.username}`);
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async register(username, email, password, phone, address) {
      try {
        await axios.post(`${SERVER_URL}/register`, {
          username, email, password, phone, address
        });
        await this.login(email, password);
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    logout() {
      localStorage.removeItem('access_token');
      this.isLoggedIn = false;
      this.username = null;
      this.bookmarks = [];
      this.bookmarksFetchedCount = 0;
      this.bookmarksTotalCount = 0;
      router.push('/');
      this.fireSuccessMessage('You\'ve logged out');
    },

    async fetchTypes() {
      try {
        let url = `${SERVER_URL}/types`;
        const { data } = await axios.get(url);
        this.types = data.data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async fetchLodgings(search, maxPrice, minRoomCapacity, roomType, status) {
      try {
        this.lodgings.query = {search, minRoomCapacity, roomType, maxPrice, status};
        let url = `${SERVER_URL}/lodgings?limit=6`;
        let query = Object.entries(this.lodgings.query).reduce((str, [k, v]) => {
          if (v) str += `&${k}=${v}`
          return str
        }, '');
        url += query;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        this.lodgings.fetched = data.data.length;
        this.lodgings.total = data.count;
        this.lodgings.data = data.data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async fetchLodgingsNext() {
      try {
        let url = `${SERVER_URL}/lodgings?limit=6`;
        let query = Object.entries(this.lodgings.query).reduce((str, [k, v]) => {
          if (v) str += `&${k}=${v}`
          return str
        }, '');
        if (this.lodgings.total && this.lodgings.fetched < this.lodgings.total) {
          query += `&offset=${this.lodgings.fetched}`
        }
        url += query;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        this.lodgings.fetched += data.data.length;
        this.lodgings.total = data.count;
        this.lodgings.data.push(...data.data);
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async fetchRecentlyAdded() {
      try {
        let url = `${SERVER_URL}/lodgings?limit=5`;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        this.recentlyAdded = data.data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async getLodgingById(id) {
      try {
        let url = `${SERVER_URL}/lodgings/${id}`;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        return data.data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async fetchBookmarks() {
      try {
        let url = `${SERVER_URL}/bookmarks`;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        this.bookmarks.fetched = data.data.length;
        this.bookmarks.total = data.count;
        this.bookmarks.data = data.data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },
    async fetchBookmarksNext() {
      try {
        let url = `${SERVER_URL}/bookmarks`;
        let query = "";
        if (this.bookmarks.total && this.bookmarks.fetched < this.bookmarks.total) {
          query += `?offset=${this.bookmarks.fetched}`
        }
        if (query) url += query;
        const { data } = await axios.get(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        this.bookmarks.fetched += data.data.length;
        this.bookmarks.total = data.count;
        this.bookmarks.data.push(...data.data);
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },
    async addBookmark(lodgingId) {
      try {
        let url = `${SERVER_URL}/lodgings/${lodgingId}/bookmark`;
        const { data } = await axios.post(url, {}, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        if (this.lodgings.total) {
          const lodging = this.lodgings.data.find(lodging => lodging.id === lodgingId);
          if (lodging) lodging.isBookmarked = true;
        }
        this.fireSuccessMessage('Successfully added bookmark');
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },
    async removeBookmark(lodgingId) {
      try {
        let url = `${SERVER_URL}/lodgings/${lodgingId}/bookmark`;
        const { data } = await axios.delete(url, {
          headers: {access_token: localStorage.getItem('access_token')}
        });
        if (this.lodgings.total) {
          const lodging = this.lodgings.data.find(lodging => lodging.id === lodgingId);
          if (lodging) lodging.isBookmarked = false;
        }
        this.fireSuccessMessage('Successfully removed bookmark');
      } catch(err) {
        this.fireErrorMessage(err);
      }
    },

    async generateQrCode(url, name) {
      try {
        const { data } = await axios.post(`${SERVER_URL}/qr`, {
          url, name
        });
        return data;
      } catch(err) {
        this.fireErrorMessage(err);
      }
    }

  }

});
