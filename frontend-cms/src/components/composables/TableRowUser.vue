<script>
export default {
  name: "TableRowUser",
  props: {
    index: Number,
    id: Number,
    username: String,
    email: String,
    role: String,
    phoneNumber: String,
    address: String
  },
}
</script>

<template>
  <tr>
    <td>#{{ index+1 }}</td>
    <td>
      <i class="collapsed user circle icon"></i>
      {{ username }}
    </td>
    <td>
      <i class="collapsed envelope icon"></i>
      <a :href="'mailto:' + email">{{ email }}</a>
    </td>
    <td>
      <i class="collapsed id badge outline icon"></i>
      {{ role }}
    </td>
    <td>
      <i class="collapsed phone icon"></i>
      <a :href="'tel:' + phoneNumber">{{ phoneNumber }}</a>
    </td>
    <td>
      <i class="collapsed address card icon"></i>
      {{ address }}
    </td>
  </tr>
</template>