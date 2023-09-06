<script setup lang="ts">
import { CURRENCY_OPTIONS } from "~/constants";

const { user, login, logout } = useAuth();
const currency = useCurrency();
</script>

<template>
  <Title>PortoFinio</Title>

  <div>
    <nav class="navbar bg-base-200 fixed top-0 z-10">
      <div class="navbar-start">
        <!-- mobile menu -->
        <Dropdown class="md:hidden -mx-2">
          <Menu class="w-52 bg-base-200" for-dropdown>
            <MenuLink to="/assets"> Assets </MenuLink>
            <MenuLink v-if="user" to="/holdings"> My Portfolio </MenuLink>
          </Menu>
        </Dropdown>

        <NuxtLink class="btn text-xl capitalize" to="/">PortoFinio</NuxtLink>

        <Menu class="max-md:hidden px-1" horizontal>
          <MenuLink to="/assets"> Assets </MenuLink>
          <MenuLink v-if="user" to="/holdings"> My Portfolio </MenuLink>
        </Menu>
      </div>

      <div class="navbar-end">
        <ThemeSwitcher />

        <!-- logout -->
        <Dropdown v-if="user" align-end>
          <template #label>
            <span class="max-md:hidden me-1">
              {{ user.displayName?.split(" ")[0] }}
            </span>
            <Avatar :src="(user.photoURL as any)" size="sm" with-ring />
          </template>

          <Menu class="w-60 bg-base-200" for-dropdown>
            <MenuTitle> Currency </MenuTitle>
            <MenuLink
              v-for="option in CURRENCY_OPTIONS"
              :key="option.value"
              @click.prevent="currency = option.value"
            >
              <span class="me-2 text-lg"> {{ option.emoji }} </span>
              <span class="me-auto"> {{ option.label }} </span>
              <Icon name="check2" :class="{ 'opacity-0': option.value != currency }" />
            </MenuLink>

            <Divider />

            <!-- <MenuLink href="#"> Settings </MenuLink> -->
            <MenuLink @click.prevent="logout()">
              <Icon name="box-arrow-left" />
              <span class="me-auto">Sign Out</span> 
            </MenuLink>
          </Menu>
        </Dropdown>

        <!-- login -->
        <Button v-else @click.prevent="login()">
          <Icon name="box-arrow-in-right" />
          Sign In
        </Button>
      </div>
    </nav>

    <main class="container mx-auto my-14 px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
