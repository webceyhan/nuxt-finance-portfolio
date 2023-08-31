<script setup lang="ts">
import { useAuth } from "./store/auth";
import Menu from "./components/ui/Menu.vue";
import MenuLink from "./components/ui/MenuLink.vue";
import Avatar from "./components/ui/Avatar.vue";

const { user, login, logout } = useAuth();
</script>

<template>
  <div>
    <nav class="navbar bg-base-200 px-5">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl capitalize" href="/">PortoFinio</a>

        <Menu class="px-1" horizontal>
          <MenuLink :to="{ name: 'assets' }"> Assets </MenuLink>
          <MenuLink v-if="user" :to="{ name: 'portfolio' }"> My Portfolio </MenuLink>
        </Menu>
      </div>

      <div class="navbar-end">
        <!-- logout -->

        <a
          v-if="user"
          class="link link-hover flex items-center gap-2"
          @click.prevent="logout()"
        >
          <Avatar :src="(user.photoURL as any)" class="me-1" size="sm" with-ring />
          Sign Out
        </a>

        <!-- login -->
        <a v-else class="link link-hover" @click.prevent="login()">Sign In</a>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8 mb-10">
      <router-view />
    </main>
  </div>
</template>
