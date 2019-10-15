import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Company from '@/pages/Company'
import News from '@/pages/News'
import NewsDetail from '@/pages/NewsDetail'
import Plan from '@/pages/Plan'
import PlanAdd from '@/pages/PlanAdd'
import PlanDetail from '@/pages/PlanDetail'
import Contact from '@/pages/Contact'
import Product from '@/pages/Product'
import ProductAdd from '@/pages/ProductAdd'
import ProductDetail from '@/pages/ProductDetail'
import Project from '@/pages/Project'
import ProjectDetail from '@/pages/ProjectDetail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页 - 智居物联'
      }
    }, {
      path: '/company',
      name: 'Company',
      component: Company,
      meta: {
        title: '公司实力 - 智居物联'
      }
    }, {
      path: '/news',
      name: 'News',
      component: News,
      meta: {
        title: '新闻资讯 - 智居物联'
      }
    }, {
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail,
      meta: {
        title: '新闻详情 - 智居物联'
      }
    }, {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        title: '产品中心 - 智居物联'
      }
    }, {
      path: '/productAdd',
      name: 'ProductAdd',
      component: ProductAdd,
      meta: {
        title: '产品中心 - 智居物联'
      }
    }, {
      path: '/productDetail',
      name: 'ProductDetail',
      component: ProductDetail,
      meta: {
        title: '产品详情 - 智居物联'
      }
    }, {
      path: '/plan',
      name: 'Plan',
      component: Plan,
      meta: {
        title: '解决方案 - 智居物联'
      }
    }, {
      path: '/planAdd',
      name: 'PlanAdd',
      component: PlanAdd,
      meta: {
        title: '解决方案 - 智居物联'
      }
    }, {
      path: '/planDetail',
      name: 'PlanDetail',
      component: PlanDetail,
      meta: {
        title: '方案详情 - 智居物联'
      }
    }, {
      path: '/project',
      name: 'Project',
      component: Project,
      meta: {
        title: '项目案例 - 智居物联'
      }
    }, {
      path: '/projectDetail',
      name: 'ProjectDetail',
      component: ProjectDetail,
      meta: {
        title: '案例详情 - 智居物联'
      }
    }, {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: {
        title: '联系我们 - 智居物联'
      }
    }
  ]
})
