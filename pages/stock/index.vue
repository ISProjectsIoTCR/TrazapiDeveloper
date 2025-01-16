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
            title: `Inventario`
        };
    },
    components: {
        DatePicker,
        FormWizard,
        TabContent,
    },
    data() {
        return {
            title: "INVENTARIO",
            newtask: {
                slug: "",
                usuarioId: this.$auth.user.id,
                material: "",
                costo: "",
                disponible: "",
                nombreApiario: "",
                fecha: "",
                cantidad: "",
                materialesTotales: "",
                total: "",
                materialesFaltantes: "",
                acepta: "",
            },

            submitted: false,
            authError: null,
            isAuthError: false,

            items: {
                text: "TU INVENTARIO",
                href: "/"
            },
        };
    },
    validations: {
        newtask: {
            material: {
                required,
            },
            costo: {
                required,
            },
            disponible: {
                required,
            },
            nombreApiario: {
                required,
            },
            fecha: {
                required,
            },
            cantidad: {
                required,
            },

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

                    await this.$apolloHelpers.onLogin(mytoken.token);
                    await this.$apollo
                        .mutate({
                            context: {
                                headers: {
                                    Authorization: mytoken ? `Bearer ${mytoken}` : "",
                                },
                            },
                            mutation: require("../../graphql/createStock.gql"),
                            variables: this.newtask,
                        })
                        .then((data) => {
                            const toast = createToastInterface(this.toastOptions);
                            toast.success("Datos regisompositionstrados");

                            this.$store.dispatch("getStocks");
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
                    material: "",
                    costo: "",
                    disponible: "",
                    nombreApiario: "",
                    fecha: "",
                    cantidad: "",
                    materialesTotales: "",
                    total: "",
                    materialesFaltantes: "",
                    acepta: "",
                };

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
                        <form-wizard @on-change="tabChanged" color="#d38c34" ref="wizard" @on-complete="sendData">


                            <tab-content icon="mdi mdi-account-circle">
                                <div class="row">
                                    <div class="col-12">


                                        <div class="mt-3 form-group">
                                            <div class="row">

                                                <div class="col-md-4">
                                                    <label class="col-form-label">Material:</label>
                                                    <input v-model="newtask.material" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.material.$error }">
                                                    <div v-if="submitted && !$v.newtask.material.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Costo en ₡:</label>
                                                    <input v-model="newtask.costo" type="number" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.costo.$error }">
                                                    <div v-if="submitted && !$v.newtask.costo.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Cantidad Disponible:</label>
                                                    <input v-model="newtask.disponible" type="number" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.disponible.$error }">
                                                    <div v-if="submitted && !$v.newtask.disponible.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="mt-3 form-group">
                                            <label class="mt-3 text-center  col-form-label"><b>CANTIDAD DE APIARIOS</b>
                                            </label>

                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Nombre del Apiario:</label>
                                                    <input v-model="newtask.nombreApiario" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.nombreApiario.$error }">
                                                    <div v-if="submitted && !$v.newtask.nombreApiario.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Fecha:</label>
                                                    <date-picker v-model="newtask.fecha" :first-day-of-week="1" lang="en"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.fecha.$error }"></date-picker>
                                                    <div v-if="submitted && !$v.newtask.fecha.required"
                                                        class="invalid-feedback">
                                                        Fecha es requerida
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Cantidad:</label>
                                                    <input v-model="newtask.cantidad" type="number" class="form-control"
                                                        :class="{ 'is-invalid': submitted && $v.newtask.cantidad.$error }">
                                                    <div v-if="submitted && !$v.newtask.cantidad.required"
                                                        class="invalid-feedback">
                                                        Información requerida
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mt-3 form-group">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Materiales totales:</label>
                                                    <input v-model="newtask.materialesTotales" class="form-control">
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Total:</label>
                                                    <input v-model="newtask.total" type="number" class="form-control">
                                                </div>
                                                <div class="col-md-4">
                                                    <label class="col-form-label">Materiales faltantes:</label>
                                                    <input v-model="newtask.materialesFaltantes" class="form-control">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- end col -->
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
                                                <p><strong>Se agregaran </strong> {{ newtask.disponible }} {{
                                                    newtask.material }} con un costo de ₡
                                                    {{ newtask.costo }}
                                                </p>
                                                <p><strong>Apiarios:</strong> {{ newtask.nombreApiario }} consta de {{
                                                    newtask.cantidad }} apiarios.
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
                    <StocksTable />
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
