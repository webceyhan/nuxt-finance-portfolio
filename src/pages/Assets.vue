<script setup lang="ts">

import { onMounted } from 'vue';
import { useAuth } from '../store/auth';
import { useAssets } from '../store/assets';
import AssetList from '../components/AssetList.vue';

const { user, login, logout } = useAuth();
const { assets, load } = useAssets();

onMounted(async () => {
    load();
});

</script>

<template>
    {{ user?.displayName }}
    <button class="btn btn-primary" @click="login">login</button>
    <button class="btn btn-secondary" @click="logout">logout</button>
    <AssetList :assets="assets" />
</template>