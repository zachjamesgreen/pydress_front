<template>
<h1 class="flex justify-center text-7xl my-8">Pydress</h1>
  <div id="nav" class="flex justify-center text-2xl my-8">
    <router-link to="/" class="hover:text-blue-300 hover:underline mx-2">Home</router-link> |
    <router-link to="/about" class="hover:text-blue-300 hover:underline mx-2">About</router-link> |
    <router-link to="/create" class="hover:text-blue-300 hover:underline mx-2">Create New</router-link>
  </div>
  <div class="flex justify-center">
    <router-view/>
  </div>
</template>
