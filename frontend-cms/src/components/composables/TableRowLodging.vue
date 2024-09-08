<script>
import EditEntityButton from './EditEntityButton.vue';
import DeleteEntityButton from './DeleteEntityButton.vue';
import UpdateStatusEntityButton from './UpdateStatusButtons.vue';

export default {
  name: "TableRowLodging",
  props: {
    index: Number,
    id: Number,
    name: String,
    imgUrl: String,
    facility: String,
    location: String,
    roomCapacity: Number,
    price: Number,
    status: String,
    User: Object,
    Type: Object,
    userId: Number,
    role: String
  },
  emits: ['handleEdit', 'handleDelete', 'handleUpdateStatus'],
  components: {
    EditEntityButton,
    DeleteEntityButton,
    UpdateStatusEntityButton
  },
  computed: {
    showDeleteButtons() {
      return this.role === 'Admin' || (this.role === 'Staff' && this.User.id === this.userId)
    },
    showEditButtons() {
      return this.role === 'Admin'
    },
    priceInRupiah() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
      }).format(this.price)
    },
    statusCssTableRow() {
      if (this.status === 'Inactive') return 'inactive';
      if (this.status === 'Archived') return 'archived';
      return null;
    },
    statusCssStatus() {
      if (this.status === 'Inactive') return 'red';
      if (this.status === 'Archived') return 'black';
      return 'green';
    }
  }
}
</script>

<template>
  <tr :class="statusCssTableRow">
    <td>#{{ index+1 }}</td>
    <td>
      <img :src="imgUrl" />
    </td>
    <td>
      <h2>{{ name }}</h2>
      <span><i>{{ location }}</i></span>
      <div class="description">{{ facility }}</div>
      <div class="flex">
        <p>
          <span class="material-icons-outlined">groups</span>
          Capacity: {{ roomCapacity }}
        </p>
        <p>
          <span class="material-icons-outlined">category</span>
          Type: {{ Type.name }}
        </p>
      </div>
    </td>
    <td>
      <i class="collapsed dollar icon"></i>
      {{ priceInRupiah }}
    </td>
    <td>
      <i class="collapsed user circle icon"></i>
      {{ User.username }}
    </td>
    <td>
      <div class="flex-center">
        <a class="ui label" :class="statusCssStatus">{{ status }}</a>
        <UpdateStatusEntityButton 
          v-if="showEditButtons" 
          :status="status" 
          @make-active="this.$emit('handleUpdateStatus', id, 'Active')"
          @make-inactive="this.$emit('handleUpdateStatus', id, 'Inactive')"
          @make-archived="this.$emit('handleUpdateStatus', id, 'Archived')"
        />
      </div>
    </td>
    <td>
      <EditEntityButton 
        v-if="showEditButtons" 
        :entity="'Lodging'"
        @click="this.$emit('handleEdit', {
          id, name, imgUrl, facility, location,
          roomCapacity, price, status,
          authorId: User.id,
          typeId: Type.id
        })"
      />
      <DeleteEntityButton 
        v-if="showDeleteButtons" 
        :entity="'Lodging'"
        @click="this.$emit('handleDelete', id)"
      />
    </td>
  </tr>
</template>