<template>
  <div>
    <router-link :to="{name: 'EditContact', params: { id: contact.id }}">Edit</router-link>
    <h1>{{ contact.name }}</h1>
    <div v-for="email in contact.emails" v-bind:key="email.id">
      <p>{{ email.email }}</p>
    </div>
    <div v-for="phone_number in contact.phone_numbers" v-bind:key="phone_number.id">
      <p>{{ phone_number.phone_number }}</p>
    </div>
    <div v-for="address in contact.addresses" v-bind:key="address.id">
      <p>{{ address.street }}</p>
      <p>{{ address.apt_number }}</p>
      <p>{{ address.city }}</p>
      <p>{{ address.state_abbr }}</p>
      <p>{{ address.zip_code }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {contact: {}},
  created() {
    console.log(this.contact);
  },
}

</script>