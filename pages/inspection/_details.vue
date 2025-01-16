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
            title: "Detalles de la Revisión",
            items: [{
                text: "Revisiones"
            },
            {
                text: "Detalles de la Revisión",
                active: true
            }
            ]
        };
    },

    computed: {
        inspection() {
            const slug = this.$route.params.details;

            if (this.$store.getters.readInspections != "") {
                let result = this.$store.getters.readInspections.find(
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

        <div v-if="inspection" class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="invoice-title">
                            <h4 class="float-end font-size-16">
                                Actividad #{{ inspection.Slug }}
                                <span class="badge badge-success font-size-12 ml-2">Paid</span>
                            </h4>
                            <div class="mb-4">
                                <img src="~/assets/images/logo-dark.png" alt="logo" height="20" />
                            </div>
                            <div class="text-muted">

                                <p class="mb-1"><b>Apiario:</b> {{ inspection.NombreApiario }}</p>
                                <p class="mb-1"><b>Responsable:</b> {{ inspection.NombreResponsable }}</p>
                                <p class="mb-1"><b>Fecha:</b> {{ formatFecha(inspection.Fecha) }}</p>


                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Total de Panales:</h5>
                                    <p>{{ inspection.TotalPanales }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Panales Cubiertos:</h5>
                                    <p>{{ inspection.PanalesCubiertos }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Situacion:</h5>
                                    <p>{{ inspection.Situacion }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Reservas:</h5>
                                    <p>{{ inspection.Reservas }}</p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Actividad :</h5>
                                        <p>{{ inspection.Actividad }}</p>
                                    </div>
                                </div>
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Próxima Visita:</h5>
                                        <p>{{ inspection.ProximaVisita }}</p>
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