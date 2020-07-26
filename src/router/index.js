import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path*',
			component: () => import('@/views/redirect/index')
		}]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/auth-redirect',
		component: () => import('@/views/login/auth-redirect'),
		// hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [{
			path: 'dashboard',
			component: () => import('@/views/dashboard/index'),
			name: 'Dashboard',
			meta: {
				title: 'dashboard',
				icon: 'dashboard',
				affix: true
			}
		}]
	},
	{
		path: '/profile',
		component: Layout,
		redirect: '/profile/index',
		hidden: false,
		children: [{
			path: 'index',
			component: () => import('@/views/profile/index'),
			name: 'Profile',
			meta: {
				title: 'profile',
				icon: 'user',
				noCache: true
			}
		}]
	}
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [{
		path: '/permission',
		component: Layout,
		redirect: '/permission/page',
		//alwaysShow: true, // 将始终显示根菜单
		name: 'Permission',
		meta: {
			title: 'permission',
			icon: 'lock',
			roles: ['admin'] // 可以在根导航中设置角色
		},
		children: [{
			path: 'role',
			component: () => import('@/views/permission/role'),
			name: 'RolePermission',
			meta: {
				title: 'rolePermission',
				roles: ['admin']
			}
		}]
	},
	{
		path: '/advert',
		component: Layout,
		redirect: '/advert/index',
		alwaysShow: true,
		name: 'advert',
		meta: {
			title: '广告管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
				path: 'index',
				component: () => import('@/views/advert/index'),
				name: 'advertlist',
				meta: {
					title: '广告列表',
					roles: ['admin']
				}
			},
			{
				path: 'advertPositions',
				component: () => import('@/views/advert/advertPositions'),
				name: 'advertPositions',
				meta: {
					title: '广告位置',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/user',
		component: Layout,
		redirect: '/user/index',
		alwaysShow: true,
		name: 'user',
		meta: {
			title: '用户管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
				path: 'member',
				component: () => import('@/views/user/member'),
				name: 'member',
				meta: {
					title: '会员类型',
					roles: ['admin']
				}
			},
            {
                path: 'users',
                component: () => import('@/views/user/users'),
                name: 'users',
                meta: {
                    title: '用户列表',
                    roles: ['admin']
                }
            },
            {
                path: 'usersAddress/:id(\\d+)',
                component: () => import('@/views/user/usersAddress'),
                name: 'usersAddress',
                meta: {
                    title: '收货地址',
                    roles: ['admin']
                },
                hidden:true
            },
            {
				path: 'platformMember',
				component: () => import('@/views/user/platformMember'),
				name: 'platformMember',
				meta: {
					title: '平台成员',
					roles: ['admin']
				}
			},
			{
				path: 'memberRecent',
				component: () => import('@/views/user/memberRecent'),
				name: 'memberRecent',
				meta: {
					title: '会员开通记录',
					roles: ['admin']
				}
			},
			{
				path: 'advertlist',
				component: () => import('@/views/user/withdrawal'),
				name: 'advertlist',
				meta: {
					title: '提现列表',
					roles: ['admin']
				}
			},
			{
				path: 'recharge',
				component: () => import('@/views/user/recharge'),
				name: 'recharge',
				meta: {
					title: '充值列表',
					roles: ['admin']
				}
			},
			{
				path: 'horsemen',
				component: () => import('@/views/user/horsemen'),
				name: 'horsemen',
				meta: {
					title: '骑手列表',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/mallman',
		component: Layout,
		redirect: '/mallman/mallman',
		alwaysShow: true,
		name: 'mallman',
		meta: {
			title: '商城管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
			path: 'nav',
			component: () => import('@/views/mallman/nav'),
			name: 'nav',
			meta: {
				title: '导航列表',
				roles: ['admin']
			}
		}]
	},
	{
		path: '/meal',
		component: Layout,
		redirect: '/meal/meal',
		alwaysShow: true,
		name: 'meal',
		meta: {
			title: '套餐管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
				path: 'meal',
				component: () => import('@/views/meal/meal'),
				name: 'meal',
				meta: {
					title: '套餐列表',
					roles: ['admin']
				}
			},
			{
				path: 'mealgoods',
				component: () => import('@/views/meal/mealgoods'),
				name: 'mealgoods',
				meta: {
					title: '套餐商品',
					roles: ['admin']
				}
			}
		]
	},
    {
    	path: '/system',
    	component: Layout,
    	redirect: '/system/system',
    	alwaysShow: true,
    	name: 'system',
    	meta: {
    		title: '系统管理',
    		icon: 'component',
    		roles: ['admin']
    	},
    	children: [{
    			path: 'operLog',
    			component: () => import('@/views/system/operLog'),
    			name: 'operLog',
    			meta: {
    				title: '操作日志',
    				roles: ['admin']
    			}
    		}
    	]
    },
	{
		path: '/business',
		component: Layout,
		redirect: '/business/index',
		alwaysShow: true,
		name: 'business',
		meta: {
			title: '商家管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
			path: 'businessList',
			component: () => import('@/views/business/index'),
			name: 'businessList',
			meta: {
				title: '商家列表',
				roles: ['admin']
			}
		},
        {
        	path: 'storeTable',
        	component: () => import('@/views/business/storeTable'),
        	name: 'storeTable',
        	meta: {
        		title: '桌子列表',
        		roles: ['admin']
        	}
        },
        {
        	path: 'tableCategorys',
        	component: () => import('@/views/business/tableCategorys'),
        	name: 'tableCategorys',
        	meta: {
        		title: '桌子分类',
        		roles: ['admin']
        	}
        }]
	},
	{
		path: '/coupon',
		component: Layout,
		redirect: '/coupon/coupon',
		alwaysShow: true,
		name: 'coupon',
		meta: {
			title: '优惠券管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
			path: 'couponList',
			component: () => import('@/views/coupon/coupon'),
			name: 'couponList',
			meta: {
				title: '优惠券列表',
				roles: ['admin']
			}
		}]
	},
	{
		path: '/order',
		component: Layout,
		redirect: '/order/order',
		alwaysShow: true,
		name: 'order',
		meta: {
			title: '订单管理',
			icon: 'component',
			roles: ['admin']
		},
		children: [{
				path: 'groupOrder',
				component: () => import('@/views/order/groupOrder'),
				name: 'groupOrder',
				meta: {
					title: '拼团订单',
					roles: ['admin']
				}
			},
            {
                path: 'seckillOrder',
                component: () => import('@/views/order/seckillOrder'),
                name: 'seckillOrder',
                meta: {
                    title: '秒杀订单',
                    roles: ['admin']
                }
            },
            {
            	path: 'generalOrder',
            	component: () => import('@/views/order/generalOrder'),
            	name: 'generalOrder',
            	meta: {
            		title: '普通订单',
            		roles: ['admin']
            	}
            },
			{
				path: 'horseOrder',
				component: () => import('@/views/order/horseOrder'),
				name: 'horseOrder',
				meta: {
					title: '骑手订单',
					roles: ['admin']
				}
			},
			{
				path: 'tableuserOrder',
				component: () => import('@/views/order/tableuserOrder'),
				name: 'tableuserOrder',
				meta: {
					title: '扫码点餐订单',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/goods',
		component: Layout,
		redirect: '/goods/goodslist',
		alwaysShow: true,
		name: 'goods',
		meta: {
			title: '商品管理',
			icon: 'table',
			roles: ['admin']
		},
		children: [{
				path: 'goodslist',
				component: () => import('@/views/goods/goodslist'),
				name: 'goodslist',
				meta: {
					title: '商品列表',
					roles: ['admin']
				}
			},
            {
            	path: 'goodsProperty/:id(\\d+)',
            	component: () => import('@/views/goods/goodsProperty'),
            	name: 'goodsProperty',
            	meta: {
            		title: '商品规格',
            		roles: ['admin']
            	},
                hidden:true
            },
            // {
            // 	path: 'propertyValues/:id(\\d+)',
            // 	component: () => import('@/views/goods/propertyValues'),
            // 	name: 'propertyValues',
            // 	meta: {
            // 		title: '商品规格价格',
            // 		roles: ['admin']
            // 	},
            //     hidden:true
            // },
			{
				path: 'groupGoods',
				component: () => import('@/views/goods/groupGoods'),
				name: 'groupGoods',
				meta: {
					title: '团购商品',
					roles: ['admin']
				}
			},
            {
            	path: 'seckillGoods',
            	component: () => import('@/views/goods/seckillGoods'),
            	name: 'seckillGoods',
            	meta: {
            		title: '秒杀商品',
            		roles: ['admin']
            	}
            },
            {
            	path: 'goodsAppraises/:id(\\d+)',
            	component: () => import('@/views/goods/goodsAppraises'),
            	name: 'goodsAppraises',
            	meta: {
            		title: '商品评论',
            		roles: ['admin']
            	},
                hidden:true
            },
			{
				path: 'categorys',
				component: () => import('@/views/goods/categorys'),
				name: 'categorys',
				meta: {
					title: '分类列表',
					roles: ['admin']
				}
			}
		]
	},
	// 404 页面必须放在末尾 !!!
	{
		path: '*',
		redirect: '/404',
    hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // 需要服务支持
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// 详情见: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // 重置路由
}

export default router
