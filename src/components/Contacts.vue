<template>
  <div class="grid grid-cols-4 gap-4">
    <div :key="contact.id" v-for="contact in contacts" >
      <ContactCard :contact="contact" @delete="removeContact" classes=""/>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
import ContactCard from './ContactCard.vue'

export default {
  name: 'Contacts',
  props: {contacts: Array},
  components: {
    ContactCard
  },
  methods: {
    removeContact(contact) {
      this.$emit('delete', contact);
    }
  },
}
</script>
