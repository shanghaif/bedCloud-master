import LoadingVue from './loading.vue'
import Vue from 'vue'

const Loading = Vue.extend(LoadingVue)

export default {
  install: function (Vue) {
    Vue.directive('loading', {
      inserted: function (el, binding) {
        const loadingText = el.getAttribute('loading-text') || '正在加载...'
        const backgroundColor = el.getAttribute('loading-bgColor') || 'white'
        const parent = document.createElement('div')
        parent.style.position = 'relative'
        el.appendChild(parent)
        el.loading = new Loading({
          data: {
            text: loadingText,
            show: binding.value,
            backgroundColor
          }
        }).$mount(parent)
      },
      update: function (el, binding) {
        el.loading.show = binding.value
      }
    })
  }
}
