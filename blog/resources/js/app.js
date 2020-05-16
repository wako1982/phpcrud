
require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('agregar', require('./components/AgregarNotaComponent.vue').default);
Vue.component('update', require('./components/UpdateTareaComponent.vue').default);
Vue.component('ultimo', require('./components/UscarNotaComponent.vue').default);






const app = new Vue({
    el: '#app',
});
