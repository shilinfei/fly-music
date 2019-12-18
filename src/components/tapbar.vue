<template>
    <div class="tapbar">
        <ul>
            <li>
                <router-link to="/search" class="selection">搜索</router-link>
            </li>
            <li>
                <router-link to="/singerList">歌手</router-link>
            </li>
            <li>
                <router-link to="/personal">我的</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
    .tapbar{
        position:fixed;
        top:0;
        width:100%;
        max-width:720px;
        height:50px;
        background-color:#fff;
        border-bottom:2px solid #eeeeee;
    }
    .tapbar ul{
        display: flex;
        justify-content: space-around;
        align-content: center;
    }
    .tapbar ul li{
        padding:15px 20px;
        height:20px;
        font-size:16px;
        color:#333;
    }
    .tapbar ul .selection{
        font-weight:bold;
        color:#000;
    }
</style>
