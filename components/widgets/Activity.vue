<script>
/**
 * Activity component
 */
export default {

    computed: {
        harvest() {
            if (this.$store.getters.readHarvests != "") {

                return this.$store.getters.readHarvests;
            }
        },
        rainyseason() {

            if (this.$store.getters.readRainySeasons != "") {
                return this.$store.getters.readRainySeasons;
            }
        },
        recentActivities() {
            let lastTwoHarvests = this.harvest?.slice(-2).map(item => ({ ...item, categoria: 'cosecha' })) || [];
            let lastTwoRainySeasons = this.rainyseason?.slice(-2).map(item => ({ ...item, categoria: 'época lluvia' })) || [];

            let combined = [...lastTwoHarvests, ...lastTwoRainySeasons];

            return combined.sort((a, b) => {
                let dateA = new Date(a.attributes.Fecha);
                let dateB = new Date(b.attributes.Fecha);
                return dateA - dateB;
            });
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
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title mb-4">{{ $t("pages.dashboard.widgets.rencentactivities") }}</h4>

                <ol class="activity-feed mb-0 ps-2" data-simplebar style="max-height: 336px;">
                    <li v-for="(item, index) of recentActivities" :key="index" class="feed-item">
                        <div class="feed-item-list">
                            <p class="text-muted mb-1 font-size-13">
                                {{ formatFecha(item.attributes.Fecha) }}

                            </p>
                            <p class="mt-0 mb-0">
                                {{ item.attributes.Actividad }}
                                <br>
                                <span class="text-primary">
                                    {{ item.categoria }}
                                </span>
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
<style>
.activity-feed {
    max-height: 400px; 
    overflow-y: auto;

}

</style>