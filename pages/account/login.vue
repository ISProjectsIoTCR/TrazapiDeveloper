<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { required, email } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  middleware: "notAuthenticated",
  layout: "auth",
  data() {
    return {


      email: "",
      password: "",

      submitted: false,
      authError: null,
      isAuthError: false,

      infoDeveloper: {
        developer: "ISCorporación",
        year: "",
        url: "https://iscr.com",
      },
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  methods: {
    async tryToLogIn() {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      } else {
        try {
          let response = await this.$auth.loginWith("local", {
            data: {
              identifier: this.email,
              password: this.password,
            },
          });
          const jwt = {
            token: response.data.jwt,
            userData: response.data.user,
          };

          //token to de store - token a la tienda
          this.$store.commit("setToken", jwt);

          //set jwt object in localStorage - Grabamos el token en localStorage
          localStorage.setItem("jwt", JSON.stringify(jwt));
          this.$router.push("/dashboard");
        } catch (e) {
          //this.error = e.response.data.message[0].messages[0].message;
          console.log("error: " + e);
        }
      }
    },


  },

};
</script>

<template>
  <div>
    <div class="home-btn d-none d-sm-block">
      <nuxt-link to="/" class="text-dark">
        <i class="mdi mdi-home-variant h2"></i>
      </nuxt-link>
    </div>
    <div class="account-pages my-5 pt-sm-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img src="~/assets/images/logo-dark.png" alt height="22" class="logo logo-dark" />
                <img src="~/assets/images/logo-light.png" alt height="22" class="logo logo-light" />
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card">
              <div class="card-body p-4">
                <div class="text-center mt-2">
                  <h5 class="text-primary">Cuaderno del Apicultor!</h5>
                  <p class="text-muted">Inicia Sesión para continuar.</p>
                </div>
                <div class="p-2 mt-4">
                  <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{ authError }}</b-alert>

                  <div v-if="notification.message" :class="'alert ' + notification.type">
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToLogIn">
                    <b-form-group id="input-group-1" label="Email" label-for="input-1" class="mb-3">
                      <b-form-input id="input-1" v-model="email" type="text" placeholder="Tú correo"
                        :class="{ 'is-invalid': submitted && $v.email.$error }"></b-form-input>
                      <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                        <span v-if="!$v.email.required">El correo es requerido.</span>
                        <span v-if="!$v.email.email">Correo inválido.</span>
                      </div>
                    </b-form-group>

                    <b-form-group id="input-group-2" class="mb-3">
                      <div class="float-end">
                        <nuxt-link to="/account/forgot-password" class="text-muted">Olvidó la Constraseña?</nuxt-link>
                      </div>
                      <label for="input-2">Contraseña</label>
                      <b-form-input id="input-2" v-model="password" type="password" placeholder="Tú contraseña" :class="{
                        'is-invalid': submitted && $v.password.$error,
                      }"></b-form-input>
                      <div v-if="submitted && !$v.password.required" class="invalid-feedback">
                        Constraseña es requerida
                      </div>
                    </b-form-group>

                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm">Inicio Sesión</b-button>
                    </div>


                    <div class="mt-4 text-center">
                      <p class="mb-0">
                        Aún no tienes una cuenta?
                        <nuxt-link to="/account/register" class="fw-medium text-primary">Solicítala</nuxt-link>
                      </p>
                    </div>
                  </b-form>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->
            </div>
            <div class="mt-5 text-center">
              Made with <i class="fa fa-laptop text-dark"></i> and
              <i class="fa fa-coffee text-dark"></i>, by
              <a class="text-dark" :href="infoDeveloper.url" target="_blank">{{
                infoDeveloper.developer
              }}</a>
            </div>
            <!-- end row -->
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" module></style>
