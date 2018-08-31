import Vue from '/res/vendor/vue.esm.browser.js';
import httpVueLoader from '/res/vendor/httpVueLoader2.js';

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;

Vue.use(httpVueLoader);


function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}
function injectApp({elemId,target}) {
  const iElem = document.createElement('div');
  iElem.id = elemId;
  // target.appendChild(iElem);
  // Prepend it
  // target.insertBefore(iElem, target.firstChild);
  insertAfter(iElem, target);
  return iElem;
}
let self
// let tDiv = injectApp('one',document.getElementsByTagName('body')[0]);
// tDiv.textContent = 'hiya';
new Vue({
        components: {
            'my-component': 'url:/res/components/my-component.vue'
        },
    data: {
       title: 'gt',
        vueVersion: Vue.version
    },
  template: `
    <section id="pippin">
      <h1>{{title}}</h1>
      <p>vue version:  {{vueVersion}}</p>
      <my-component></my-component>
  </section>`,
  methods: {
    bar: function () {
      console.log('bar')
      self.message = 'hello again from main'
    }
  },
  created(){
    console.log('dana created')
    self=this
    // self.bar() // -> "bar"
  },
  mounted () {
    console.log('dana mounted',uid)
  }
}).$mount(
  (
    injectApp({
      elemId:'one',
      target: document.getElementsByTagName('header')[0]
    })
    )

);
