<template>
    <div class="songlist" v-show="visible" @click.self="hideVisible">
        <div class="songlistbox">
            <div class="herder">
                <span>列表循环(4)</span>
            </div>
            <div class="list">
                <ul>
                        <li class="item" v-for="(music,index) in this.$store.getters.getTemlList" v-bind:key="index" @click="play(index)">
                        <span class="song-name">{{ music.songname }}</span>
                            <span class="sing-name">{{ music.singer[0].name }}</span>
                        </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        visible:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        hideVisible:function(){
            this.$emit('update:visible',false);
        },
        play:function(index){
            this.$store.commit('setIndexs',index);           
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
.songlist .songlistbox{
    position: fixed;
    bottom:0;
    height:400px;
    max-width:720px;
    width:100%;
}
.herder{
    height:54px;
    box-sizing:border-box;
    padding-left:20px;
    line-height:54px;
    border-radius:27px 27px 0 0;
    border-bottom:1px solid #999;
    background-color:#fff;
}
.list{
    background-color:#fff;
    height:345px;
    overflow-y:auto;
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