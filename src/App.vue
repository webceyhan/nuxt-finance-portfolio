<script setup lang="ts">
import { useAuth } from "./store/auth";
import NavLink from "./components/ui/NavLink.vue";
import Avatar from "./components/ui/Avatar.vue";

const { user, login, logout } = useAuth();
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-primary-subtle text-primary-emphasis">
      <div class="container">
        <a class="navbar-brand" href="#">PortoFinio</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav me-auto">
            <NavLink label="Assets" :url="{ name: 'assets' }" />

            <NavLink
              v-if="user"
              class="nav-item"
              label="My Portfolio"
              :url="{ name: 'portfolio' }"
            />
          </div>

          <div class="navbar-nav">
            <!-- logout -->
            <NavLink v-if="user" @click.prevent="logout()">
              <Avatar :src="(user.photoURL as any)" class="me-1" />
              Sign Out
            </NavLink>

            <!-- login -->
            <NavLink v-else label="Sign In" @click.prevent="login()" />
          </div>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>
