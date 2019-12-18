<template>
    <div class="player">
        <!-- 全屏播放器 -->
        <div class="big-player" v-bind:class="{hide: isHide}">
            <div class="header">
                    <span class="iconfont icon-left-arrow"  @click="toggerHide"></span>
                    <div>
                         <p class='name'>{{ this.$store.getters.getMusicName }}</p>
                         <p class='info'>{{ this.$store.getters.getSingerName +"   "+this.$store.getters.getalbumName }}</p>
                    </div>
            </div>
            <div class="cover">
                <img :src=" this.$store.getters.getCoverUrl " alt="">
            </div>
            <div class="control-group">
                    <div class="progress-box">
                        <!-- 当前时间 -->
                        <span class="current-time">
                            {{ currentTime |timeFormat() }}
                        </span>
                        <!-- 进度条 -->
                        <div class="progress" >
                            <div class="current" v-bind:style="styleObject"></div>
                            <!-- <div class="smbox"></div> -->
                        </div>
                        <span class="total">
                            {{ totalTime | timeFormat() }}
                        </span>
                    </div>
                    <div class="btn-group">
                        <!-- 播放状态 -->
                         <span class="iconfont" 
                          v-bind:class="{'icon-ttpodicon-copy':(this.$store.getters.getPlayStatus == 1),
                          'icon-suiji':(this.$store.getters.getPlayStatus == 3),
                          'icon-danquxunhuan':(this.$store.getters.getPlayStatus == 2)}" 
                          @click="setPlayStatus"></span>
                         <!-- 上一曲 -->
                         <span class="iconfont icon-previous" @click="prev"></span>
                         <!-- 播放/暂停 -->
                         <span class="play iconfont" v-bind:class="{ 'icon-bofang': !this.$store.getters.getAudiostate, 'icon-zanting': this.$store.getters.getAudiostate}" @click.stop="setPlay"></span>
                         <!-- 下一曲 -->
                         <span class="iconfont icon-next" @click="next"></span>
                         <!-- 打开当前播放列表 -->
                         <span class="iconfont icon-ERP_directory_classification" @click="showPanel"></span>
                    </div>
            </div>
        </div>
        <!-- 迷你播放器 -->
        <div class="sm-player" v-bind:class="{hide:!isHide}" @click="toggerHide">
            <div class="sm-player-box">
                <div class="coverBox">
                    <img :src=" this.$store.getters.getCoverUrl " alt="">
                </div>
                <div class="music-info">
                    <p clsss='name'>{{ this.$store.getters.getMusicName }}</p>
                    <p class='info'>{{ this.$store.getters.getSingerName +"   "+this.$store.getters.getalbumName }}</p>
                </div>
                <div class="music-btn">
                    <span class="iconfont" v-bind:class="{ 'icon-bofang': !this.$store.getters.getAudiostate, 'icon-zanting': this.$store.getters.getAudiostate}" @click.stop="setPlay"></span>
                </div>
            </div>
        </div>
        <audio ref="mudom" @canplay="getTotal" :loop="this.$store.getters.getPlayStatus == 2">
            <source :src=" this.$store.getters.getMusicUrl " type="audio/ogg">
            <source :src=" this.$store.getters.getMusicUrl " type="audio/mpeg">
        </audio>
        <songlist :visible.sync="visible"></songlist>
    </div>
</template>
<script>
import songlist from './songList'
export default {
    components:{
        'songlist':songlist
    },
    data:function(){
        return {
            visible:false,
            isHide:true,
            // 总时长
            totalTime:0,
            // 当前时间
            currentTime:0,
            styleObject:{
                width:'0%'
            }           
        }
    },
    methods: {
        //改变播放状态  //获取当前状态 //改变播放状态 并改变图标
        setPlayStatus:function(){
            this.$store.commit('setPlayStatus');            
        },
        showPanel:function(){
          this.visible = true  //显示
        },
        // 上一曲
        prev:function(){
            this.$store.commit('reducIndexes');
        },
        //下一曲
        next:function(){
            this.$store.commit('addIndexes');
        },
        //显示和隐藏播放器
        toggerHide:function(){
            this.isHide=!this.isHide;
        },
         //获取总时间
        getTotal:function(){
            this.totalTime=this.$refs.mudom.duration;
        },
        //获取当前时间,熟悉进度条和进度条上的时间
        updateTime:function(){
           this.currentTime=this.$refs.mudom.currentTime;//当前时间
           this.styleObject.width=((this.currentTime/this.totalTime) * 100) + '%';//进度条 当前时间/总时间
            // 点前状态不为单曲循环时播放完歌曲播放下一曲
            if((this.$store.getters.getPlayStatus != 2) && this.currentTime == this.totalTime){
                this.$store.commit('addIndexes');
            }
        },
        //定时器,每个1秒钟更新一下时间
        timeOut:function(){
            this.clearTimeSet=setInterval(() => { 
                this.updateTime();
            }, 1000)
        },
        //播放
        palyMusic:function(){
            let audio=this.$refs.mudom;
            if( this.$store.getters.getAudiostate ){
                // 播放音频,并开启定时器,更新进度条
                audio.play();
                // this.getlyric();
                this.timeOut();
            }else{
                // 暂停音乐并,关闭进度条
                audio.pause();
                clearInterval(this.clearTimeSet);
            }
                  
        },
        //改变仓储中的状态
        setPlay:function(){
            //待完成  判断播放器的状态并改变按钮的图标
            //改变播放器的状态
            this.$store.commit("setAudiostate");
            
        },
        //获取歌词
        getlyric:function(){
            let url='/api/getDiscList';
            this.$axios.get(url).then(res =>{
                console.log(res.data);
                
            })        
        },
        getMusrcUrl(songmid){
            let muUrl='';
            let guid='2916248128';
            let url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid='+songmid+'&filename=C400'+songmid+'.m4a&guid='+guid;
            this.$jsonp(url).then(json =>{
                muUrl='http://ws.stream.qqmusic.qq.com/'+json.data.items[0].filename+'?fromtag=0&guid='+guid+'&vkey='+json.data.items[0].vkey;
                this.$store.commit("setMusicUrl",muUrl);
           }).catch(err =>{
                console.log('获取音乐信息失败----------');
            });
            
        },       
    },
    filters:{
        // 将时间转换为分钟格式
        timeFormat:function(times){
            //获取分钟数
            let timeMin=parseInt(times/60);
            // 前面补0处理
            if(timeMin<10){
                timeMin='0'+timeMin;
            }
            let timeS=parseInt(times% 60)
            if(timeS<10){
                timeS='0'+timeS;
            }
            return timeMin + ':' + timeS;
        }
    },
    watch:{
        '$store.state.audiostate'(){
            //当仓储中的状态发生改变是调用播放数将
            this.palyMusic();
        },
        '$store.state.indexes'(){
           this.getMusrcUrl(this.$store.getters.getSongmid);
        },
        '$store.state.musicUrl'(){
            let audio=this.$refs.mudom;
            //改变地址后重新加载音频
            audio.load();
            this.palyMusic();
        }
    },    
}
</script>
<style scoped>
    .hide{
        display: none;
    }
    /* big-player */
    .big-player{
        position: fixed;
        top:0;
        max-width:720px;
        width:100%;
        height:100%;
        background-color:#eee;
    }
    .big-player .header{
        margin-top:25px;
        height:50px;
        display:flex;
    }
    .big-player .header .icon-left-arrow{
        text-align: center;
        line-height:50px;
        font-size:30px;
        height:50px;
        width:55px;
        color:#333;
    }
    .big-player .header .name{
        font-size:16px;
        color:#333;
        font-weight:700;
    }
    .big-player .header .info{
        margin-top:10px;
        font-size:14px;
        color:#666;
        font-weight:700;
    }
    .big-player .cover{
        height:246px;
        width:246px;
        margin:76px auto 0;
    }
    .big-player .cover img{
        border-radius:123px;
    }
    .control-group{
        position: absolute;
        bottom:0;
        box-sizing: border-box;
        /* padding-top:15px; */
        height:120px;
        width:100%;
    }
    .progress-box{
        margin:15px 0;
        box-sizing: border-box;
        padding:0 10px;
        display: flex;
    }
    .current-time,
    .total{
        text-align: center;
        height:20px;
        line-height:20px;
        width:60px;
        font-size:12px;
    }
    .progress{
        margin-top:7px;
        height:5px;
        width:100%;
        background-color: #999;
    }
    .progress .current{
        height:5px;
        width:0%;
        background-color:#333;
    }
    .btn-group{
        display: flex;
        justify-content: space-around; 
        align-items:center
    }
    .btn-group .iconfont{
        text-align: center;
        line-height:40px;
        font-size:35px;
        height:40px;
        width:40px;
    }
    .btn-group .play{
        font-size:45px;
        height:50px;
        width:50px;
    }
    .btn-group .icon-ERP_directory_classification{
        font-size:30px;
    }
    .btn-group .icon-suiji{
        font-size:28px;
    }
     /* big-player end */
     /* smplay */
    .sm-player{
        border-top:1px solid rgb(211, 202, 206);
        position: fixed;
        bottom:0;
        max-width:720px;
        width:100%;
        height:60px;
        background-color:rgba(255, 255, 255, .9);
    }
     .sm-player-box{
        display: flex;
    }
    .sm-player .coverBox{
        height:60px;
        width:60px;
    }
    .sm-player .coverBox img{
        padding:5px;
        height:50px;
        width:50px;
        border-radius:30px;
    }
    .sm-player .music-info{
        flex-grow:2;
        height:50px;
        padding:5px;
    }
    .sm-player .music-info .name{
        font-size:16px;
    }
    .sm-player .music-info .info{
        margin-top: 10px;
         height:20px;
         line-height:20px;
         font-size:14px;
         color:#999;
    }
    .sm-player .music-btn{
        margin-top:10px;
        height:60px;
        width:60px;
    }
    .sm-player .music-btn .iconfont{
        height:60px;
        width:60px;
        font-size:35px;
        font-weight: 500;
        color:#333;
    }
    /* smplay end */
</style>
