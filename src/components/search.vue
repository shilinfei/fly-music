<template>
    <div class="search">
        <div class="search-from">
            <input type="text" v-model="testmsg" @change="search" @focus="clean" name="" id="">
        </div>
        <div class="musiclist">
            <ul>
                <li v-for="(music,index) in musiclist" @click="addmusic(music)" v-bind:key='index'>
                    <span class="music-name">{{ music.songname }}</span>
                    <span class="info">{{ music.singer[0].name }} - {{ music.albumname}} </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            testmsg:'',
            musiclist:[],
            page:1
        }
     },
     methods:{
         clean:function(){
             this.testmsg=''
             this.musiclist=[];
         },
         //使用jsonp搜索
         search: function(){
            let url='https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&n=30';
            this.$jsonp(url, { w: this.testmsg,p:this.page, callbackName: "callback"}).then(json => {
                this.musiclist=this.musiclist.concat(json.data.song.list);
                // this.musiclist.push(json.data.song.list);此 不行
            }).catch(err => {
                console.log('搜索失败');
            })
         },
         //获取take,使用获取的take拼接歌曲地址,保存到仓储中
        // getMusrcUrl(songmid){
        //     console.log("songmid=="+songmid);
        //     let muUrl='';
        //     let guid='2916248128';
        //     let url='https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid='+songmid+'&filename=C400'+songmid+'.m4a&guid='+guid;
        //     this.$jsonp(url).then(json =>{
        //         muUrl='http://ws.stream.qqmusic.qq.com/'+json.data.items[0].filename+'?fromtag=0&guid='+guid+'&vkey='+json.data.items[0].vkey;
        //         this.$store.commit("setMusicUrl",muUrl);
        //    }).catch(err =>{
        //         console.log('获取音乐信息失败----------');
        //     });          
        // },
         //点击后播放,1.改变仓储中的数据,
        //  改变当前音乐对象的数据
        // addmusic(music){
        //     console.log(music);
        //     //获取封面地址
        //    var coverUrl="http://imgcache.qq.com/music/photo/album_300/"+(music.albumid)%100+"/300_albumpic_"+music.albumid+"_0.jpg";
        //    console.log(coverUrl);
        //    let muUrl=this.getMusrcUrl(music.songmid); 
        //    console.log('----------'+muUrl);
        //    var obj = {
        //         coverUrl:coverUrl,
        //         musicName:music.songname,
        //         singerName:music.singer[0].name,
        //         albumName:music.albumname,
        //         musicUrl:muUrl
        //     }
        //     this.$store.commit("setMusic",obj);
            
        // },

        //点击后,将音乐添加到列表中去 
        addmusic(music){
            this.$store.commit("addTemlList",music);
            // 临时测试代码
            this.$store.commit('footIndexes');            
        },
        // 下拉加载功能
        scroll(person) {
            window.onscroll = () => {
                let bottomwindow =
                document.documentElement.scrollTop + window.innerHeight ===
                document.documentElement.offsetHeight; //scrollTop滚动条的垂直位置，innerheight	返回窗口的文档显示区的高度。
                // console.log(bottomwindow);
                // console.log(document.documentElement.offsetHeight); //返回该元素的像素高度,高度包含该元素的垂直内边距和边框,且是一个整数
        
                if (bottomwindow) {
                    this.page ++;
                    this.search();
                }
            };
        }
    },
    mounted() {
        this.scroll(this.person);
     }
}
</script>
<style scoped>
    .search-from{
        box-sizing: border-box;
        position: fixed;
        top:50px;
        padding:8px 10px;
        width:100%;
        max-width:720px;
        background-color:#aac;
    }
    .search-from input[type='text']{
        box-sizing: border-box;
        padding-left:15px;
        margin:auto;
        height:30px;
        width:100%;
        border-radius:5px;
    }
    .musiclist{
        margin-top:100px;
    }
    .musiclist ul{
        margin:0 10px;
    }
    .musiclist li{
        height:50px;
        box-sizing: border-box;
        padding:7px 0;
        border-bottom:1px solid #ddd;
    }
    .musiclist li .music-name{
        display:block;
        height:20px;
        width:100%;
        overflow: hidden;
        line-height:20px;
        font-size:16px;

    }
    .musiclist li .info{
        display:block;
        height:16px;
        width:100%;
        overflow: hidden;
        line-height:16px;
        font-size:14px;
        color:#666;

    }
</style>
