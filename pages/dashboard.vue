<script>
/**
 * Dashboard component
 */
export default {
    middleware: ['authenticated'],
    head() {
        return {
            title: `${this.title} |  Cuaderno del Apicultor`,
        };
    },
    data() {
        return {
            title: "Dashboard",
            items: [{
                text: "Cuaderno",
            },
            {
                text: "Dashboard",
                active: true,
            },
            ],
        };
    },

};
</script>

<template>
    <div>
        <PageHeader :title="title" :items="items" />
        <Stat />

        <div class="row">
            <!--SalesAnalytics /-->
            <div class="col-xl-6">

                <Activity />

            </div>
            <div class="col-xl-6">


                <TopUsers />
            </div>
        </div>

        <div class="row">

            <!--SellingProduct /-->


        </div>
    </div>
</template>

<style></style>
