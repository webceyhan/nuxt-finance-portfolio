<script setup lang="ts">
import { CURRENCY_OPTIONS, LANGUAGE_OPTIONS } from "~/constants";

const { user, login, logout } = useAuth();
const currency = useCurrency();
const language = useLanguage();
</script>

<template>
  <Title>PortoFinio</Title>

  <div>
    <nav class="navbar bg-base-200 fixed top-0 z-10 py-0">
      <div class="navbar-start">
        <!-- mobile menu -->
        <Dropdown class="md:hidden -mx-2">
          <Menu class="w-52 bg-base-200" for-dropdown>
            <MenuLink to="/assets">
              {{ $t("assets") }}
            </MenuLink>
            <MenuLink v-if="user" to="/holdings">
              {{ $t("my-portfolio") }}
            </MenuLink>
          </Menu>
        </Dropdown>

        <NuxtLink class="btn text-xl capitalize" to="/">PortoFinio</NuxtLink>

        <Menu class="max-md:hidden px-1" horizontal>
          <MenuLink to="/assets">
            <Icon name="gem" size="md" />
            {{ $t("assets") }}
          </MenuLink>

          <MenuLink v-if="user" to="/holdings">
            <Icon name="wallet2" size="md" />
            {{ $t("my-portfolio") }}
          </MenuLink>
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
            <MenuTitle> {{ $t("language") }} </MenuTitle>
            <MenuLink
              v-for="option in LANGUAGE_OPTIONS"
              :key="option.value"
              @click.prevent="language = option.value"
            >
              <span class="me-2 text-lg"> {{ option.emoji }} </span>
              <span class="me-auto"> {{ option.label }} </span>
              <Icon name="check2" :class="{ 'opacity-0': option.value != language }" />
            </MenuLink>

            <Divider />

            <MenuTitle> {{ $t("currency") }} </MenuTitle>
            <MenuLink
              v-for="option in CURRENCY_OPTIONS"
              :key="option.value"
              @click.prevent="currency = option.value"
            >
              <span class="me-2 text-lg"> {{ option.emoji }} </span>
              <span class="me-auto"> {{ $t(option.label) }} </span>
              <Icon name="check2" :class="{ 'opacity-0': option.value != currency }" />
            </MenuLink>

            <Divider />

            <!-- <MenuLink href="#"> Settings </MenuLink> -->
            <MenuLink @click.prevent="logout()">
              <Icon name="box-arrow-left" />
              <span class="me-auto"> {{ $t("sign-out") }} </span>
            </MenuLink>
          </Menu>
        </Dropdown>

        <!-- login -->
        <Button v-else @click.prevent="login()">
          <Icon name="box-arrow-in-right" />
          {{ $t("sign-in") }}
        </Button>
      </div>
    </nav>

    <main class="container mx-auto my-14 px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>
