<script setup lang="ts">


</script>

<template>
  <div class="container py-5">
    <h1 class="display-4">Finance Portfolio</h1>

    <br />

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'assets' }">Assets</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'portfolio' }">My Portfolio</router-link>
      </li>
    </ul>

    <br />

    <router-view></router-view>
  </div>
</template>
