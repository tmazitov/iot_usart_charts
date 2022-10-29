<template>
    <div class="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/header/Header.vue';

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
body{
    margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>