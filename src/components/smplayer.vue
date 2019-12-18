<template>
    <div class="smplayer">
       <div class="coverBox">
           <img :src=" this.$store.getters.getCoverUrl " alt="">
       </div>
       <div class="music-info">
           <p clsss='name'>{{ this.$store.getters.getMusicName }}</p>
           <p class='info'>{{ this.$store.getters.getSingerName +"   "+this.$store.getters.getalbumName }}</p>
       </div>
       <div class="music-btn">
           <button @click="setPlay">
               播放/暂停
           </button>
       </div>
       <audio ref="mudom">
         <source :src=" this.$store.getters.getMusicUrl " type="audio/ogg">
         <source :src=" this.$store.getters.getMusicUrl " type="audio/mpeg">
      </audio>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
        /** 初始的数据设计,现在已经使用vuex
            coverUrl:'../../static/text.jpeg',//封面地址
            musicUrl:'../../static/白若溪 - 追梦人.mp3',//歌曲地址
            musicName:'歌曲名称',
            singerName:'歌手名称',
            albumName:'专辑名称',
            audiostate:false//播放状态
        **/
        }
    },
    methods:{
        //播放事件
        palyMusic:function(){
            let audio=this.$refs.mudom;
            if( this.$store.getters.getAudiostate ){
                audio.play();
            }else{
                audio.pause();
            }
            //查看本组件的播放状态
            console.log('这是调用播放器的状态'+this.$store.getters.getAudiostate);
                  
        },
        //改变仓储中的状态
        setPlay:function(){
            //待完成  判断播放器的状态并改变按钮的图标

            //改变播放器的状态
            this.$store.commit("setAudiostate");
            
        }
    },watch:{
        '$store.state.audiostate'(){
            //当仓储中的状态发生改变是调用播放数将
            this.palyMusic();
        },
        '$store.state.musicUrl'(){
            let audio=this.$refs.mudom;
            //改变地址后重新加载音频
            audio.load()
        }
    }
}
</script>
<style scoped>
    .smplayer{
        position: fixed;
        display: flex;
        bottom:0;
        height:60px;
        max-width:720px;
        width:100%;
        border-top:1px solid #aaa;
        background-color:rgba(255, 255, 255, .8);
    }
    .coverBox{
        background-color:#ff0;
        height:60px;
        width:60px;
    }
    .coverBox img{
        padding:5px;
        height:50px;
        width:50px;
        border-radius:30px;
    }
    .music-info{
        flex-grow:2;
        height:50px;
        padding:5px;
    }
    .music-info .name{
        font-size:16px;
    }
    .music-info .info{
        margin-top: 10px;
         height:20px;
         line-height:20px;
         font-size:14px;
         color:#999;
    }
    .music-btn{
        height:60px;
        width:60px;
        background-color:#ff0;
    }
</style>
