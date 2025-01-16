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
            title: "Detalles de la Composición",
            items: [{
                text: "Composición"
            },
            {
                text: "Detalles de la Composición",
                active: true
            }
            ]
        };
    },

    computed: {
        rainyseason() {
            const slug = this.$route.params.details;

            if (this.$store.getters.readRainySeasons != "") {
                let result = this.$store.getters.readRainySeasons.find(
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

        <div v-if="rainyseason" class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="invoice-title">
                            <h4 class="float-end font-size-16">
                                Actividad #{{ rainyseason.Slug }}
                                <span class="badge badge-success font-size-12 ml-2">Paid</span>
                            </h4>
                            <div class="mb-4">
                                <img src="~/assets/images/logo-dark.png" alt="logo" height="20" />
                            </div>
                            <div class="text-muted">

                                <p class="mb-1"><b>Apiario:</b> {{ rainyseason.NombreApiario }}</p>
                                <p class="mb-1"><b>Responsable:</b> {{ rainyseason.NombreResponsable }}</p>
                                <p class="mb-1"><b>Fecha:</b> {{ formatFecha(rainyseason.Fecha) }}</p>


                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Actividad:</h5>
                                    <p>{{ rainyseason.Actividad}}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Observaciones:</h5>
                                    <p>{{ rainyseason.Observaciones }}</p>

                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Próxima Actividad:</h5>
                                        <p>{{ rainyseason.ProximaActividad}}</p>
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