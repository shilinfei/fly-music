<template>
    <div class="songlist" v-show="visible" @click.self="hideVisible">
       <div class="herder">
           <span>列表循环(4)</span>
       </div>
       <div class="list">
           <ul>
                <li class="item" v-for="(music,index) in this.$store.getters.getTemlList" v-bind:key="index">
                   <span class="song-name">{{ music.songname }}</span>
                    <span class="sing-name">{{ music.singer[0].name }}</span>
                </li>
           </ul>
       </div>
    </div>
</template>
<script>
export default {
    props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        hideVisible:function(){
            this.$emit('update:visible',false);
        }
    }
}
</script>
<style scoped>
.songlist{
    position:fixed;
    bottom:0;
    height:100%;
    width:100%;
    max-width:720px;
}
.songlist .herder{
    position: absolute;
    bottom:349px;
    box-sizing: border-box;
    padding-left: 20px;
    border-bottom:1px solid #fff;
    border-radius:20px 20px 0 0;
    height:50px;
    width:100%;
    line-height:50px;
    background-color:#fff;
}
.songlist .list{
    position: absolute;
    bottom:0;
    height:350px;
    width:100%;
    overflow-y:auto;
    background-color:#fff;
}
.songlist .list .item{
    padding:0 10px;
    height:45px;
    line-height:45px;
  
}
.songlist .list .song-name{
    font-size:18px;
}
.songlist .list .sing-name{
    font-size:12px;
    color:#666;
}
</style>