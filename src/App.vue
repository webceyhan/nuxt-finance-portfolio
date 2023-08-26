<script setup lang="ts">
import { useAuth } from "./store/auth";
import Nav from "./components/ui/Nav.vue";
import NavLink from "./components/ui/NavLink.vue";
import Avatar from "./components/ui/Avatar.vue";

const { user, login, logout } = useAuth();
</script>

<template>
  <div class="container py-5">
    <h1 class="display-4">Finance Portfolio</h1>

    <br />

    <Nav type="tabs">
      <NavLink label="Assets" :url="{ name: 'assets' }" />

      <NavLink
        v-if="user"
        class="nav-item"
        label="My Portfolio"
        :url="{ name: 'portfolio' }"
      />

      <!-- logout -->
      <NavLink v-if="user" @click.prevent="logout()" class="ms-auto">
        <Avatar :src="(user.photoURL as any)" class="me-1" />
        Sign Out
      </NavLink>

      <!-- login -->
      <NavLink v-else label="Sign In" @click.prevent="login()" />
    </Nav>

    <br />

    <router-view />
  </div>
</template>
