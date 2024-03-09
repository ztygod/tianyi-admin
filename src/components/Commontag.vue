<template>
    <div class="tabs">
        <el-tag
            v-for="(item,index) in tags"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changMenu(item)"
            @close="handleClose(item,index)"
            size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default{
    name:'Commontag',
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            tags:state => state.tab.tabList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag跳转功能
        changMenu(item){
            this.$router.push({name:item.name})
        },
        //点击tag删除功能
        handleClose(item,index){
            //调用store中的mutations
            this.closeTag(item)
            const length = this.tags.length//length为删去后的长度，不要减一
            //删除之后的高亮跳转逻辑
            //如果删除tag与页面路由所在不同，则直接返回
            if(item.name !== this.$route.name){
                return
            }
            //表示删除的是最后一项
            if(index === length){
                this.$router.push({
                    name:this.tags[index - 1].name
                })
            }else{//表示删除的是中间的某项
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer; 
            
        }
    }

</style>