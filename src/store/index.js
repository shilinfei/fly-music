import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state={
    playStatus:1,//播放状态 1 列表循环 2 单曲循环 3 随机播放
    indexes:-1,//当前播放的歌曲在列表中的索引
    coverUrl:'',//封面地址
    musicUrl:'',//歌曲地址
    musicName:'',
    singerName:'',//歌手名称
    albumName:'',//专辑名称
    audiostate:false,//播放状态
    temlList:[],//临时播放列表
    songmid:0// 当前歌曲的id
}

// 用于获取数据
const getters={
    // 获取当前状态
    getPlayStatus(state){
        return state.playStatus;
    },
    getCoverUrl(state){
        if(state.indexes == -1){
            return '../../static/text.jpeg';
        }else{
            if((state.temlList[state.indexes].albumid)%100 === 0){
                return '../../static/text.jpeg';
            }else{
                return "http://imgcache.qq.com/music/photo/album_300/"+(state.temlList[state.indexes].albumid)%100+"/300_albumpic_"+state.temlList[state.indexes].albumid+"_0.jpg";
            }          
            
        }
    },
    // 暂时放在播放组件中待实现
    getMusicUrl(state){
        return state.musicUrl;
    },
    
    getMusicName(state){
        if(state.indexes == -1){
            return state.singerName;
        }else{            
            return state.temlList[state.indexes].songname;
        }
        
    },
    getSingerName(state){
        if(state.indexes == -1){
            return state.singerName;
        }else{            
            return state.temlList[state.indexes].singer[0].name;
        }
    },
    getalbumName(state){
        if(state.indexes == -1){
            return state.singerName;
        }else{            
            return state.temlList[state.indexes].albumname;
        }
    },
    getAudiostate(state){
        return state.audiostate;
    },
    getTemlList(){
        return state.temlList;
    },
    getIndexes(){
        return state.temlList;
    },
    getSongmid(){
        if(state.indexes == -1){
            return state.singerName;
        }else{            
            return state.temlList[state.indexes].songmid;
        }
    }
}
// 用于改变数据
const mutations={
    setPlayStatus(state){
        if(state.playStatus == 3){
            state.playStatus = 1;
        }else{
            state.playStatus++;
        }
    },
    setAudiostate(state){
        state.audiostate= !state.audiostate;
    },
    setMusic(state,obj){
        state.coverUrl= obj.coverUrl;
        state.musicUrl=obj.musicUrl;
        state.musicName=obj.musicName;
        state.singerName=obj.singerName;
        state.albumName=obj.albumName;
    },
    setMusicUrl(state,url){
        state.musicUrl=url;
    },
    addTemlList(state,music){
        state.temlList=state.temlList.concat(music);   
    },
    //索引加1
    addIndexes(state){
        // 当状态为随机播放时,随机改变索引的状态
        if(state.playStatus == 3){
            state.indexes = Math.floor(Math.random()*(state.temlList.length));
        }else{
            if( state.indexes == state.temlList.length-1){
                state.indexes=0;
            }else{
                state.indexes=state.indexes+1;
            } 
        }         
    },
    //索引指向末尾
    footIndexes(state){
            state.indexes = state.temlList.length -1;
    },
    //索引减1
    reducIndexes(state){
        if (state.indexes == 0){
            state.indexes = state.temlList.length -1;;
        }else{
            state.indexes = state.indexes-1;
        }
        
    },
    setIndexs(state,index){
        state.indexes = index;
    }
    
}


export default new Vuex.Store({
    state,
    getters,
    mutations
});