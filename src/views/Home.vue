<template>
  <div class="home">
    <Contacts :contacts="contacts"/>
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
    axios.get('http://localhost:8000/persons').then(res => {
      this.contacts = res.data;
    }).catch(err => {
      console.log(err);
    });
  },
}
</script>
