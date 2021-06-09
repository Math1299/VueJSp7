<template>
    <v-app id="user">
        <v-container class="user d-flex  justify-content-center align-items-center">
            <div class="button d-flex justify-content-around">
                <v-btn type="button" class="btn btn-dark" @click="component = 'signup'">S'inscrire</v-btn>
                <v-btn type="button" class="btn btn-dark" @click="component = 'login'">Se connecter</v-btn>
            </div>

            <component v-bind:is="component"></component>
        </v-container>
    </v-app>
</template>

<script>
import Signup from "./User/Signup.vue";
import Login from "./User/Login.vue";

export default {
    name: "User",
    data() {
        return {
            component: "",
        };
    },

    components: {
        login: Login,
        signup: Signup,
    },
};
</script>

<style lang="scss">
#user {
    width: 100%;
    height: 100vh;
    background: no-repeat center top/90% url("../assets/icon-left-font-monochrome-black.png");
    display: flex;
    flex-direction: row;
}
.user {
    width: 100%;
    height: 50vh;
    .button {
        width: 100%;
    }
}
</style>
