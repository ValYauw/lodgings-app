<script>
import FormSubmitCancelButton from '../composables/FormSubmitCancelButton.vue';

export default {
  name: "AddNewLodging",
  emits: ["fetch", "addLodging", "editLodging", "goBack"],
  props: { 
    editData: Object,
    types: Array
  },
  components: {
    FormSubmitCancelButton
  },
  data() {
    return {
      lodgingName: this.editData ? this.editData.name : '',
      lodgingType: this.editData ? this.editData.typeId : '',
      lodgingDesc: this.editData ? this.editData.facility : '',
      lodgingLocation: this.editData ? this.editData.location : '',
      lodgingCapacity: this.editData ? this.editData.roomCapacity : '',
      lodgingPrice: this.editData ? this.editData.price : '',
      lodgingImage: this.editData ? this.editData.imgUrl : ''
    }
  },
  computed: {
    mode() {
      return this.editData ? 'Edit' : 'Add'
    },
    headline() {
      return this.mode === 'Add' ? 'Add new lodging' : 'Edit lodging'
    }
  },
  methods: {
    submit() {
      if (this.mode === 'Add') {
        this.$emit('addLodging', 
          this.lodgingName, this.lodgingType, this.lodgingDesc, 
          this.lodgingLocation, this.lodgingCapacity, this.lodgingPrice, 
          this.lodgingImage
        );
      } else {
        const lodgingId = this.editData.id;
        this.$emit('editLodging', 
          lodgingId, 
          this.lodgingName, this.lodgingType, this.lodgingDesc, 
          this.lodgingLocation, this.lodgingCapacity, this.lodgingPrice, 
          this.lodgingImage
        );
      }
    },
    goBack() {
      this.lodgingName = "";
      this.lodgingType = "";
      this.lodgingDesc = ""; 
      this.lodgingLocation = "";
      this.lodgingCapacity = "";
      this.lodgingPrice = "";
      this.lodgingImage = "";
      this.$emit('goBack', 'Lodgings');
    }
  },
  created() {
    this.$emit('fetch');
  }
}
</script>

<template>

  <article>
    <h2 class="dashboard-headline">{{ headline }}</h2>
    <form class="ui form" @submit.prevent="submit">
      <div class="field">
        <label>Name <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="lodgingName" placeholder="Enter lodging name" autocomplete="off" required>
          <i class="bed icon"></i>
        </div>
      </div>
      <div class="field">
        <label>Type <span class="required-field-label">(*required)</span></label>
        <select class="ui dropdown" v-model="lodgingType" required>
          <option value="" selected disabled>
            -- Select Lodging Type --
          </option>
          <option v-for="ltype in types" :value="ltype.id">
            {{ ltype.name }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Description <span class="required-field-label">(*required)</span></label>
        <textarea v-model="lodgingDesc" row="5" required></textarea>
      </div>
      <div class="field">
        <label>Location <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="lodgingLocation" placeholder="Enter lodging name" autocomplete="off" required>
          <i class="map marker alternate icon"></i>
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>Room Capacity <span class="required-field-label">(*required)</span></label>
          <div class="ui left icon fluid input">
            <input type="number" min="0" v-model="lodgingCapacity" placeholder="Enter lodging capacity" autocomplete="off" required>
            <i class="icon">
              <span class="material-icons-outlined">
                groups
              </span>
            </i>
          </div>
        </div>
        <div class="field">
          <label>Rent <span class="required-field-label">(*required)</span></label>
          <div class="ui left icon fluid input">
            <input type="number" min="100000" v-model="lodgingPrice" placeholder="Enter rent" autocomplete="off" required>
            <i class="dollar sign icon"></i>
          </div>
        </div>
      </div>
      <div class="field">
        <label>Image URL <span class="required-field-label">(*required)</span></label>
        <div class="ui left icon fluid input">
          <input type="text" v-model="lodgingImage" placeholder="Enter image URL" autocomplete="off" required>
          <i class="image icon"></i>
        </div>
      </div>

      <FormSubmitCancelButton 
        @cancel-button="goBack"
      />
      
    </form>
  </article>
</template>