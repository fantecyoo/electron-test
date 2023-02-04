// import store from "store/index.js"

// let permission = {
//   inserted(el, binding) {
//     let permissions = store.state
//     let hasPer = permissions.includes(binding.value)
//     if (!hasPer) {
//       el.style.display = "none"
//     }
//   }
// }

// let log = {
//   inserted(el, binding) {
//     el.addEventListener("click", () => {
//       console.log(binding.value)
//     })
//   }
// }

let autoblur = {
  mounted(el, binding) {
    el.addEventListener("click", () => {
      el.blur()
    })
  }
}

let directives = { autoblur }

function install(Vue) {
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}

export default { install }
