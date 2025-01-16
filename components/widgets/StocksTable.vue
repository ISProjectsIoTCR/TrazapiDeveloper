<script>
import moment from 'moment';
export default {

  data() {
    return {
      title: "Mis Actividades",
      actividades: [],
      totalRows: 0,

      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "age",
      sortDesc: false,
      fields: [
        {
          label: "Slug",
          key: "attributes.Slug",
        },

        {
          label: "Material",
          key: "attributes.Material",
        
        },
        {
          key: "attributes.Costo",
          label: "Costo",
          sortable: true,
        },
        {
          key: "attributes.Disponible",
          label: "Cantidad Disponible",
          
          sortable: true,
        },

        //"action",
      ],
    };
  },
  watch: {
    tasks(newTasks) {
      this.actividades = newTasks;
      this.totalRows = newTasks.length;
    },
  },

  computed: {
    tasks() {
      let totaltasks = this.$store.getters.readStocks;
      return totaltasks !== "" ? totaltasks : [];
    },
    rows() {
      return this.actividades.length;
    },
  },
  mounted() {
    this.actividades = this.tasks;
    this.totalRows = this.actividades.length;
  },

  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" />
    <div class="row">
      <div class="col-12">
        <div class="table-responsive mb-0">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_length" class="dataTables_length">
                <label class="d-inline-flex align-items-center">
                  Show&nbsp;
                  <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;entries
                </label>
              </div>
            </div>
            <!-- Search -->
            <div class="col-sm-12 col-md-6">
              <div id="tickets-table_filter" class="dataTables_filter text-md-end">
                <label class="d-inline-flex align-items-center">
                  Search:
                  <b-form-input v-model="filter" type="search" class="form-control form-control-sm ml-2"></b-form-input>
                </label>
              </div>
            </div>
            <!-- End search -->
          </div>
          <!-- Table -->

          <b-table table-class="table table-centered datatable table-card-list" thead-tr-class="bg-transparent"
            :items="tasks" :fields="fields" responsive="sm" :per-page="perPage" :current-page="currentPage"
            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :filter="filter" :filter-included-fields="filterOn"
            @filtered="onFiltered">
            <template v-slot:cell(attributes.Slug)="data">
              <div class="custom-control custom-checkbox ">
                <NuxtLink :to="{
                  path: '/stock/' + data.item.attributes.Slug,
                 
                }" type="button" class="text-success mb-0">{{ data.item.attributes.Slug }}
                </NuxtLink>

              </div>
            </template>
            <template v-slot:cell(id)="data">
              <a href="javascript: void(0);" class="text-dark fw-bold">{{ data.item.id }}</a>
            </template>

            <template v-slot:cell(name)="data">
              <a href="#" class="text-body">{{ data.item.name }}</a>
            </template>
            <template v-slot:cell(status)="data">
              <div class="badge badge-pill bg-soft-success font-size-12" :class="{
                'bg-soft-danger': data.item.status === 'Chargeback',
                'bg-soft-warning': data.item.status === 'unpaid',
              }">
                {{ data.item.status }}
              </div>
            </template>
            <template v-slot:cell(action)>
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a href="javascript:void(0);" class="px-2 text-primary" v-b-tooltip.hover title="Edit">
                    <i class="uil uil-pen font-size-18"></i>
                  </a>
                </li>
                <li class="list-inline-item">
                  <a href="javascript:void(0);" class="px-2 text-danger" v-b-tooltip.hover title="Delete">
                    <i class="uil uil-trash-alt font-size-18"></i>
                  </a>
                </li>
              </ul>
            </template>
          </b-table>
        </div>
        <div class="row">
          <div class="col">
            <div class="dataTables_paginate paging_simple_numbers float-end">
              <ul class="pagination pagination-rounded">
                <!-- pagination -->
                <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
