<template>
  <div>
    <Contact :contact="contact" />
  </div>
</template>

<script>
const axios = require('axios');
import Contact from '../components/Contact.vue'
export default {
  components: {
    Contact
  },
  data() {
    return {
      contact: Object
    }
  },
  created() {
    let id = this.$route.params.id
    console.log(id);
    axios.get(`http://localhost:8000/persons/${id}`).then(response => {
        this.contact = response.data;
        console.log(this.contact);
      }).catch(error => {
        console.log(error);
      });
  }
}
</script>
