<script>
import { mapState, mapActions } from 'pinia';
import { useSiteVarStore } from '@/stores/sitevar';

export default {
  name: 'Search',
  emits: ['submit'],
  data() {
    return {
      search: '',
      maxPrice: '',
      minRoomCapacity: '',
      roomType: '',
      status: 'Active'
    }
  },
  computed: {
    ...mapState(useSiteVarStore, ['types'])
  },
  methods: {
    ...mapActions(useSiteVarStore, ['fetchTypes']),
    submit() {
      this.$emit('submit', 
        this.search, this.maxPrice,
        this.minRoomCapacity, this.roomType, 
        this.status
      );
    }
  },
  created() {
    if (this.types.length === 0) this.fetchTypes();
  }
}
</script>

<template>

  <form class="ui form" @submit.prevent="submit">

    <div class="field">
      <label>Search</label>
      <div class="ui left icon fluid input">
        <i class="search icon"></i>
        <input 
          class="prompt" 
          type="text" 
          placeholder="Search a lodging by name/facility/location..." 
          v-model="search"
        >
      </div>
    </div>

    <div class="two fields">

      <div class="field">
        <label>Maximum price:</label>
        <div class="ui left icon input">
          <i class="dollar icon"></i>
          <input type="number" placeholder="800.000" v-model="maxPrice">
        </div>
      </div>

      <div class="field">
        <label>Minimum room capacity:</label>
        <div class="ui left icon input">
          <i class="icon">
            <span class="material-icons-outlined">
              groups
            </span>
          </i>
          <input type="number" placeholder="3" v-model="minRoomCapacity">
        </div>
      </div>

    </div>

    <div class="two fields">

      <div class="field">
        <label>Room Type:</label>
        <select class="ui dropdown" v-model="roomType">
          <option :value="ltype.id" v-for="ltype in types">{{ ltype.name }}</option>
          <option value="" selected disabled hidden>-- SELECT --</option>
        </select>
      </div>
  
      <div class="field">
        <label>Status:</label>
        <select class="ui dropdown" v-model="status">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

    </div>

    <button type="submit" class="ui primary right button">
      Search Lodgings
    </button>

  </form>

</template>