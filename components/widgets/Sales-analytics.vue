<script>
import countTo from "vue-count-to";
/**
 * Sales-analytics component
 */
export default {
    components: {
        countTo
    },
    data() {
        return {
            series: [{
                name: 'Temperatura',
                type: 'line',
                data: [76, 51, 41, 31, 21, 15, 14, 20, 30, 40, 50, 75]
            }, {
                name: 'Temperatura',
                type: 'line',
                data: [76, 51, 41, 31, 21, 15, 14, 20, 30, 40, 50, 75]
            }, {
                name: 'Recursos',
                type: 'area',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39,40]
            },
            {
                name: 'Escasez',
                type: 'column',
                data: [100, 100, 0, 0, 100, 100, 100, 100, 0, 0, 100]
            }],
            chartOptions: {
                chart: {
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                stroke: {
                    width: [0, 2, 4],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '110%'
                    }
                },
                colors: ['#f1b44c','#5b73e8', '#dfe2e6', '#f1b44c'],
                fill: {
                    opacity: [0.85, 0.25, 1],
                    gradient: {
                        inverseColors: false,
                        shade: 'light',
                        type: "vertical",
                        opacityFrom: 0.85,
                        opacityTo: 0.55,
                        stops: [0, 100, 100, 100]
                    }
                },
                labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003','12/01/2003'],
                markers: {
                    size: 0
                },

                xaxis: {
                    type: 'datetime'
                },
                yaxis: {
                    title: {
                        text: 'Points',
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                        formatter: function (y) {
                            if (typeof y !== "undefined") {
                                return y.toFixed(0) + " points";
                            }
                            return y;

                        }
                    }
                },
                grid: {
                    borderColor: '#f1f1f1'
                }
            }
        };
    }
};
</script>

<template>
<div class="col-xl-8">
    <div class="card">
        <div class="card-body">
            <div class="float-end">
                <b-dropdown variant="white" toggle-class="text-reset p-0">
                    <template v-slot:button-content>
                        <span class="font-weight-semibold">Sort By:</span>
                        <span class="text-muted">
                            Yearly
                            <i class="mdi mdi-chevron-down ml-1"></i>
                        </span>
                    </template>
                    <a class="dropdown-item" href="#">Monthly</a>
                    <a class="dropdown-item" href="#">Yearly</a>
                    <a class="dropdown-item" href="#">Weekly</a>
                </b-dropdown>
            </div>
            <h4 class="card-title mb-4">Sales Analytics</h4>

            <div class="mt-1">
                <ul class="list-inline main-chart mb-0">
                    <li class="list-inline-item chart-border-left mr-0 border-0">
                        <h3 class="text-primary">
                            $
                            <span data-plugin="counterup">
                                <countTo :startVal="1" :endVal="2371" :duration="2000"></countTo>
                            </span>
                            <span class="text-muted d-inline-block font-size-15 ml-3">Income</span>
                        </h3>
                    </li>
                    <li class="list-inline-item chart-border-left mr-0">
                        <h3>
                            <span data-plugin="counterup">
                                <countTo :startVal="1" :endVal="258" :duration="2000"></countTo>
                            </span>
                            <span class="text-muted d-inline-block font-size-15 ml-3">Sales</span>
                        </h3>
                    </li>
                    <li class="list-inline-item chart-border-left mr-0">
                        <h3>
                            <span data-plugin="counterup">3.6</span>%
                            <span class="text-muted d-inline-block font-size-15 ml-3">Conversation Ratio</span>
                        </h3>
                    </li>
                </ul>
            </div>

            <div class="mt-3">
                <div id="sales-analytics-chart" class="apex-charts" dir="ltr"></div>
                <apexchart type="line" class="apex-charts" dir="ltr" height="339" :options="chartOptions" :series="series"></apexchart>
            </div>
        </div>
        <!-- end card-body-->
    </div>
    <!-- end card-->
</div>
<!-- end col-->
</template>
