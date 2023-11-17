/**
 * 路由配置
 */
export default [
  {
    path: '/',
    component: '../layouts/SubApp/index',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        component: './Home',
      }, 
      {
        path: '/test',
        component: './Test/index',
      }, 
      {
        component: './404',
      },
    ],
  },
  {
    path: '/user',
    component: '../layouts/User/index',
    routes: [
      {
        path: '/user/login',
        component: './User/Login/index',
      },
    ],
  },
];
