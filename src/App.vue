<template>
  <div id="app">
    <!-- <h6>顶部导航栏</h6> -->
    <topbar></topbar>
    <!-- <h6>中间的坑</h6> -->
    <router-view></router-view>
    <!--播放器-->
    <player></player>
  </div>
</template>

<script>
import topbar from './components/tapbar';
import player from './components/player'
export default {
  name: 'App',
  components:{
      'topbar':topbar,
      'player':player
  }
}
</script>

<style>
  #app{
    margin:50px auto 60px;
    max-width:720px;
  }
</style>
