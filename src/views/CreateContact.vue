<template>
  <div class="mb-8">
    <form @submit.prevent="onSubmit" class="flex flex-col space-y-8 items-center">
      
      <label for="name">Name</label>
      <div>
        <input type="text" name="name" placeholder="Name" v-model="person.name" class="border"/>
      </div>

      <label for="email">Email</label>
      <div v-for="(email,idx) in emails" v-bind:key="idx">
        <input type="text" name="email" placeholder="Email" v-model="email.email" class="border"/>
        <button type="button" @click="removeEmail(idx)" v-if="emails.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>
        <button type="button" @click="addEmail(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
      </div>

      <label for="phone_number">Phone Number</label>
      <div v-for="(phone_number,idx) in phone_numbers" v-bind:key="idx">
        <input type="text" name="phone_number" placeholder="Phone Number" v-model="phone_number.phone_number" class="border"/>
        <button type="button" @click="removePhoneNumber(idx)" v-if="phone_numbers.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>
        <button type="button" @click="addPhoneNumber(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
      </div>

      <label for="address">Address (Address are not added until verified)</label>
      <div v-for="(address,idx) in addresses" v-bind:key="idx" class="flex">
        <p v-if="address?.verified == true">✅</p>
        <input type="text" name="street" placeholder="Street" v-model="address.street" class="border"/>
        <input type="text" name="apt" placeholder="apt/suite" v-model="address.apt_number" class="border"/>
        <input type="text" name="city" placeholder="City" v-model="address.city" class="border"/>
        <select name="" id="" v-model="address.state_abbr" class="border">
          <option value="" disabled>State</option>
          <option v-for="(state, idx) in states" v-bind:key="idx" v-bind:value="state[1]">{{ state[0] }}</option>
        </select>

        <input type="text" name="zip" placeholder="Zip" v-model="address.zip_code" class="border"/>
        <button type="button" @click="verifyAddress(idx)" v-if="address?.verified != true" class="bg-gray-400 rounded mx-2 px-2">Verify</button>
        <button type="button" @click="removeAddress(idx)" v-if="addresses.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>
        <button type="button" @click="addAddress(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
      </div>

      <input type="submit" value="Save" :disabled="person.name.trim() == ''" class="w-1/4 disabled:bg-gray-200 bg-green-300 transition">
    </form>
  </div>
</template>

<script>
const axios = require('axios')
import STATES from '../states.js'
export default {
  data() {
    let states = STATES
    return {
      states,
      person: {
        name: '',
        emails: [],
        phone_numbers: [],
        addresses: []
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
      this.addresses.forEach(address => {
        if (address?.verified) {
          console.log('verified');
          this.person.addresses.push(address)
        }
      });
      axios.post('http://localhost:8000/create_record', this.person).then(response => {
        let id = response.data.id;
        this.$router.push(`/contact/${id}`);
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
    },
    verifyAddress(idx) {
      let address = this.addresses[idx];
      let params = {
        street: address.street,
        zip: address.zip_code
      }
      axios.get(`http://localhost:8000/verify_address`, {params}).then(res => {
        console.log(res.data);
        address.street = res.data.street;
        address.city = res.data.city;
        address.state_abbr = res.data.state_abbr;
        address.zip_code = res.data.zip_code;
        address.verified = true;
      }).catch(error => {
        console.log(error);
        alert('Sorry address not found');
      });
    }
  }
}
</script>

