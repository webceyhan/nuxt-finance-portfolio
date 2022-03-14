<script setup lang="ts">

import { useAuth } from './store/auth';

const { user, login, logout } = useAuth();

</script>

<template>
  <div class="container py-5">
    <h1 class="display-4">Finance Portfolio</h1>

    <br />

    <ul class="nav nav-tabs">
      <!-- assets -->
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'assets' }">Assets</router-link>
      </li>

      <!-- my portfolio -->
      <li v-if="user" class="nav-item">
        <router-link class="nav-link" :to="{ name: 'portfolio' }">My Portfolio</router-link>
      </li>

      <!-- login -->
      <li class="nav-item ms-auto">
        <a v-if="!user" href="#" class="nav-link" @click.prevent="login">Sign In</a>
        <a v-else href="#" class="nav-link py-1" @click.prevent="logout">
          <img
            :src="(user.photoURL as any)"
            referrerpolicy="no-referrer"
            class="rounded-circle me-1"
            style="height:2rem"
          />
          Sign Out
        </a>
      </li>
    </ul>

    <br />

    <router-view />
  </div>
</template>
