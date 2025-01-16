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
        composition() {
            const slug = this.$route.params.details;

            if (this.$store.getters.readCompositions != "") {
                let result = this.$store.getters.readCompositions.find(
                    (data) => data.attributes.Slug == slug
                );
                return result.attributes;
            }
        },
    },
    methods: {
        formatFecha(fecha) {
            const options = { year: 'numeric', month: 'long' };
            return new Date(fecha).toLocaleDateString('es', options);
        }
    }
};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items" />

        <div v-if="composition" class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="invoice-title">
                            <h4 class="float-end font-size-16">
                                Actividad #{{ composition.Slug }}
                                <span class="badge badge-success font-size-12 ml-2">Paid</span>
                            </h4>
                            <div class="mb-4">
                                <img src="~/assets/images/logo-dark.png" alt="logo" height="20" />
                            </div>
                            <div class="text-muted">

                                <p class="mb-1"><b>Apiario:</b> {{ composition.NombreApiario }}</p>
                                <p class="mb-1"><b>Responsable:</b> {{ composition.NombreResponsable }}</p>
                                <p class="mb-1"><b>Mes:</b> {{ formatFecha(composition.Mes) }}</p>


                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="row">
                            <div class="col-sm-6">
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Nucleo:</h5>
                                    <p>{{ composition.Nucleo }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Enjambre:</h5>
                                    <p>{{ composition.Enjambre }}</p>
                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Muertas:</h5>
                                    <p>{{ composition.Muertas }}</p>

                                </div>
                                <div class="text-muted">
                                    <h5 class="font-size-16 mb-3">Huerfanas:</h5>
                                    <p>{{ composition.Huerfanas }}</p>

                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Observaciones:</h5>
                                        <p>{{ composition.Observaciones }}</p>
                                    </div>
                                </div>
                                <div class="text-muted text-sm-right">
                                    <div>
                                        <h5 class="font-size-16 mb-1">Otros :</h5>
                                        <p>{{ composition.Otros }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 table-responsive">
                            <table class="table table-nowrap table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style="width: 70px;">No.</th>
                                        <th>Crecimiento Vertical</th>
                                        <th class="text-right" style="width: 120px;">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in composition.Composicion" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>
                                            <h5 class="font-size-15 mb-1">
                                                {{ item.CrecimientoVertical }}
                                            </h5>
                                        </td>
                                        <td>{{ item.Cantidad }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" colspan="2" class="border-0 text-right">
                                            Total
                                        </th>
                                        <td class="border-0">
                                            <h4 class="m-0">{{ composition.Composicion.length }}</h4>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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