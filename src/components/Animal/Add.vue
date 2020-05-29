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

                    <b-form-file id="file-small"  v-model="photo" size="sm"></b-form-file>

                    <b-button block pill  type="submit" variant="primary">Cadastrar</b-button>
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
      name: '',
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
    } 
  },
  methods: {
    createItem: function () {
        const params = {
            'name': this.name,
            'age': this.age,
            'state': this.state,
            'city': this.city,
            'extra_information': this.extra_information,
            'status': 1,
            'photo': this.photo
        }
        let formData = new FormData()
        Object.entries(params).forEach(
        ([key, value]) => formData.append(key, value)
        )
        this.$http.secured.post('/api/v1/animal', formData)
        .then(response => {
           this.$router.replace('/animal/index') 
        })
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
