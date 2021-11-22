<template>
  <div>
    <h1>Edit Contact</h1>
    <form @submit.prevent="onSubmitName">
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="Name" v-model="person.name"/>
      <input type="submit" value="Save">
    </form>

    <div>
      <label for="email">Email</label>
      <button type="button" @click="addEmail(idx)">Add</button>
      <div v-for="(email,idx) in emails" v-bind:key="idx">
        <input type="text" name="email" placeholder="Email" v-model="email.email"/>
        <button type="button" @click="removeEmail(email)" v-if="emails.length > 1">Remove</button>

        <input type="submit" value="Save" @click="saveEmail(email)" v-if="email.id == null">
        <input type="submit" value="Update" @click="updateEmail(email)" v-if="email.id != null">
      </div>
    </div>

    <div>
      <label for="phone_number">Phone Number</label>
      <button type="button" @click="addPhoneNumber(idx)">Add</button>
      <div v-for="(phone_number,idx) in phone_numbers" v-bind:key="idx">
        <input type="text" name="phone_number" placeholder="Phone Number" v-model="phone_number.phone_number"/>
        <button type="button" @click="removePhoneNumber(phone_number)" v-if="phone_numbers.length > 1">Remove</button>

        <input type="submit" value="Save" @click="savePhoneNumber(phone_number)" v-if="phone_number.id == null">
        <input type="submit" value="Update" @click="updatePhoneNumber(phone_number)" v-if="phone_number.id != null">
      </div>
    </div>

    <div>
      <label for="address">Address</label>
      <button type="button" @click="addAddress(idx)">Add</button>
      <div v-for="(address,idx) in addresses" v-bind:key="idx">
        <input type="text" name="street" placeholder="Street" v-model="address.street"/>
        <input type="text" name="zip" placeholder="apt" v-model="address.apt_number"/>
        <input type="text" name="city" placeholder="City" v-model="address.city"/>
        <input type="text" name="state" placeholder="State" v-model="address.state_abbr"/>
        <input type="text" name="zip" placeholder="Zip" v-model="address.zip_code"/>
        <button type="button" @click="removeAddress(address)" v-if="addresses.length > 1">Remove</button>

        <input type="submit" value="Save" @click="saveAddress(address)" v-if="address.id == null">
        <input type="submit" value="Update" @click="updateAddress(address)" v-if="address.id != null">
      </div>
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
  mounted(){
    let id = this.$route.params.id
    axios.get(`http://localhost:8000/persons/${id}`, this.person).then(response => {
        console.log(response.data);
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
    onSubmitName() {
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