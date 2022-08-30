import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import HeaderGallery from './components/HeaderGallery.vue'
import PicturesSearch from './components/PicturesSearch.vue'


library.add(fasHeart, farHeart)

createApp(App)
.use(VueAxios, axios)
.component('font-awesome-icon', FontAwesomeIcon)
.component('HeaderGallery',HeaderGallery)
.component('PicturesSearch',PicturesSearch)
.mount('#app')
