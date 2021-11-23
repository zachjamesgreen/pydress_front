<template>
  <div class="home">
    <Contacts :contacts="contacts" @delete="removeContact"/>
  </div>
</template>

<script>
// @ is an alias to /src
const axios = require('axios');
import Contacts from '@/components/Contacts.vue'


export default {
  name: 'Home',
  components: {Contacts},
  data() {
    return {
      contacts: []
    }
  },
  mounted() {
    axios.get('https://pydressapi.zachgreen.codes/persons').then(res => {
      this.contacts = res.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }).catch(err => {
      console.log(err);
    });
  },
  methods: {
    removeContact(contact) {
      axios.delete(`https://pydressapi.zachgreen.codes/persons/${contact.id}`).then(response => {
        this.contacts.splice(this.contacts.indexOf(contact), 1);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
