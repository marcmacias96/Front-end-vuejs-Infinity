<template>
    <div class="container p-5">
        <form action="" method="POST" @submit.prevent="login">
            <div class="form-group">
                <input class="form-control" type="email" v-model="email" name="email" id="email" placeholder="Email">
            </div>
            <div class="form-group">
                <input class="form-control" type="password" v-model="password"  name="password" id="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" >Login </button>
            </div>
        </form>

    </div> 
</template>

<script>
import gql from  'graphql-tag'
import { onLogin } from '../vue-apollo'

export default {
    data () {
        return {
            email : '',
            password : ''
        }
    },
    methods: {
        login() {
            this.$apollo.mutate({
            // Query
            mutation: gql`mutation ($input: SignInInput! ) {
                signIn (input : $input) {
                    token
                }
            }`,
            // Parameters
            variables: {
                input : {
                    email : this.email,
                    password : this.password
                }  
            },
            }).then((data) => {
            // Result
            console.log(data)
            
            onLogin(this.$apollo.provider.defaultClient, data.data.signIn.token)
            this.$router.push('./Index')
            }).catch((error) => {
            console.error(error)
            console.log();
            
            })
        },
},
}
</script>
