<template>
  <div>
    <form action="/create_person" method="post" @submit.prevent="onSubmit" ref="form">

      <div>
        <label for="name">Name</label>
        <input type="text" name="name" placeholder="Name" v-model="person.name"/>
      </div>

        <label for="email">Email</label>
      <div v-for="(email,idx) in emails" v-bind:key="idx">
        <input type="text" name="email" placeholder="Email" v-model="email.email"/>
        <button type="button" @click="removeEmail(idx)" v-if="emails.length > 1">Remove</button>
        <button type="button" @click="addEmail(idx)">Add</button>
      </div>

      <label for="phone_number">Phone Number</label>
      <div v-for="(phone_number,idx) in phone_numbers" v-bind:key="idx">
        <input type="text" name="phone_number" placeholder="Phone Number" v-model="phone_number.phone_number"/>
        <button type="button" @click="removePhoneNumber(idx)" v-if="phone_numbers.length > 1">Remove</button>
        <button type="button" @click="addPhoneNumber(idx)">Add</button>
      </div>

      <label for="address">Address</label>
      <div v-for="(address,idx) in addresses" v-bind:key="idx">
        <input type="text" name="street" placeholder="Street" v-model="address.street"/>
        <input type="text" name="zip" placeholder="apt" v-model="address.apt_number"/>
        <input type="text" name="city" placeholder="City" v-model="address.city"/>
        <input type="text" name="state" placeholder="State" v-model="address.state_abbr"/>
        <input type="text" name="zip" placeholder="Zip" v-model="address.zip_code"/>
        <button type="button" @click="removeAddress(idx)" v-if="addresses.length > 1">Remove</button>
        <button type="button" @click="addAddress(idx)">Add</button>
      </div>

      <input type="submit">
    </form>

    <div>
      <p>person: {{ person }}</p>
      <p>emails: {{ emails }}</p>
      <p>phone_numbers: {{ phone_numbers }}</p>
      <p>addresses: {{ addresses }}</p>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data() {
    return {
      person: {
        name: '',
        emails: [],
        phone_number: [],
        address: []
      },
      emails: [{email: ''}],
      phone_numbers: [{phone_number: ''}],
      addresses: [{street: '', apt_number: '', city: '', state_abbr: '', zip_code: ''}]
    }
  },
  methods: {
    onSubmit() {
      this.person.emails = this.emails;
      this.person.phone_numbers = this.phone_numbers;
      this.person.address = this.addresses;
      axios.post('http://localhost:8000/create_record', this.person).then(response => {
        let id = response.data.id;
        this.$router.push(`/contact/${id}`);
        console.log(response);
        // got to contact page
      }).catch(error => {
        console.log(error);
      });
      
    },
    addEmail() {
      this.emails.push({email: ''});
    },
    removeEmail(idx) {
      this.emails.splice(idx, 1);
    },
    addPhoneNumber() {
      this.phone_numbers.push({phone_number: ''});
    },
    removePhoneNumber(idx) {
      this.phone_numbers.splice(idx, 1);
    },
    addAddress() {
      this.addresses.push({street: '', apt_number: '', city: '', state_abbr: '', zip_code: ''});
    },
    removeAddress(idx) {
      this.addresses.splice(idx, 1);
    }
  }
}
</script>