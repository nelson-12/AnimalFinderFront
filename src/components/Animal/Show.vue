<template>
  <b-card no-body class="overflow-hidden text-center login-card">
    <b-row no-gutters>
        <b-col md="6">
            <b-card-img :src="'http://127.0.0.1:3000/'+ animals.photo_url" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6"  class="login-card-right">
            <b-card-body  class="title" title="Me Viram">
                <b-card-text>
                  <p>Oi aqui é o {{animals.name}} </p>
                </b-card-text>
                 <b-card-text>
                  O  {{animals.name_finder}} acha que me viu 
                </b-card-text>
                 <b-card-text>
                  Telefone  para o contato : {{animals.phone_number_finder}}
                </b-card-text>
            </b-card-body>
        </b-col>
    </b-row>
 </b-card>
</template>
<script>
export default {
  data: function () {
    return {
      animals: '',
      name_finder:'',
      phone_number_finder: ''
    }
  },
  created () {
     this.$http.plain.get("api/v1/animal/"+this.$route.params.id)
        .then(response => {this.animals = response.data})
        .catch(error => this.signinFailed(error))
       
  },
  methods:{
   comunication(){
      this.$http.plain.patch(`/api/v1/animal/${this.animals.id}`, { name_finder: this.name_finder, phone_number_finder: this.phone_number_finder, status: 2 })
        .catch(error => this.setError(error, 'Cannot update artist'))
      }
    }
  
}
</script>
<style scoped>
    .login-card{
        position: relative;
        margin: auto;
        margin-top:1%;
        max-width: 60%;
    }
    .login-card-right{
        padding-top:5%;
        background-color: whitesmoke;
    }
    .title{
        color:black;
        font-weight: 500;
        font-family: verdana;
    }
</style>
