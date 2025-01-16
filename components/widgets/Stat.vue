<script>
import countTo from "vue-count-to";
/**
 * Stat component
 */
export default {
    components: {
        countTo
    },
    data() {
        return {
            series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54]
            }],
            chartOptions: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            growthChartOptions: {
                fill: {
                    colors: ["#f1b44c"]
                },
                chart: {
                    type: "bar",
                    sparkline: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: "50%"
                    }
                },
                labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                xaxis: {
                    crosshairs: {
                        width: 1
                    }
                },
                tooltip: {
                    fixed: {
                        enabled: false
                    },
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function (seriesName) {
                                return "";
                            }
                        }
                    },
                    marker: {
                        show: false
                    }
                }
            },
            orderseries: [70],
            orderRadial: {
                fill: {
                    colors: ["#34c38f"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            },
            customerseries: [55],
            customerRadial: {
                fill: {
                    colors: ["#5b73e8"]
                },
                chart: {
                    sparkline: {
                        enabled: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            margin: 0,
                            size: "60%"
                        },
                        track: {
                            margin: 0
                        },
                        dataLabels: {
                            show: false
                        }
                    }
                }
            }
        };
    },
    computed: {
        composition() {
            if (this.$store.getters.readCompositions != "") {
                return this.$store.getters.readCompositions[0].attributes;
            }
        },
        stock() {
            if (this.$store.getters.readStocks != "") {

                return this.$store.getters.readStocks;
            }
        },
        medication() {

            if (this.$store.getters.readMedications != "") {

                return this.$store.getters.readMedications;
            }
        },
        mostRecentMedication() {
            if (this.$store.getters.readMedications !== "") {
                let sortedMedications = [...this.$store.getters.readMedications].sort((a, b) => {
                    let dateA = new Date(a.attributes.Fecha);
                    let dateB = new Date(b.attributes.Fecha);
                    return dateB - dateA; // Orden descendente
                });
                return sortedMedications[0].attributes; // Retorna el primer elemento
            }
            return null; // Retorna null si no hay medicaciones
        }
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
    <div class="row">
        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart class="apex-charts" dir="ltr" width="70" height="40" :options="chartOptions"
                            :series="series"></apexchart>
                    </div>
                    <div v-if="composition">
                        <h4 class="mb-1 mt-1">

                            <span data-plugin="counterup">
                                <countTo :startVal="1000" :endVal="composition.Composicion.length" :duration="2000">
                                </countTo>
                            </span>
                        </h4>
                        <p class="text-muted mb-0"> {{$t("pages.dashboard.widgets.totalbeehivesmsg")}}</p>
                    </div>
                    <!--p class="text-muted mt-3 mb-0">
                        <span class="text-success me-1">
                            <i class="mdi mdi-arrow-up-bold me-1"></i>2.65%
                        </span>
                        since last week
                    </p -->
                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart class="apex-charts" type="radialBar" dir="ltr" width="45" height="45"
                            :options="orderRadial" :series="orderseries"></apexchart>
                    </div>
                    <div>
                        <h4 v-if="stock" class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                <countTo :startVal="100" :endVal="stock.length" :duration="2000"></countTo>
                            </span>
                        </h4>
                        <p class="text-muted mb-0">{{ $t("pages.dashboard.widgets.stockregisters") }}</p>
                    </div>
                    <!--p class="text-muted mt-3 mb-0">
                        <span class="text-danger me-1">
                            <i class="mdi mdi-arrow-down-bold me-1"></i>0.82%
                        </span>
                        since last week
                    </p-->
                </div>
            </div>
        </div>
        <!-- end col-->

        <div class="col-md-6 col-xl-3">
            <div class="card">
                <div class="card-body">
                    <div class="float-end mt-2">
                        <apexchart class="apex-charts" type="radialBar" dir="ltr" width="45" height="45"
                            :options="customerRadial" :series="customerseries"></apexchart>
                    </div>
                    <div v-if="mostRecentMedication">
                        <h4 class="mb-1 mt-1">
                            <span data-plugin="counterup">
                                {{ formatFecha(mostRecentMedication.Fecha) }}
                            </span>
                        </h4>
                        <p class="text-muted mb-0">{{ $t("pages.dashboard.widgets.lastmedication") }}</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="col-md-6 col-xl-3">
            <div class="card bg-primary">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-sm-8">
                            <p class="text-white font-size-16">
                                {{ $t("pages.dashboard.widgets.medicationmsg") }}
                                <i class="mdi mdi-arrow-right"></i>
                            </p>
                            <div class="mt-4">

                                <NuxtLink :to="'medication'" type="button" class="btn btn-success waves-effect waves-light">
                                    {{ $t("pages.dashboard.widgets.medicationbutton") }}</NuxtLink>

                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="mt-4 mt-sm-0">
                                <img src="~/assets/images/medicamentos.png" class="img-fluid" alt />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end card-body-->
            </div>
        </div>
        <!-- end col-->
    </div>
    <!-- end row-->
</template>
