<template>
  <div class="flex flex-col space-y-8 items-center mb-8">
    <h1 class="text-3xl">Edit Contact</h1>

    <label for="name">Name</label>
    <div>
      <input type="text" name="name" placeholder="Name" v-model="person.name" />
      <button @click="updateName()" class="bg-blue-300 rounded mx-2 px-2">Update</button>
    </div>

    <div>
      <label for="email">Email</label>
      <button type="button" @click="addEmail(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
    </div>
    <div>
      <div v-for="(email,idx) in emails" v-bind:key="idx">
        <input type="text" name="email" placeholder="Email" v-model="email.email"/>
        <button type="button" @click="removeEmail(email)" v-if="emails.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>

        <button @click="saveEmail(email)" v-if="email.id == null" class="disabled:bg-gray-200 bg-green-300 rounded mx-2 px-2">Save</button>
        <button @click="updateEmail(email)" v-if="email.id != null" class="bg-blue-300 rounded mx-2 px-2">Update</button>
      </div>
    </div>

    <div>
      <label for="phone_number">Phone Number</label>
      <button type="button" @click="addPhoneNumber(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
    </div>

    <div>
      <div v-for="(phone_number,idx) in phone_numbers" v-bind:key="idx">
        <input type="text" name="phone_number" placeholder="Phone Number" v-model="phone_number.phone_number"/>
        <button type="button" @click="removePhoneNumber(phone_number)" v-if="phone_numbers.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>

        <button @click="savePhoneNumber(phone_number)" v-if="phone_number.id == null" :disabled="phone_number.phone_number.trim() == ''" class="disabled:bg-gray-200 bg-green-300 rounded mx-2 px-2">Save</button>
        <button @click="updatePhoneNumber(phone_number)" v-if="phone_number.id != null" class="bg-blue-300 rounded mx-2 px-2">Update</button>
      </div>
    </div>

    <div>
      <label for="address">Address</label>
      <button type="button" @click="addAddress(idx)" class="bg-green-300 rounded mx-2 px-2">Add</button>
    </div>
    <div>
      <div v-for="(address,idx) in addresses" v-bind:key="idx">
        <input type="text" name="street" placeholder="Street" v-model="address.street"/>
        <input type="text" name="zip" placeholder="apt" v-model="address.apt_number"/>
        <input type="text" name="city" placeholder="City" v-model="address.city"/>
        <select name="" id="" v-model="address.state_abbr">
          <option v-for="(state, idx) in states" v-bind:key="idx" v-bind:value="state[1]">{{ state[0] }}</option>
        </select>
        <input type="text" name="zip" placeholder="Zip" v-model="address.zip_code"/>

        <button type="button" @click="removeAddress(address)" v-if="addresses.length > 1" class="bg-red-400 rounded mx-2 px-2">Remove</button>
        <button type="button" @click="verifyAddress(idx)" v-if="address?.verified != true" class="bg-gray-400 rounded mx-2 px-2">Verify</button>
        <button @click="saveAddress(address)" v-if="address.id == null" :disabled="address?.verified != true" class="disabled:bg-gray-200 bg-green-300 rounded mx-2 px-2">Save</button>
        <button @click="updateAddress(address)" v-if="address.id != null" :disabled="address?.verified != true" class="disabled:bg-gray-200 bg-blue-300 rounded mx-2 px-2">Update</button>
      </div>
    </div>

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
        phone_number: [],
        address: []
      },
      emails: [{email: ''}],
      phone_numbers: [{phone_number: ''}],
      addresses: [{street: '', apt_number: '', city: '', state_abbr: '', zip_code: ''}]
    }
  },
  mounted(){
    let id = this.$route.params.id
    axios.get(`http://localhost:8000/persons/${id}`, this.person).then(response => {
        this.person = response.data
        this.emails = this.person.emails
        this.phone_numbers = this.person.phone_numbers
        this.addresses = this.person.addresses
        // got to contact page
      }).catch(error => {
        console.log(error);
      });
  },
  methods: {
    addEmail() {
      this.emails.push({email: ''});
    },
    removeEmail(email) {
      let id = this.person.id
      if (email.id) {
        axios.delete(`http://localhost:8000/persons/${id}/email/${email.id}`,).then(response => {
          this.emails = response.data
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.emails.splice(this.emails.indexOf(email), 1);
      }
    },
    saveEmail(email) {
      let id = this.person.id
      axios.post(`http://localhost:8000/persons/${id}/email`, email).then(response => {
        this.emails = response.data
      }).catch(error => {
        console.log(error);
      });
    },
    updateEmail(email) {
      let id = this.person.id
      axios.patch(`http://localhost:8000/persons/${id}/email/`, email).then(response => {
        this.emails = response.data
      }).catch(error => {
        console.log(error);
      });
    },

    addPhoneNumber() {
      this.phone_numbers.push({phone_number: ''});
    },
    removePhoneNumber(phone_number) {
      let id = this.person.id
      if (phone_number.id) {
        axios.delete(`http://localhost:8000/persons/${id}/phone_number/${phone_number.id}`,).then(response => {
          this.phone_numbers = response.data
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.phone_numbers.splice(this.phone_numbers.indexOf(phone_number), 1);
      }
    },
    savePhoneNumber(phone_number) {
      let id = this.person.id
      axios.post(`http://localhost:8000/persons/${id}/phone_number`, phone_number).then(response => {
        this.phone_numbers = response.data
      }).catch(error => {
        console.log(error);
      });
    },
    updatePhoneNumber(phone_number) {
      let id = this.person.id
      axios.patch(`http://localhost:8000/persons/${id}/phone_number/`, phone_number).then(response => {
        this.phone_numbers = response.data
      }).catch(error => {
        console.log(error);
      });
    },

    addAddress() {
      this.addresses.push({street: '', apt_number: '', city: '', state_abbr: '', zip_code: ''});
    },
    removeAddress(address) {
      let id = this.person.id
      if (address.id) {
        axios.delete(`http://localhost:8000/persons/${id}/address/${address.id}`,).then(response => {
          this.addresses = response.data
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.addresses.splice(this.addresses.indexOf(address), 1);
      }
    },
    saveAddress(address) {
      let id = this.person.id
      axios.post(`http://localhost:8000/persons/${id}/address`, address).then(response => {
        this.addresses = response.data
      }).catch(error => {
        console.log(error);
      });
    },
    updateAddress(address) {
      let id = this.person.id
      axios.patch(`http://localhost:8000/persons/${id}/address/`, address).then(response => {
        this.addresses = response.data
      }).catch(error => {
        console.log(error);
      });
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
    },

    updateName() {
      let id = this.person.id
      axios.patch(`http://localhost:8000/persons/${id}`, this.person).then(response => {
        this.person.name = response.data.name
        // got to contact page
      }).catch(error => {
        console.log(error);
      });
    },

  }
}
</script>