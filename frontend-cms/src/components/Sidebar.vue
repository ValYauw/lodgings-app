<script>
export default {
  name: 'Sidebar',
  props: {
    username: String,
    role: String,
    currentPage: String
  },
  emits: ['navigate', 'handleEditUserDetail', 'logout'],
  methods: {
    handleEditUserDetail () {
      if (this.role === 'Admin') {
        this.$emit('handleEditUserDetail');
      }
    }
  }
}
</script>

<template>
  <aside>
    <div class="ui visible sidebar vertical menu" id="sidebar">

      <a class="item disabled" id="nav-head">
        <span><strong>Your Lodgings CMS</strong></span>
      </a>

      <a 
        class="item"
        :class="currentPage === 'Dashboard' ? 'active' : ''"
        @click="this.$emit('navigate', 'Dashboard')"
        title="Management Dashboard"
      >
        <i class="material-icons-outlined">analytics</i><span>Dashboard</span>
      </a>

      <a 
        class="item"
        :class="currentPage === 'Lodgings' ? 'active' : ''"
        @click="this.$emit('navigate', 'Lodgings')"
        title="List of lodgings"
      >
        <i class="material-icons-outlined">hotel</i><span>Lodgings</span>
      </a>

      <a 
        class="item"
        :class="currentPage === 'Types' ? 'active' : ''"
        @click="this.$emit('navigate', 'Types')"
        title="Lodging Types"
      >
        <i class="material-icons-outlined">category</i><span>Types</span>
      </a>

      <a class="item disabled"></a>

      <a 
        class="item"
        :class="currentPage === 'Users' ? 'active' : ''"
        @click="this.$emit('navigate', 'Users')"
        title="List of personnel"
      >
        <i class="material-icons-outlined">groups</i><span>Admin & Staff</span>
      </a>

      <a 
        class="item"
        :class="currentPage === 'History' ? 'active' : ''"
        @click="this.$emit('navigate', 'History')"
        title="Editing History"
      >
        <i class="material-icons-outlined">history</i><span>Editing History</span>
      </a>

      <a class="item disabled"></a>

      <a 
        class="item"
        :class="(currentPage === 'EditUserDetail' ? 'active' : '') + (role === 'Admin' ? '' : ' disabled')"
        @click="handleEditUserDetail"
        :title="role === 'Admin' ? 'Edit own user details' : null"
      >
        <i class="material-icons-outlined">person</i>
        <span>Welcome, {{ username }}</span>
      </a>

      <a 
        class="item"
        @click="this.$emit('logout')"
        title="Logout"
      >
        <i class="material-icons-outlined">logout</i><span>Logout</span>
      </a>

    </div>
  </aside>
</template>

<style>
#sidebar > a:first-child {
  font-weight: bold;
}
#sidebar {
  background-color: var(--txt-color);
}
#sidebar * {
  color: var(--fg-color-1) !important;
}
#sidebar > a.item {
  height: 40px;
  border-bottom: var(--fg-color-2) 1px solid;
}
#sidebar > a.active.item {
  background-color: var(--bg-color-2);
  color: var(--txt-color) !important;
}
#sidebar > a.active.item * {
  color: var(--txt-color) !important;
}
#sidebar > a.item:not(.disabled, .active):hover {
  opacity: 0.8;
}

@media only screen and (max-width: 767px) {

  #sidebar {
    width: 50px;
  }
  /* #sidebar > a.item {
    padding-top: 10px;
  } */
  #sidebar > a.item > span {
    display: none;
  }

}
</style>