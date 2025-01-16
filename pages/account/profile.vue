<script>
import {
    FormWizard,
    TabContent
} from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { mapGetters } from 'vuex'
export default {
    middleware: ['authenticated'],
    head() {
        return {
            title: `${this.title} | Cuarderno del Apicultor`,
        };
    },
    components: {
        FormWizard,
        TabContent
    },
    data() {
        return {
            title: "Profile",

            logoid: null,
            collectionid: null
        };
    },

mounted(){


  if (this.$store.state.logos.length == 0) {
    this.$store.dispatch('getLogos')
  }
},
computed: {
  ...mapGetters(['isAuthenticated', 'loggedInUser']),
  profiles() {
    let profile = this.$store.getters.readLogos[0];

    // Utiliza el operador de encadenamiento opcional para evitar errores
    if (profile?.id && profile?.attributes?.Logo?.data?.id) {
      this.logoid = profile.id;
      this.collectionid = profile.attributes.Logo.data.id;
      return profile;
    }

    return null;
  },


        userData() {

            let profile = this.$store.getters.readUserData;
            if (profile) {
                return profile;
            }
            return null;
        },
    },
};
</script>

<template>
    <div>
        <PageHeader />
        <div class="row mb-4">
            <div class="col-xl-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="text-center">
                            <div class="clearfix"></div>
                            <div v-if="profiles && profiles.attributes.Logo.data">
                                <img :src="$config.CMS_API_URL + profiles.attributes.Logo.data.attributes.url"
                                    alt="Logo" class="avatar-lg rounded-circle img-thumbnail" />
                            </div>
                            <div v-else>
                                <img src="~/assets/images/myimages/cdlogo.png" alt="Default Image"
                                    class="avatar-lg rounded-circle img-thumbnail" />
                            </div>

                            <h5 class="mt-3 mb-1">{{ loggedInUser.username }}</h5>
                            <p class="text-muted">{{ loggedInUser.email }}</p>

                            <div class="mt-4">



                                <ModalEditProfile :logoid="this.logoid" :collectionid="this.collectionid" />

                            </div>
                        </div>

                        ,

                        <hr class="my-4" />
                        <div class="text-muted">
                            <h5 class="font-size-16">Sobre Nosotros</h5>
                            <p>{{ loggedInUser.About }}</p>
                            <div class="table-responsive mt-4 mb-0">
                                <div>
                                    <p class="mb-1">Nombre :</p>
                                    <h5 class="font-size-16">{{ loggedInUser.username }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">E-mail :</p>
                                    <h5 class="font-size-16">{{ loggedInUser.email }}</h5>
                                </div>
                                <div class="mt-4">
                                    <p class="mb-1">Ubicación :</p>
                                    <h5 class="font-size-16">{{ loggedInUser.Location }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="col-xl-8">
                <div class="card mb-0">
                    <b-tabs content-class="p-4" justified class="nav-tabs-custom">
                        <b-tab active>
                            <template v-slot:title>
                                <i class="uil uil-user-circle font-size-20"></i>
                                <span class="d-none d-sm-block">Mi negocio</span>
                            </template>
                            <div>


                                <div>
                                    <h5 class="font-size-16 mb-4">Apiarios/Colmenas</h5>

                                    <div class="table-responsive">
                                        <table class="table table-nowrap table-hover mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col"></th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col" style="width: 120px;">Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">01</th>
                                                    <td>
                                                        <a href="#" class="text-dark">Actividad en desarrollo "nombre apiario"</a>
                                                    </td>
                                                    <td>28 Nov, 2023</td>
                                                    <td>
                                                        <span class="badge bg-soft-primary font-size-12">Open</span>
                                                    </td>
                                                    <td>
                                                        <b-dropdown right toggle-class="text-muted font-size-18 px-2 p-0"
                                                            variant="white">
                                                            <template v-slot:button-content>
                                                                <i class="uil uil-ellipsis-v"></i>
                                                            </template>

                                                            <a class="dropdown-item" href="#">Editar</a>
                                                            <a class="dropdown-item" href="#">Desactivar</a>
                                                        </b-dropdown>
                                                    </td>
                                                </tr>
                                            
                                        
                                              
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
