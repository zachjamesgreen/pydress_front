<template>
  <div>
    
  </div>
</template>

<script>
const axios = require('axios');
export default {
  props: {
    person: Object,
    emails: Array,
    phone_numbers: Array,
    addresses: Array
  },
  methods: {
    onSubmit() {
  //     this.person.emails = this.emails;
  //     this.person.phone_numbers = this.phone_numbers;
  //     this.person.address = this.addresses;
  //     axios.post('http://localhost:8000/create_record', this.person).then(response => {
  //       console.log(response);
  //       // got to contact page
  //     }).catch(error => {
  //       console.log(error);
  //     });
      
  //   },
  //   addEmail() {
  //     this.emails.push({email: ''});
  //   },
  //   removeEmail(idx) {
  //     this.emails.splice(idx, 1);
  //   },
  //   addPhoneNumber() {
  //     this.phone_numbers.push({phone_number: ''});
  //   },
  //   removePhoneNumber(idx) {
  //     this.phone_numbers.splice(idx, 1);
  //   },
  //   addAddress() {
  //     this.addresses.push({street: '', apt_number: '', city: '', state_abbr: '', zip_code: ''});
  //   },
  //   removeAddress(idx) {
  //     this.addresss.splice(idx, 1);
    }
  }
}
</script>