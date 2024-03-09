<template>
    <div>
        <el-container>
            <el-aside width="auto">
              <Commonasid/>
            </el-aside>
            <el-container>
            <el-header>
                <Commonheader/>
            </el-header>
            <Commontag/>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
 import Commonasid from '../components/Commonasid.vue';
 import Commonheader from '../components/Commonheader.vue'
 import Commontag from '../components/Commontag.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        Commonasid,
        Commonheader,
        Commontag
    }
}

</script>

<style>
    .el-header{
        padding: 0;
    }
</style>


