import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import Code from "../views/Code";
import Register from "../views/Register";
import Login from "../views/Login";
import About from "../views/About";
import NotFound from "../views/NotFound";

const routes = [
  {
    path: "/*",
    name: "NotFound",
    component: NotFound
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/code",
    name: "Code",
    component: Code
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/about",
    name: "About",
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (loggedIn && (to.path === "/login" || to.path === "/register")) {
    next("/");
  } else if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
export default router;
