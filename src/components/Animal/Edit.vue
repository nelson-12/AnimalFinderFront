<template>
<div>
    <b-card class="add-card add-card-left text-center" img-src="https://i.picsum.photos/id/1025/400/400.jpg?grayscale" img-alt="Card image" img-right>
      <b-card-body class="title" title="Cadastre seu Animal">
        <b-form @submit.prevent="createItem" >
                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="person-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Nome"
                            v-model="name"
                            type="text"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="envelope-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Idade"
                            v-model="age"
                            type="text"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="building"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Estado Desaparecimetento"
                            v-model="state"
                            type="text"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="building"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Cidade Desaparecimetento"
                            v-model="city"
                            type="text"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                     <b-form-textarea
                        id="textarea-default"
                        placeholder="extra"
                        v-model="extra_information"
                        style="background-color: whitesmoke"
                    ></b-form-textarea>

                    <b-form-select
                    v-model="status"
                    :options="options"
                    class="mb-3"
                    value-field="item"
                    text-field="name"
                    disabled-field="notEnabled"
                    ></b-form-select>


                    <b-button block pill  type="submit" variant="primary">Editar</b-button>

                    <b-button block pill @click="remove" variant="danger">Deletar</b-button>
                </b-form>
        </b-card-body>
    </b-card>
</div>
</template>
<script>
export default {
  name: 'Add',
  data () {
    return {
      id: '',
      name: '',
      age: '',
      state: '',
      city: '',
      extra_information: '',
      photo: null,
      status: '',
      selected: this.status,
       options: [
           
          { item: '1', name: 'Perdido' },
          { item: '2', name: 'Comunicado' },
          { item: '3', name: 'Encontrado' }
        ]
    }
  },
  created () {  
    if (!localStorage.signedIn) {
      this.$router.replace('/signin')
    }
    this.$http.plain.get("api/v1/animal/"+this.$route.params.id)
        .then(response => {this.monted(response.data)})
        .catch(error => this.signinFailed(error)) 

  },
  methods: {
    createItem: function () {
        const params = {
            'name': this.name,
            'age': this.age,
            'state': this.state,
            'city': this.city,
            'extra_information': this.extra_information,
            'status': this.status,
            'photo': this.photo
        }
        let formData = new FormData()
        Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
        )
        this.$http.secured.put("/api/v1/animal/"+this.id, formData)
            .then(this.$router.replace('/animal/index'))
    },
    monted: function(animal){
        this.id = animal.id;
        this.name = animal.name;
        this.age = animal.age;
        this.state = animal.state;
        this.city = animal.city;
        this.extra_information = animal.extra_information;
        this.status = animal.status;
    },
    remove: function(){
        this.$http.secured.delete("/api/v1/animal/"+this.id)
        .then(response => {
           this.$router.replace('/animal/index') 
        })
        .catch(error => this.setError(error, 'Cannot delete animal'))
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
