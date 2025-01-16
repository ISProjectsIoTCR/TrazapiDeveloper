<script>
export default {
    middleware: "authenticated",
    head() {
        return {
            title: `${this.title} | Cuaderno del Apicultor`
        };
    },
    data() {
        return {
            title: "Aplication Detail",
            items: [{
                text: "Aplicaciones"
            },
            {
                text: "Aplication Detail",
                active: true
            }
            ]
        };
    },

    computed: {
        medication() {
            const slug = this.$route.params.details;

            if (this.$store.getters.readMedications != "") {
                let result = this.$store.getters.readMedications.find(
                    (data) => data.attributes.Slug == slug
                );
                return result.attributes;
            }
        },
    },
    methods: {
        formatFecha(fecha) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(fecha).toLocaleDateString('es', options);
        }
    }


};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items" />

        <div v-if="medication" class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="invoice-title">
                            <h4 class="float-end font-size-16">
                                Actividad #{{ medication.Slug }}
                                <span class="badge badge-success font-size-12 ml-2">Paid</span>
                            </h4>
                            <div class="mb-4">
                                <img src="~/assets/images/logo-dark.png" alt="logo" height="20" />
                            </div>
                            <div class="text-muted">

                                <p class="mb-1"><b>Apiario:</b> {{ medication.NombreApiario }}</p>
                                <p class="mb-1"><b>Fecha:</b> {{ formatFecha(medication.Fecha) }}</p>
                                <p class="mb-1"><b>Fecha de Retiro:</b> {{ formatFecha(medication.FechaRetiro) }}</p>


                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Plagas:</h5>
                                    <p >{{ medication.Plagas }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Monitor de Acaros:</h5>
                                    <p >{{ medication.MonitorAcaros }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Acaros Antes:</h5>
                                    <p >{{ medication.AcarosAntes }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Observaciones:</h5>
                                    <p >{{ medication.Observaciones }}</p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Producto:</h5>
                                        <p>{{ medication.Producto }}</p>
                                    </div>
                                    <div class="mt-4">
                                        <h5 class="font-size-16 mb-1">Dosis:</h5>
                                        <p>{{ medication.Dosis }}</p>
                                    </div>
                                    <div class="mt-4">
                                        <h5 class="font-size-16 mb-1">Ingrediente:</h5>
                                        <p>{{ medication.Ingrediente }}</p>
                                    </div>
                                    <div class="mt-4">
                                        <h5 class="font-size-16 mb-1">Volumen:</h5>
                                        <p>{{ medication.Volumen }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-print-none mt-4">
                            <div class="float-end">
                                <a href="javascript:window.print()" class="btn btn-success waves-effect waves-light w-md">
                                    <i class="fa fa-print"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
@media print {
    .col-sm-6 {
        float: left;
        width: 50%;
    }

}

@media print {
    body {
        color: black;
    }

    .d-print-none {
        display: none;
    }


}
</style>