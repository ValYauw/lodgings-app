<script>
export default {
  name: "TableRowType",
  props: {
    index: Number,
    id: Number,
    name: String,
    description: String,
    User: Object,
    createdAt: String
  },
  computed: {
    timestamp() {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric', 
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timezoneName: 'shortOffset'
      }).format(new Date(this.createdAt))
    }
  },
}
</script>

<template>
  <tr>
    <td>
      #{{ id }}
    </td>
    <td>
      <i class="collapsed th list icon"></i>
      {{ name }}
    </td>
    <td>
      <i class="collapsed check square outline icon"></i>
      {{ description }}
    </td>
    <td>
      <i class="collapsed user circle icon"></i>
      {{ User.username }}
    </td>
    <td>
      <i class="collapsed calendar outline icon"></i>
      {{ timestamp }}
    </td>
  </tr>
</template>