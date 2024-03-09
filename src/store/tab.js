import Cookie from 'js-cookie'
export default {
    state: {
        isCollapes: false,//控制菜单的展开还是收起
        tabList: [
            //数据类似route
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home',
            }
        ],
        menu: []//动态菜单数据，与登录功能相关连
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapes = !state.isCollapes
        },
        //更行面包数据
        selectMenu(state, val) {
            // console.log(val)
            //判断添加数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabList.push(val)
                }
            }
        },
        //删除指定tag数据
        closeTag(state, item) {
            console.log(state, item)
            //获得索引
            const index = state.tabList.findIndex(val => val.name === item.name)
            //删除数组元素
            state.tabList.splice(index, 1)
        },
        //设置菜单数据
        setMenu(state, val) {
            state.menu = val
            //利用store进行状态管理，数据存储在浏览器中，页面刷新后数据消失，利用cookie进行数据保存
            //cookie的数据要求是字符串，利用JSON方法
            Cookie.set('menu', JSON.stringify(val))
        },
        //动态注册路由，实现不同账户登录的不同页面
        addMenu(state, router) {
            //判断缓存中是否有数据
            if (!Cookie.get('menu')) return
            //得到cookie中的menu数据（这个数据是由账号来决定的）
            const menu = JSON.parse(Cookie.get('menu'))
            //更新或同步state中的数据
            state.menu = menu
            //处理动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        console.log(item.url, 'citem')
                        //给有子菜单的添加组件属性，实现动态路由
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    console.log(item.url, 'item')
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main', item)//在main中添加子路由
            })
        }
    }

}