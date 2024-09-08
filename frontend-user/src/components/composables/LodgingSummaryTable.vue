<script>
import StatusButton from './StatusButton.vue';
import StatusIcon from './StatusIcon.vue';

export default {
  name: 'LodgingsSummaryTable',
  props: {
    price: Number,
    roomCapacity: Number, 
    location: String,
    status: String,
    User: Object
  },
  components: {
    StatusIcon,
    StatusButton
  },
  computed: {
    priceAsText() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumSignificantDigits: 3
      }).format(this.price);
    },
    
  }
}
</script>

<template>

<div class="lodging-detail-container">
  <table class="lodging-detail">
    <tr>
      <td><i class="user icon"></i></td>
      <td>Posted by</td>
      <td>
        {{ User.username }}
        <div class="contact">
          <div class="contact item">
            <a :href="'mailto:' + User.email"> <i class="envelope link icon"></i>Send an e-mail</a>
          </div>
          <div class="contact item">
            <a :href="'tel:' + User.phoneNumber"> <i class="phone link icon"></i>Give a call</a>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td><i class="dollar icon"></i></td>
      <td>Price</td>
      <td>{{ priceAsText }}</td>
    </tr>
    <tr>
      <td><span class="material-icons-outlined">groups</span></td>
      <td>Room Capacity</td>
      <td>{{ roomCapacity }}</td>
    </tr>
    <tr>
      <td><i class="map marker alternate icon"></i></td>
      <td>Location</td>
      <td>{{ location }}</td>
    </tr>
    <tr>
      <td>
        <StatusIcon v-bind="{status}" />
      </td>
      <td>Status</td>
      <td>
        <StatusButton v-bind="{status}" />
      </td>
    </tr>
  </table>
</div>

</template>

<style scoped>
.lodging-detail td {
  padding-left: 10px;
  padding-bottom: 5px;
}
.lodging-detail-container {
  width: 100%;
  background-color: var(--txt-color);
  border-radius: 20px;
  opacity: 0.7;
  padding: 10px 0px 8px 5px;
}
.lodging-detail-container td, .lodging-detail-container span, .lodging-detail-container i.icon {
  color: var(--fg-color-1) !important;
}
.contact.item {
  border: solid 1px var(--fg-color-1);
  display: inline;
  padding: 5px;
  border-radius: 5px;
}
.contact.item > a {
  color: var(--fg-color-1) !important;
  font-size: small;
  opacity: 0.8;
}
.contact.item > a:hover {
  opacity: 1;
}
.contact {
  margin-top: 5px;
}
</style>