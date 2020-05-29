<template>
  <div class="animated fadeIn ">
    <b-card-group  deck >
       <b-container>
    <b-row>
      <b-col cols="12" sm="4" class="my-1"  v-for="(animal,index) in currentPageAnimals" :key="index">
        <b-card 
                :img-src="'http://127.0.0.1:3000'+animal.photo_url"
                img-alt="Img"
                img-top >
            <h4 class="card-title">
                Nome : {{animal.name}}
            </h4>
            <p class="card-text">
              Desaparecimento :
              {{animal.city}}/{{animal.state}}
            </p>
            <p class="card-text">
                Idade: {{animal.age}}
            </p>
            <div slot="footer">
               <router-link :to="'/animal/encontrei/'+animal.id">Veja Mais</router-link>
            </div>
        </b-card>
           </b-col>
    </b-row>
          </b-container>
    </b-card-group>
    <div class="card-pagination">
        <div class="page-index" v-for="i in nbPages" :key="i"  @click="goto(i)" :class={active:currentPage(i)}></div>
    </div>
  </div>
 

</template>

<script>
export default {
  data: function () {
    return {
      animals: [],
      paginatedAnimals:[],
      nbPages:0,
      nbRowPerPage:3,
      currentPageIndex:0,
      Api_url: '',
      modalOpen: false
    }
  },
  created () {
     this.$http.plain.get('/api/v1/animal')
        .then(response => {this.animals = response.data})
        .catch(error => this.signinFailed(error))
  },
  computed: {
      formattedAnimals() {
          return this.animals.reduce((c, n, i) => {
              if (i % 4 === 0) c.push([]);
              c[c.length - 1].push(n);
              return c;
          }, []);
      },
      currentPageAnimals(){
         this.createPages();

        return this.paginatedAnimals[this.currentPageIndex];
      }
  },
  methods:{
    currentPage(i){
        return i-1===this.currentPageIndex;
    },
      createPages() {
      
      let lengthAll = Object.keys(this.animals).length;
      this.nbPages = 0;
       for (let i = 0; i < lengthAll; i = i + this.nbRowPerPage) {
        this.paginatedAnimals[this.nbPages] = this.animals.slice(
          i,
          i + this.nbRowPerPage
        );
        this.nbPages++;
      }
      
    },
    goto(i){
    
      this.currentPageIndex=i-1;
    },
    show(animal){
      console.log(animal); 
    }
  }
}
</script>
<style>
.card-pagination{
  display:flex;
  align-items: center;
  justify-content: center;
  padding:20px;
}
.page-index{
  margin-left:10px;
  width:15px;
  height:15px;
  border-radius:15px;
  background:#007bff
}
.active{
   width:20px;
  height:20px;
  border-radius:20px;
}
</style>