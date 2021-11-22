<template>
  <div>
    <h1>Contacts</h1>
    <div :key="contact.id" v-for="contact in contacts">
      <ContactCard :contact="contact" />
    </div>
  </div>
</template>

<script>
import ContactCard from './ContactCard.vue'

export default {
  name: 'Contacts',
  props: {contacts: Array},
  components: {
    ContactCard
  },

}
</script>
