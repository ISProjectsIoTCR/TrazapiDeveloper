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
            title: `Control de enfermedades`
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
                acarosAntes: "",
                producto: "",
                ingrediente: "",
                dosis: "",
                volumen: "",
                plagas: "",
                fechaRetiro: "",
                monitorAcaros: "",
                observaciones: "",
                nombreApiario: "",
                codigoApiario: "",
                ubicacion: "",
                acepta: false,
            },

            producto: [
                { name: "Varrovan" },
                { name: "A.Oxálico" },
                { name: "A.Fórmico" },
                { name: "Timol" },
                { name: "Flumetrina" },
                { name: "Amitrz" },
                { name: "Otro" }
            ],
            selectedProducto: "",
            submitted: false,
            authError: null,
            isAuthError: false,

            activeTabIndex: 0,
            items: {
                text: "APLICACION DE MEDICAMENTOS POR APIARIO",
                href: "/"
            },
        };
    },
    validations: {
        newtask: {
            fecha: {
                required,
            },
            dosis: {
                required,
            },
            observaciones: {
                required,
            },
        },
        selectedProducto: {
            required
        }
    },

    watch: {
        activeTabIndex(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.scrollToTop();
            }
        },
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

                    if (this.selectedProducto && this.selectedProducto.name) {
                        this.newtask.producto = this.selectedProducto.name;
                    }


                    await this.$apolloHelpers.onLogin(mytoken.token);
                    await this.$apollo
                        .mutate({
                            context: {
                                headers: {
                                    Authorization: mytoken ? `Bearer ${mytoken}` : "",
                                },
                            },
                            mutation: require("../../graphql/createMedication.gql"),
                            variables: this.newtask,
                        })
                        .then((data) => {
                            const toast = createToastInterface(this.toastOptions);
                            toast.success("Datos registrados");

                            this.$store.dispatch("getMedications");
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
                    acarosAntes: "",
                    producto: "",
                    ingrediente: "",
                    dosis: "",
                    volumen: "",
                    plagas: "",
                    fechaRetiro: "",
                    monitorAcaros: "",
                    observaciones: "",
                    nombreApiario: "",
                    codigoApiario: "",
                    ubicacion: "",
                    acepta: false,
                },
                    this.selectedProducto = "";


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
                    <div ref="topOfWizard" class="custom-background card-body">
                        <h4 class="card-title">Ingresa información</h4>
                        <form-wizard @on-change="tabChanged" color="#d38c34" ref="wizard" @on-complete="sendData">
                            <tab-content icon="mdi mdi-account-circle">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="mt-3 form-group">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Fecha:</label>
                                                    <date-picker v-model="newtask.fecha" lang="en"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.fecha.$error }"></date-picker>
                                                    <div v-if="submitted && !$v.newtask.fecha.required"
                                                        class="invalid-feedback">
                                                        Fecha es requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Monitoreo de ácaros antes de la
                                                        aplicación:</label>
                                                    <input v-model="newtask.acarosAntes" class="form-control">

                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Nombre del Producto:</label>


                                                    <multiselect v-model="selectedProducto" :options="producto"
                                                        :close-on-select="true" :clear-on-select="false"
                                                        :hide-selected="false" :preserve-search="false"
                                                        placeholder="Elije una opción" label="name" track-by="name"
                                                        :preselect-first="false"
                                                        :class="{ 'is-invalid': submitted && $v.selectedProducto.$error }">
                                                    </multiselect>
                                                    <div v-if="submitted && !$v.newtask.dosis.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="mt-3 form-group">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Ingrediente Activo:</label>
                                                    <input v-model="newtask.ingrediente" class="form-control">
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Dosis Producto Recomendada:</label>
                                                    <input v-model="newtask.dosis" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.dosis.$error }">
                                                    <div v-if="submitted && !$v.newtask.dosis.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Volumen Aplicado:</label>
                                                    <input v-model="newtask.volumen" class="form-control">
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mt-3 form-group">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Plagas Controladas:</label>
                                                    <input v-model="newtask.plagas" class="form-control">
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Fecha de Retiro:</label>
                                                    <date-picker v-model="newtask.fechaRetiro" lang="en"></date-picker>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Monitoreo de ácaros:</label>
                                                    <input v-model="newtask.monitorAcaros" class="form-control">
                                                </div>

                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-form-label">Observaciones:</label>
                                            <div class="col-md-12">
                                                <textarea v-model="newtask.observaciones" class="form-control"
                                                    :class="{ 'is-invalid': submitted && $v.newtask.observaciones.$error }"></textarea>
                                                <div v-if="submitted && !$v.newtask.observaciones.required"
                                                    class="invalid-feedback">
                                                    Información requerida
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end col -->
                                </div>
                                <!-- end row -->
                            </tab-content>

                            <tab-content icon="mdi mdi-face-profile">
                                <div class="d-flex align-items-center">
                                    <div class="col-md-6">
                                        <div class="form-group row mb-3">
                                            <label class="col-md-5 col-form-label text-center" for="name">Nombre del
                                                Apiario</label>
                                            <div class="col-md-7">
                                                <input type="text" v-model="newtask.nombreApiario"
                                                    class="form-control mx-auto" value="" />
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label class="col-md-5 col-form-label text-center" for="surname">Código del
                                                apiario</label>
                                            <div class="col-md-7">
                                                <input type="text" v-model="newtask.codigoApiario"
                                                    class="form-control mx-auto" value="" />
                                            </div>
                                        </div>

                                        <div class="form-group row mb-3">
                                            <label class="col-md-5 col-form-label text-center"
                                                for="surname">Ubicación</label>
                                            <div class="col-md-7">
                                                <input type="text" v-model="newtask.ubicacion" class="form-control mx-auto"
                                                    value="" />
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
                                                La información proporcionada será parte integral de tu historial de
                                                actividades, contribuyendo al
                                                crecimiento de tu apiario. A continuación se presenta un breve resumen de
                                                tus
                                                respuestas:
                                            </p>

                                            <div class="resumen-respuestas w-75 mx-auto">
                                                <p><strong>Actividad Realizada:</strong> Se aplica {{ newtask.dosis }} de
                                                    {{ newtask.producto }}
                                                </p>
                                                <p><strong>Observaciones:</strong> {{ newtask.observaciones }}
                                                </p>


                                            </div>

                                            <div class="mb-3">
                                                <div class="custom-control custom-checkbox">
                                                    <input v-model="newtask.acepta" id="customCheck1" type="checkbox"
                                                        class="custom-control-input" />
                                                    <label class="custom-control-label" for="customCheck1">Acepto la
                                                        información</label>
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
                    <MedicationsTable />
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
