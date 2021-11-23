<template>
  <div>
    <Contact :contact="contact" />
  </div>
</template>

<script>
const axios = require('axios')
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
    axios.get(`https://pydressapi.zachgreen.codes/persons/${id}`).then(response => {
        this.contact = response.data;
      }).catch(error => {
        console.log(error);
      });
  }
}
</script>
