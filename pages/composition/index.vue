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
      title: `Composición del apiario`
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
        mes: "",
        cantidad: "",
        tipoColmena: "",
        muertas: "",
        huerfanas: "",
        nucleo: "",
        enjambre: "",
        otros: "",
        observaciones: "",
        nombreApiario: "",
        nombreResponsable: "",
        codigoApiario: "",
        codigoUbicacion: "",
        ubicacion: "",
        acepta: false,
        composicion: []
      },
      selectedTipoColmena: "",
      fields: [{
        CrecimientoVertical: '',
        Cantidad: '',
      }],
      tipocolmena: [
        { name: "Primera alza (1/C)" },
        { name: "Cámara de cría con 1 alza (2/C)" },
        { name: "Cámara de cría con 2 alzas (3/C)" },
        { name: "Cámara de cría con 3 alzas (4/C)" }
      ],

      submitted: false,
      authError: null,
      isAuthError: false,

      items: {
        text: "COMPOSICIÓN DEL APIARIO",
        href: "/"
      },


    };
  },
  validations: {
    newtask: {
      mes: {
        required,
      },
      nucleo: {
        required
      }

    },

  },

  watch: {
    fields: {
      deep: true,
      handler() {
        this.newtask.composicion = JSON.parse(JSON.stringify(this.fields));
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

          if (this.selectedTipoColmena && this.selectedTipoColmena.name) {
            this.newtask.tipoColmena = this.selectedTipoColmena.name;
          }


          await this.$apolloHelpers.onLogin(mytoken.token);
          await this.$apollo
            .mutate({
              context: {
                headers: {
                  Authorization: mytoken ? `Bearer ${mytoken}` : "",
                },
              },
              mutation: require("../../graphql/createComposition.gql"),
              variables: this.newtask,
            })
            .then((data) => {
              const toast = createToastInterface(this.toastOptions);
              toast.success("Datos registrados");

              this.$store.dispatch("getCompositions");

              this.resetWizard();  // Reinicia el wizard
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
          mes: "",
          tipoColmena: "",
          muertas: "",
          huerfanas: "",
          nucleo: "",
          enjambre: "",
          otros: "",
          observaciones: "",
          nombreApiario: "",
          nombreResponsable: "",
          codigoApiario: "",
          codigoUbicacion: "",
          ubicacion: "",
          acepta: false,
          composicion: []
        };
        this.fields = [{
          CrecimientoVertical: '',
          Cantidad: '',
        }];

        this.selectedTipoColmena = "";
      }
    },
    AddformData() {
      this.fields.push({
        CrecimientoVertical: '',
        Cantidad: '',
      });
    },

    deleteRow(index) {
      if (confirm("¿Estás seguro de que deseas eliminar este elemento?")) {
        this.fields.splice(index, 1);
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
    obtenerNombreMes(fechaCadena) {
      const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const fecha = new Date(fechaCadena);
      return meses[fecha.getMonth()];
    },
    updateCrecimientoVertical(field, selectedOption) {
      if (selectedOption && selectedOption.name) {
        this.$set(field, 'CrecimientoVertical', selectedOption.name);
      } else {
        this.$set(field, 'CrecimientoVertical', '');
      }
    }
  }
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
            <form-wizard @on-change="tabChanged" color="#d38c34" ref="wizard" @on-complete="sendData">
              <tab-content icon="mdi mdi-account-circle">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <div class="row">
                        <div class="col-12">
                          <h4 class="card-title mb-4">Ejemplo de Formulario Repetitivo</h4>
                          <form class="repeater" enctype="multipart/form-data">
                            <div>
                              <div v-for="(field, index) in fields" :key="index" class="row">
                                <div class="mb-3 col-lg-4">
                                  <label for="CrecimientoVertical">Crecimiento Vertical</label>
                                  <multiselect v-model="field.CrecimientoVertical"
                                    :options="tipocolmena.map(option => option.name)" :close-on-select="true"
                                    :clear-on-select="false" :hide-selected="false" :preserve-search="false"
                                    placeholder="Elije una opción" :preselect-first="false">
                                  </multiselect>
                                </div>
                                <div class="mb-3 col-lg-4">
                                  <label for="Cantidad">Cantidad</label>
                                  <input v-model="field.Cantidad" placeholder="#" type="number" class="form-control" />
                                </div>
                                <div class="col-lg-4 align-self-center d-flex">
                                  <button type="button" class="btn btn-success mt-3 mt-lg-0" style="margin-right: 5px;"
                                    @click="AddformData">Añadir</button>
                                  <button type="button" class="btn btn-primary btn-block ml-2"
                                    @click="deleteRow(index)">Eliminar</button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3 form-group">
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-form-label">Elije un mes:</label>
                          <date-picker v-model="newtask.mes" :type="'month'" :format="'MM/YYYY'" lang="en"
                            :class="{ 'is-invalid': submitted && $v.newtask.mes.$error }"></date-picker>
                          <div v-if="submitted && !$v.newtask.mes.required" class="invalid-feedback">
                            Mes es requerido
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">N° Colmenas Muertas:</label>
                          <input v-model="newtask.muertas" placeholder="#" type="number" class="form-control" />


                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">N° Colmenas Huérfanas:</label>
                          <input v-model="newtask.huerfanas" placeholder="#" type="number" class="form-control" />

                        </div>

                      </div>
                    </div>

                    <div class="mt-3 form-group">
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-form-label">Núcleo:</label>
                          <input v-model="newtask.nucleo" type="number" placeholder="#" class="form-control"
                            :class="{ 'is-invalid': submitted && $v.newtask.nucleo.$error }">
                          <div v-if="submitted && !$v.newtask.nucleo.required" class="invalid-feedback">
                            Información requerida
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">Enjambre:</label>
                          <input v-model="newtask.enjambre" placeholder="#" type="number" class="form-control">
                        </div>
                        <div class="col-md-4">
                          <label class="col-form-label">Otros:</label>
                          <input v-model="newtask.otros" class="form-control">
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-form-label">Observaciones:</label>
                      <div class="col-md-12">
                        <textarea v-model="newtask.observaciones" class="form-control"></textarea>
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
                        <p><strong>Crecimiento Vertical:</strong> {{ selectedTipoColmena.name }}</p>
                        <p>{{ newtask.muertas }} colmenas muertas y {{ newtask.huerfanas }}
                          huerfanas en el mes de {{ obtenerNombreMes(newtask.mes) }}</p>
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
          <CompositionsTable />
        </div>
      </div>
    </div>
  </div>
</template>




<style>
.custom-background {
  background-color: #9ea7be;
  /* Cambia este valor al color que desees */
}
</style>
