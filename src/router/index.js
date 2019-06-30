import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import NotFound from '../views/NotFound';
import Profile from '../views/Profile';
import Likes from '../views/Likes';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/likes',
      name: 'Likes',
      component: Likes,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else if (!requiresAuth && currentUser) next('profile');
  else if (!requiresAuth && currentUser) next('likes');
  else next();
});

export default router;
