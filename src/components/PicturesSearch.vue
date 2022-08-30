<template>
	<div>
		<div class="row mt-2">
			<div class="col-12 col-md-3 mb-3">
				<input type="text" v-model="search" class="form-control" placeholder="Buscar imágenes por Fotógrafo" @keyup="searchHot()">
			</div>
		</div>
		<div class="row">
			<!-- Gallery item -->
			<div v-for="(image,index) in images" :key="index" class="col-xl-3 col-lg-4 col-md-6 mb-4">
				<div class="bg-white rounded shadow-sm">
					<img :src="image.src.portrait" alt="" class="img-fluid card-img-top">
					<div class="p-4">
						<h5>
							<a 
							:href="image.photographer_url" 
							target="_blank" 
							class="text-dark">{{image.photographer}}</a>
						</h5>
						<div class="d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4">
							<a 
							:href="image.photographer_url" 
							target="_blank">
							<p class="small mb-0">
								<i class="fa fa-picture-o mr-2"></i>
								<span class="font-weight-bold">Album</span>
							</p></a>
							<font-awesome-icon 
							icon="fa-solid fa-heart" 
							:class="{ 'icon-color': image.fav }"
							@click="image.fav=!image.fav;favSelect(image.fav,image.id)"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'PicturesSearch',
    data(){            
      return {
        images:[],
        fav:[],
        orgImgs:[]
      }
    },
    mounted () {
      this.axios
        .get(
          'https://api.pexels.com/v1/curated?page=1&per_page=24', 
          { headers:{
            "Authorization":'563492ad6f917000010000016515437d3ab9412e8ab56be184a3c504'
            }
          }
        )
        .then(response => {
          this.images=response.data.photos
          this.images.forEach((element)=>{
            if(localStorage.getItem('Fav'+element.id)=='true')
              element.fav=true
            else
              element.fav=false
          });
          this.orgImgs=this.images
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
      favSelect: function (favImage,id) {
          localStorage.setItem('Fav'+id, favImage);
      },
      searchHot: function () {
        var filter=this.search.toLowerCase()
        var filteredImages = this.orgImgs.filter((element)=>{
          return element.photographer.toLowerCase().indexOf(filter) > -1;
        });
        this.images=filteredImages
        return this.images
      }
    }
  }
</script>


<style scoped>
  body {
    background: #f4f4f4;
  }
  .heart {
    font-size: 25px;
    color:red;
  }
  .i-am-active {
    color: orange;
  }
  .icon-color{
    color: red;
  }
</style>