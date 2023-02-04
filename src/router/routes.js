import Home from "@/views/Home.vue"
// import Main from "@/views/Main.vue"
import Login from "@/views/Login.vue"
const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    // redirect: to => {
    //   return { path: "/index", query: { category: to.query.category || "all" } }
    // },
    redirect: "/login",
    children: [
      {
        path: "index",
        // redirect: to => {
        //   return {
        //     path: "/index",
        //     query: { category: to.query.category || "all" }
        //   }
        // },
        component: () => import("@/views/Main.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  }
]

export { routes }
