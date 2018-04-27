import Vue from 'vue';
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router';
import oauthRely from '../nmb/oauth2/oauth2rely';
import createRoute from '../nmb/oauth2/routes';

Vue.use(Router);

const Login: NavigationGuard = (to, from, next) => {
  oauthRely.checkLogon(from, next);
  next();
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    beforeEnter: Login,
    component: (): any => import('./test/home.vue'),
    children: [
      // {path: 'resource', name: 'resource', component: (): any => import('./resource/home.vue')},
      {path: 'test', name: 'test', component: (): any => import('./test/home.vue')}
    ]
  },
  { path: '*', redirect: '/' },
  createRoute()
];

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
});

export default router;
