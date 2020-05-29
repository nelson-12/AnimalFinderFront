<template>
<div>
 <b-card no-body class="overflow-hidden text-center login-card">
    <b-row no-gutters>
        <b-col md="6">
            <b-card-img src="https://i.picsum.photos/id/783/400/400.jpg?grayscale" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6"  class="login-card-right">
            <b-card-body  class="title" title="Cadastrar">
                <b-form @submit.prevent="signup" >
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
                            placeholder="exemplo@exemplo.com"
                            v-model="email"
                            type="email"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="phone"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="(99)9999-9999"
                            v-model="phone_number"
                            type="tel"
                            maxlength="15"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                    <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="lock-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Senha"
                            v-model="password"
                            type="password"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>

                     <b-input-group class="mb-2">
                        <b-input-group-prepend is-text>
                            <b-icon icon="lock-fill"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input
                            placeholder="Repitir Senha"
                            v-model="password_confirmation"
                            type="password"
                            style="background-color: whitesmoke"
                            required
                            ></b-form-input>
                    </b-input-group>
                    <b-button block pill  type="submit" variant="primary">Cadastrar</b-button>
                </b-form>
            </b-card-body>
        </b-col>
    </b-row>
 </b-card>
</div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      phone_number: '',
      name: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, phone_number: this.phone_number, name: this.name, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }

      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    }
  }
}
</script>
<style scoped>
    .login-card{
        position: relative;
        margin: auto;
        margin-top:2%;
        max-width: 60%;
    }
    .login-card-right{
        padding-top:2%;
        background-color: whitesmoke;
    }
    .title{
        color:black;
        font-weight: 500;
        font-family: verdana;
        padding-bottom: 1%;
    }
</style>
