<script>
import { required, email } from "vuelidate/lib/validators";

/**
 * Forgot Password component
 */
export default {
  layout: "auth",
  head() {
    return {
      title: `${this.title} | Cuarderno del Apicultor`,
    };
  },
  data() {
    return {
      email: "",
      submitted: false,
      error: null,
      title: "Restablecer Password",
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
      email,
    },
  },
  methods: {
    // Try to register the user in with the email, fullname
    // and password they provided.
    async tryToReset() {
  this.submitted = true;
  this.$v.$touch();

  if (this.$v.$invalid) {
    return;
  } else {
    try {
      // Enviar solicitud a Strapi para restablecer la contraseña
      await this.$axios.$post(this.$config.CMS_API_URL+'/api/auth/forgot-password', {
        email: this.email, // El email del usuario
      });

      // Mostrar un mensaje de éxito o redirigir al usuario
      // Por ejemplo, podrías mostrar un mensaje de que el email fue enviado
      // o cambiar a una página de confirmación
      console.log('Email de restablecimiento enviado.');
    } catch (e) {
      // Manejar errores, por ejemplo, mostrar un mensaje si el email no existe
      console.log('Error al enviar el email: ', e);
    }
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
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-5">
            <div>
              <nuxt-link to="/" class="mb-5 d-block auth-logo">
                <img src="~/assets/images/logo-dark.png" alt height="22" class="logo logo-dark" />
                <img src="~/assets/images/logo-light.png" alt height="22" class="logo logo-light" />
              </nuxt-link>
              <div class="card">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Recuperar Contraseña</h5>
                  </div>
                  <div class="p-2 mt-4">
                    <div class="alert alert-success text-center mb-4" role="alert">
                      Ingresa tu correo, si pertenece a una cuenta registrada, recibirás un correo con instrucciones!
                    </div>
                    <form @submit.prevent="tryToReset">
                      <div class="mb-3">
                        <label for="useremail">Email</label>
                        <input type="email" v-model="email" class="form-control" id="useremail" placeholder="Enter email"
                          :class="{
                            'is-invalid': submitted && $v.email.$error,
                          }" />
                        <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                          <span v-if="!$v.email.required">Email es requerido.</span>
                          <span v-if="!$v.email.email">PPor favor Ingresa un evail.</span>
                        </div>
                      </div>
                      <div class="form-group row mb-0">
                        <div class="col-12 text-end">
                          <button class="btn btn-primary w-sm" type="submit">
                            Reset
                          </button>
                        </div>
                      </div>
                      <div class="mt-4 text-center">
                        <p class="mb-0">
                          ya recordaste ?
                          <nuxt-link to="/account/login" class="fw-medium text-primary">ir a Login</nuxt-link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
                <!-- end card-body -->
              </div>
              <!-- end card -->

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
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss" module></style>
