import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import NotFound from "../components/NotFound";
import Profile from "../components/Profile";
import Likes from "../components/Likes";
import CV from "../components/CV";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/cv",
      name: "CV",
      component: CV,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/likes",
      name: "Likes",
      component: Likes,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("home");
  else if (!requiresAuth && currentUser) next("profile");
  else if (!requiresAuth && currentUser) next("likes");
  else if (!requiresAuth && currentUser) next("cv");
  else next();
});

export default router;
