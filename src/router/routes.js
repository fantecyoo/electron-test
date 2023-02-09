const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    redirect: to => {
      return { path: "/index", query: { category: to.query.category || "all" } }
    },
    // redirect: "/login",
    children: [
      {
        path: "index",
        component: () => import("@/views/Main.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      isAuth: false
    }
  }
]

export { routes }
