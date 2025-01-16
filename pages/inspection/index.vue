<script>
import {
  FormWizard,
  TabContent
} from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { required } from "vuelidate/lib/validators";
import { createToastInterface } from "vue-toastification";


export default {
  middleware: ['authenticated'],
  head() {
    return {
      title: `Revision de apiarios y/o colmenas`
    };
  },
  components: {
    DatePicker,
    FormWizard,
    TabContent,
  },
  data() {
    return {
      title: "Form Wizard",
      newtask: {
        slug: "",
        usuarioId: this.$auth.user.id,
        fecha: "",
        totalPanales: "",
        panalesCubiertos: "",
        situacion: "",
        reservas: "",
        actividad: "",
        proximaVisita: "",
        nombreApiario: "",
        nombreResponsable: "",
        codigoApiario: "",
        codigoUbicacion: "",
        ubicacion: "",
        tipoManejo: "",
        acepta: false,
      },

      reservas: [
        { name: "Buenas" },
        { name: "Regular" },
        { name: "Deficientes" }
      ],
      situacion: [
        { name: "Normales" },
        { name: "Enfermas" },
        { name: "Huerfanas" },
        { name: "Enjambradas" }
      ],
      selectedSituacion: "",
      selectedReservas: "",
      submitted: false,
      authError: null,
      isAuthError: false,

      items: {
        text: "REVISION DE APIARIOS Y/O COLMENAS",
        href: "/"
      },
    };
  },

  validations: {
    newtask: {
      fecha: {
        required,
      },
      actividad: {
        required
      }
    }
  },

  methods: {
    async sendData(e) {
      this.submitted = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        const toast = createToastInterface(this.toastOptionsError);
        toast.warning('Debes completar los campos requeridos');
        return;
      } else {
        if (this.newtask.acepta) {

          const mytoken = JSON.parse(localStorage.getItem("jwt"));
          this.newtask.slug = this.makeid(6);
          this.newtask.usuarioId = this.$auth.user.id;

          if (this.selectedSituacion && this.selectedSituacion.name) {
            this.newtask.situacion = this.selectedSituacion.name;
          }

          if (this.selectedReservas && this.selectedReservas.name) {
            this.newtask.reservas = this.selectedReservas.name;
          }
          await this.$apolloHelpers.onLogin(mytoken.token);
          await this.$apollo
            .mutate({
              context: {
                headers: {
                  Authorization: mytoken ? `Bearer ${mytoken}` : "",
                },
              },
              mutation: require("../../graphql/createInspection.gql"),
              variables: this.newtask,
            })
            .then((data) => {
              const toast = createToastInterface(this.toastOptions);
              toast.success("Datos registrados");

              this.$store.dispatch("getInspections");
              this.resetWizard();
            })
            .catch((error) => {

              const toast = createToastInterface(this.toastOptionsError);
              toast.error('Algo salió mal: ' + error.message);
            });
        } else {
          // Mostrar notificación de error al usuario
          const toast = createToastInterface(this.toastOptionsError);
          toast.info('Acepta la información');
        }
      }
    },
    resetWizard() {
      if (this.$refs.wizard) {
        this.$refs.wizard.reset();
        this.$refs.wizard.activeTabIndex = 0;

        // Resetear las validaciones
        this.$v.$reset();

        // Resetear el modelo de datos
        this.newtask = {
          slug: "",
          usuarioId: this.$auth.user.id,
          fecha: "",
          totalPanales: "",
          panalesCubiertos: "",
          situacion: "",
          reservas: "",
          actividad: "",
          proximaVisita: "",
          nombreApiario: "",
          nombreResponsable: "",
          codigoApiario: "",
          codigoUbicacion: "",
          ubicacion: "",
          tipoManejo: "",
          acepta: false,
        },

          this.selectedSituacion = "",
          this.selectedReservas = "";
      }
    },

    tabChanged() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    makeid(length) {
      try {
        var result = "";
        var characters = "0123456789abcdefghijklmnopqrstuvwxyz";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      } catch (error) {
        console.log(error);
      }
    },

  },

};
</script>
<template>
  <div>
    <PageHeader :title="items.text" />
    <div>
      <div class="col-xl-12">
        <div class="card">
          <div class="custom-background card-body">
            <h4 class="card-title">Ingresa información</h4>
            <form-wizard @on-change="tabChanged" @on-complete="sendData" ref="wizard" color="#d38c34 ">
              <tab-content icon="mdi mdi-account-circle">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">


                      <div class="col-md-4">
                        <label class="col-form-label">Fecha:</label>
                        <date-picker v-model="newtask.fecha" :first-day-of-week="1" lang="en"
                          :class="{ 'is-invalid': submitted && $v.newtask.fecha.$error }"></date-picker>
                        <div v-if="submitted && !$v.newtask.fecha.required" class="invalid-feedback">
                          Fecha es requerida
                        </div>
                      </div>


                      <label class="mt-3 text-center  col-form-label"><b>PANALES CUBIERTOS POR ABEJAS</b> </label>
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-form-label">Total de Panales:</label>
                          <input v-model="newtask.totalPanales" placeholder="#" type="number" class="form-control" />
                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">Cubiertos por abejas:</label>
                          <input v-model="newtask.panalesCubiertos" placeholder="#" type="number" class="form-control" />
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 form-group">
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-form-label">Situación Interna:</label>
                          <multiselect v-model="selectedSituacion" :options="situacion" :close-on-select="true"
                            :clear-on-select="false" :hide-selected="false" :preserve-search="false"
                            placeholder="Elije una opción" label="name" track-by="name" :preselect-first="false">
                          </multiselect>
                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">Reservas de alimentos:</label>
                          <multiselect v-model="selectedReservas" :options="reservas" :close-on-select="true"
                            :clear-on-select="false" :hide-selected="false" :preserve-search="false"
                            placeholder="Elije una opción" label="name" track-by="name" :preselect-first="false">
                          </multiselect>

                        </div>
                      </div>
                    </div>
                    <div class="mt-3 form-group">
                      <label class="col-form-label">Actividad Realizada:</label>
                      <div class="col-md-9">
                        <textarea v-model="newtask.actividad" class="form-control"
                          :class="{ 'is-invalid': submitted && $v.newtask.actividad.$error }"></textarea>
                        <div v-if="submitted && !$v.newtask.actividad.required" class="invalid-feedback">
                          La actividad es requerida
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">En próxima visita:</label>
                      <div class="col-md-9">
                        <textarea v-model="newtask.proximaVisita" class="form-control"></textarea>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>

              <tab-content icon="mdi mdi-face-profile">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="name">Nombre del Apiario</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.nombreApiario" class="form-control" value="" />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="surname">Nombre del Responsable</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.nombreResponsable" class="form-control" value="" />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="surname">Código del apiario</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.codigoApiario" class="form-control" value="" />
                      </div>
                    </div>
                  </div>
                  <!-- end col-md-6 -->

                  <div class="col-md-6">
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="surname">Código de ubicación</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.codigoUbicacion" class="form-control" value="n" />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="surname">Ubicación</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.ubicacion" class="form-control" value="" />
                      </div>
                    </div>
                    <div class="form-group row mb-3">
                      <label class="col-md-5 col-form-label" for="surname">Tipo de manejo</label>
                      <div class="col-md-7">
                        <input type="text" v-model="newtask.tipoManejo" class="form-control" value="" />
                      </div>
                    </div>
                  </div>
                  <!-- end col-md-6 -->
                </div>
                <!-- end row -->
              </tab-content>

              <tab-content icon="mdi mdi-checkbox-marked-circle-outline">
                <div class="row">
                  <div class="col-12">
                    <div class="text-center">
                      <h2 class="mt-0">
                        <i class="mdi mdi-check-all"></i>
                      </h2>
                      <h3 class="mt-0">¡Muchas Gracias!</h3>

                      <p class="w-75 mb-2 mx-auto">
                        La información proporcionada será parte integral de tu historial de actividades, contribuyendo al
                        crecimiento de tu apiario. A continuación se presenta un breve resumen de tus
                        respuestas:
                      </p>

                      <!-- Aquí puedes agregar un componente o div para mostrar el resumen de las respuestas -->
                      <div class="resumen-respuestas w-75 mx-auto">
                        <p><strong>Actividad Realizada:</strong> {{ newtask.actividad }}</p>
                        <p>{{ newtask.panalesCubiertos }} panales Cubiertos por Abejas de {{ newtask.totalPanales }}
                          totales que están {{ selectedSituacion.name }} y con reservas {{ selectedReservas.name }} </p>
                        <!-- Agrega más líneas similares para otros campos del formulario si es necesario -->
                      </div>

                      <div class="mb-3">
                        <div class="custom-control custom-checkbox">
                          <input v-model="newtask.acepta" id="customCheck1" type="checkbox"
                            class="custom-control-input" />
                          <label class="custom-control-label" for="customCheck1">Acepto la información</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </tab-content>

            </form-wizard>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <div>
      <div class="col-xl-12">
        <div style="padding: 10px;" class="custom-background card">
          <InspectionsTable />
        </div>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>




<style>
.custom-background {
  background-color: #9ea7be;
  /* Cambia este valor al color que desees */
}
</style>
