<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Register component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `Register | Cuaderno del Apicultor`,
    };
  },
  data() {
    return {
      infoDeveloper: {
        developer: "ISCorporación",
        year: "",
        url: "https://iscr.com",
      },
      user: {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      submitted: false,
      tryingToRegister: false,
      isRegisterError: false,
      title: "Register",
    };
  },
  validations: {
    user: {
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
      confirmpassword: {
        required,
      },
    },
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

    async tryToRegisterIn() {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      const userData = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };

      if (this.user.password !== this.user.confirmpassword) {
        // Manejar el error si las contraseñas no coinciden
        console.error("Las contraseñas no coinciden");
        return;
      }

      try {
        let response = await this.$axios.post(this.$config.CMS_API_URL+'/api/auth/local/register', userData);

        // Aquí podrías manejar la respuesta, como guardar el JWT, redirigir al usuario, etc.
      } catch (error) {
        console.error("Error en el registro: ", error);
      }
    }

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
                  <h5 class="text-primary">Registrar una Cuenta</h5>
                  <p class="text-muted">Crea una cuenta gratuita en Corona Dorada.</p>
                </div>
                <div class="p-2 mt-4">
                  <div v-if="notification.message" :class="'alert ' + notification.type">
                    {{ notification.message }}
                  </div>

                  <b-form @submit.prevent="tryToRegisterIn">
                    <b-form-group id="email-group" label="Nombre de Usuario" label-for="username" class="mb-3">
                      <b-form-input id="username" v-model="user.username" type="text" placeholder="Tu nombre de usuario"
                        :class="{
                          'is-invalid': submitted && $v.user.username.$error,
                        }"></b-form-input>
                      <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">
                        Nombre de usuario es requerido.
                      </div>
                    </b-form-group>

                    <b-form-group id="fullname-group" label="Email" label-for="email" class="mb-3">
                      <b-form-input id="email" v-model="user.email" type="email" placeholder="Tu email" :class="{
                        'is-invalid': submitted && $v.user.email.$error,
                      }"></b-form-input>
                      <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                        <span v-if="!$v.user.email.required">Email es requerido.</span>
                        <span v-if="!$v.user.email.email">Ingrese un email valido.</span>
                      </div>
                    </b-form-group>

                    <b-form-group id="password-group" label="Contraseña" label-for="password" class="mb-3">
                      <b-form-input id="password" v-model="user.password" type="password"
                        placeholder="Elije una contraseña" :class="{
                          'is-invalid': submitted && $v.user.password.$error,
                        }"></b-form-input>
                      <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">
                        Contraseña es requerida.
                      </div>
                    </b-form-group>
                    <b-form-group id="password-group" label="Confirmar Contraseña" label-for="password" class="mb-3">
                      <b-form-input id="confirmpassword" v-model="user.confirmpassword" type="password"
                        placeholder="Confirma la contraseña" :class="{
                          'is-invalid': submitted && $v.user.confirmpassword.$error,
                        }"></b-form-input>
                      <div v-if="submitted && !$v.user.confirmpassword.required" class="invalid-feedback">
                        Contraseña es requerida.
                      </div>
                    </b-form-group>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="auth-terms-condition-check" />
                      <label class="form-check-label" for="auth-terms-condition-check">Acepto
                        <a href="javascript: void(0);" class="text-dark">Términos y condiciones</a></label>
                    </div>
                    <div class="mt-3 text-end">
                      <b-button type="submit" variant="primary" class="w-sm">Registrarme</b-button>
                    </div>


                    <div class="mt-4 text-center">
                      <p class="text-muted mb-0">
                        Ya tienes una cuenta ?
                        <nuxt-link to="/account/login" class="fw-medium text-primary">Iniciar Sesión</nuxt-link>
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
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
