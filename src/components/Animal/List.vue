<template>
<div>
    <b-card-group deck>
      <b-container>
        <b-row style="padding-top:5%">
           <b-card header="Lista dos seus animais cadastrados(Animal/Status)">
                <b-list-group>
                    <b-list-group-item v-for="animal in animals" :to="'/animal/edit/'+animal.id">{{animal.name}} - {{status(animal.status)}}</b-list-group-item>
                </b-list-group>
            </b-card>

           <b-card header="Lista animais comunicado">
                <b-list-group>
                    <b-list-group-item v-for="animal in comunicationList" :to="'/animal/show/'+animal.id">{{animal.name}} - {{status(animal.status)}}</b-list-group-item>
                </b-list-group>
            </b-card>
        </b-row>
      </b-container>    
    </b-card-group>
</div>
</template>
<script>
export default {
  name: 'Lists',
  data () {
    return {
      animals: [],
      age: '',
      state: '',
      city: '',
      extra_information: '',
      photo: null
    }
  },
  created () {  
    if (!localStorage.signedIn) {
      this.$router.replace('/signin')
    }else{
        this.$http.secured.get('/api/v1/animal/list')
          .then(response => {this.animals = response.data})
          .catch(error => this.signinFailed(error))
    }
  },
  computed:{
      comunicationList : function(){
        return this.animals.filter(function (animal) {
            return animal.status === 2
        })
    }
  },
  methods: {
    status: function (status) {
        if(status === 1){
            return "Perdido";
        }else if(status === 2){
            return "Comunicado";
        }else{
            return "Encontrado";
        }
    }
  }
}
</script>
<style scoped>
    .add-card{
        position: relative;
        margin: auto;
        margin-top:2%;
        max-width: 60%;
        background-color: whitesmoke;
    }
    .title{
        color:black;
        font-weight: 500;
        font-family: verdana;
        padding-bottom: 1%;
    }
</style>
