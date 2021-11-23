<template>

  <div>
    <div>
      
    </div>
    
    <div class="flex flex-col">

      <div class="flex space-x-8">
        <div>
          <h1 class="text-2xl uppercase">{{ contact.name }}</h1>
          <router-link :to="{name: 'EditContact', params: { id: contact.id }}" v-if="contact.id" class="hover:text-blue-500 hover:underline">Edit</router-link>
        </div>

        <div>
          <p class="font-bold">Email(s)</p>
          <div v-for="email in contact.emails" v-bind:key="email.id">
            <p>{{ email.email }}</p>
          </div>

          <hr>

          <p class="font-bold">Phone Number(s)</p>
          <div v-for="phone_number in contact.phone_numbers" v-bind:key="phone_number.id">
            <p>{{ phone_number.phone_number }}</p>
          </div>
        </div>
      </div>

      <p class="font-bold">Address(es)</p>
      <div v-for="address in contact.addresses" v-bind:key="address.id" class="flex">
        <p>{{ address.street }} {{ address.apt_number }} {{ address.city }}, {{ address.state_abbr }} {{ address.zip_code }}</p>
        <hr>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {},
  },
}

</script>