<template>
  <div class="border w-60 flex flex-col items-center">
    <router-link :to="{name: 'Show', params: { id: contact.id }}">
      <p class="hover:underline">{{ contact.name }}</p>
    </router-link>
    <button @click="deleteContact" class="text-red-500 hover:bg-red-500 hover:text-white">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    contact: Object,
    classes: String
    },
  methods: {
    deleteContact: function() {
      this.$emit('delete', this.contact);
    }
  }
}
</script>