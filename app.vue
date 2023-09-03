<script setup lang="ts">
const { user, login, logout } = useAuth();
</script>

<template>
  <Title>PortoFinio</Title>

  <div>
    <nav class="navbar bg-base-200 fixed top-0">
      <div class="navbar-start">
        <!-- mobile menu -->
        <Dropdown class="md:hidden -mx-2">
          <Menu class="w-52 bg-base-200" for-dropdown>
            <MenuLink :to="{ name: 'assets' }"> Assets </MenuLink>
            <MenuLink v-if="user" :to="{ name: 'portfolio' }"> My Portfolio </MenuLink>
          </Menu>
        </Dropdown>

        <a class="btn text-xl capitalize" href="/">PortoFinio</a>

        <Menu class="max-md:hidden px-1" horizontal>
          <MenuLink :to="{ name: 'assets' }"> Assets </MenuLink>
          <MenuLink v-if="user" :to="{ name: 'portfolio' }"> My Portfolio </MenuLink>
        </Menu>
      </div>

      <div class="navbar-end">
        <!-- logout -->
        <Dropdown v-if="user" align-end>
          <template #label>
            <span class="max-md:hidden me-1">{{ user.displayName }}</span>
            <Avatar :src="(user.photoURL as any)" size="sm" with-ring />
          </template>

          <Menu class="w-52 bg-base-200" for-dropdown>
            <!-- <MenuLink href="#"> Settings </MenuLink> -->
            <MenuLink @click.prevent="logout()"> Sign Out </MenuLink>
          </Menu>
        </Dropdown>

        <!-- login -->
        <Button v-else @click.prevent="login()">Sign In</Button>
      </div>
    </nav>

    <main class="container mx-auto my-14 px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
