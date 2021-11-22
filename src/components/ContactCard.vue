<template>
  <div>
    <h1>
      <router-link :to="{name: 'Show', params: { id: contact.id }}">{{ contact.name }}</router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {contact: Object},
}
</script>