<template>
<div>
 <b-card no-body class="overflow-hidden text-center login-card">
    <b-row no-gutters>
        <b-col md="6">
            <b-card-img src="https://i.picsum.photos/id/237/400/400.jpg?grayscale" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6"  class="login-card-right">
            <b-card-body  class="title" title="Login">
                <b-form @submit.prevent="signin" >
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
                    <b-button block pill  type="submit" variant="primary">Login</b-button>
                    <b-button block pill  to="/signup" variant="success">Cadastro</b-button>
                </b-form>
            </b-card-body>
        </b-col>
    </b-row>
 </b-card>
</div>
</template>
<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
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
        padding-top:10%;
        background-color: whitesmoke;
    }
    .title{
        color:black;
        font-weight: 500;
        font-family: verdana;
        padding-bottom: 1%;
    }
</style>
