<template>
  <b-card no-body class="overflow-hidden text-center login-card">
    <b-row no-gutters>
        <b-col md="6">
            <b-card-img :src="'http://127.0.0.1:3000/'+ animals.photo_url" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6"  class="login-card-right">
            <b-card-body  class="title" title="Você meu viu ?">
                <b-card-text>
                  <p>Eu sou {{animals.name}} tenho {{animals.age}} anos</p>
                </b-card-text>
                <b-card-text>
                  Eu Sumi em : {{animals.city}}/{{animals.state}}
                </b-card-text>
                <b-card-text>
                  Extra : {{animals.extra_information}}
                </b-card-text>
                 <b-form @submit.prevent="comunication" >
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Nome"
                            type="text"
                             v-model="name_finder"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="phone"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Telefone"
                            type="text"
                            v-model="phone_number_finder"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>
                   <b-button block pill  type="submit" variant="primary">Comunicar</b-button>
                </b-form>
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
        .then(this.$router.replace('/'))
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
