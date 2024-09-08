<script>
export default {
  name: 'Modal',
  props: {
    html: String
  },
  methods: {
    closeModal() {
      document.querySelector('.modal').style.display = "none";
    }
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="content" v-html="html"></div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  margin: 5% auto;
  padding: 20px;
}

.content {
  /* background-color: #fefefe; */
  /* max-width: min-content; */
  max-height: 90vh;
  margin: auto;
  display: flex;
  justify-content: center;
  /* position:absolute; */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>