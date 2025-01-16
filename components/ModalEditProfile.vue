<script>
import axios from 'axios';
import {
    FormWizard,
    TabContent
} from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'


export default {

    props: ["logoid", "collectionid"],
    head() {
        return {
            title: `${this.title} | Nuxtjs Responsive Bootstrap 5 Admin Dashboard`,
        };
    },
    components: {
        vueDropzone: vue2Dropzone,

        FormWizard,
        TabContent
    },
    data() {
        return {
            title: "Profile",

            dropzoneOptions: {
                url: this.$config.CMS_API_URL+"/api/upload",
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: {
                    "My-Awesome-Header": "header value",
                },
                addedfile: (file) => this.handleFileUpload(file),
            },

            options: [
                "High Quality",
                "Leather",
                "Notifications",
                "Sizes",
                "Different Color",
            ],
            uploadNewImageUrl: "",
            uploadedImageId: "",
            isLoading: false, // Agrega un indicador de estado de carga

            updateLogo: {
                id: "",
                logoId: "",
            },
            updateUser: {
                userId: this.$auth.user.id,
                name: this.$auth.user.username,
                about: this.$auth.user.About,
                location: this.$auth.user.Location,
                email: this.$auth.user.email,
            }
        };
    },

    profiles() {
        let result = "";
        let profile = this.$store.getters.readLogos[0];
        if (profile != "") {
            result = profile;

            return result;
        }
        return result;
    },


    methods: {
        async handleFileUpload(file) {
            this.isLoading = true;
            const formData = new FormData();
            formData.append('files', file);
            const mytoken = JSON.parse(localStorage.getItem("jwt"));

            try {
                const response = await axios.post(this.$config.CMS_API_URL+'/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${mytoken.token}` // Incluir el token en las cabeceras
                    }
                });

                this.uploadedImageId = response.data[0].id; // Guarda el ID de la imagen subida
                this.uploadNewImageUrl = this.$config.CMS_API_URL+ response.data[0].url;
                this.isLoading = false;
            } catch (error) {
                console.error('Error al subir la imagen:', error);
                this.isLoading = false;
            }
        },

        async sendData() {
            if (this.uploadedImageId != "") {
                this.updateLogo.logoId = this.uploadedImageId
                this.updateLogo.id = this.logoid
            } else if (this.logoid == null || this.collectionid == null) {

                this.updateLogo.logoId = this.logoid
                this.updateLogo.id = this.collectionid
            } else {
                this.updateLogo.logoId = this.logoid
                this.updateLogo.id = this.collectionid
            }

            const variables = this.updateLogo
            try {
                const mytoken = JSON.parse(localStorage.getItem("jwt"));
                //UPDATE LOGOS COLLECTION
                const response = await this.$apollo.mutate({
                    mutation: require("../graphql/uploadLogo.gql"),
                    variables: variables,
                    context: {
                        headers: {
                            Authorization: mytoken ? `Bearer ${mytoken}` : "",
                        },
                    },
                });

                //UPDATE USER COLLECTION
                const variables2 = this.updateUser
                const response2 = await this.$apollo.mutate({
                    mutation: require("../graphql/uploadUser.gql"),
                    variables: variables2,
                    context: {
                        headers: {
                            Authorization: mytoken ? `Bearer ${mytoken}` : "",
                        },
                    },
                });

                if (response.data && response2.data) {
                    this.$bvModal.hide('modal-scrollable');
                    //this.$store.dispatch("getLogos");
                    this.fetchAndUpdateUser()
                    this.$toast.success('Perfil actualizado correctamente');
                }
            } catch (error) {
                this.$toast.error('Error al actualizar el perfil: ' + error);
            }
        },
        async fetchAndUpdateUser() {
            try {
                const response = await this.$axios.$get(`/api/users/${this.$auth.user.id}`);
                this.$auth.setUser(response);
                this.resetUpdateObjects();
            } catch (error) {
                console.error('Error al actualizar los datos del usuario:', error);
            }
        }
        ,
        async removePreviewImage() {
            const mytoken = JSON.parse(localStorage.getItem("jwt"));
            try {
                const response = await axios.delete(this.$config.CMS_API_URL+`/api/upload/files/${this.uploadedImageId}`, {
                    headers: {

                        'Authorization': `Bearer ${mytoken.token}`
                    },
                });

                if (response.status === 200) {
                    this.uploadNewImageUrl = '';
                    this.uploadedImageId = null;

                }
            } catch (error) {
                console.error('Error al borrar el archivo:', error);
            }
        },

        resetUpdateObjects() {
            this.updateLogo = { id: "", logoId: "" };
            this.updateUser = {
                userId: this.$auth.user.id,
                name: this.$auth.user.username,
                about: this.$auth.user.About,
                location: this.$auth.user.Location,
                email: this.$auth.user.email,
            };
        }
    }
};
</script>
<template>
    <div>
        <button type="button" v-b-modal.modal-scrollable class="btn btn-primary waves-effect waves-light"
            data-toggle="modal" data-target=".bs-example-modal-center">
            <i class="uil uil-pen me-2"></i> Editar
        </button>
        <b-modal id="modal-scrollable" scrollable title="Actualiza tu Perfil" title-class="font-18" hide-footer>
            <div class="row">
                <div class="col-12">
                    <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="name">Nombre</label>
                        <div class="col-md-9">
                            <input type="text" v-model="updateUser.name" class="form-control" />
                        </div>
                    </div>

                    <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label">Sobre el negocio
                        </label>
                        <div class="col-md-9">
                            <textarea type="text" v-model="updateUser.about"
                                class="form-control custom-textarea"></textarea>
                        </div>
                    </div>

                    <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label">Ubicación</label>
                        <div class="col-md-9">
                            <input type="text" v-model="updateUser.location" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row mb-3">
                        <label class="col-md-3 col-form-label" for="yourlogo">Cambiar Logo</label>
                        <div class="col-md-9">
                            <vue-dropzone id="dropzone" ref="myVueDropzone" :use-custom-slot="true"
                                :options="dropzoneOptions">
                                <div class="dropzone-custom-content">
                                    <div class="center-content">

                                        <div v-if="!isLoading && !uploadNewImageUrl" class="loading-indicator">
                                            <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                                            <p>Suelta aquí o haz clic para subir.</p>
                                        </div>
                                        <div v-if="isLoading" class="loading-indicator">
                                            Cargando...
                                        </div>
                                        <div v-if="!isLoading && uploadNewImageUrl" class="image-preview-container"
                                            @click="removePreviewImage">
                                            <img class="image-preview" :src="uploadNewImageUrl" alt="Vista previa" />
                                            <div class="delete-overlay">
                                                <i class="mdi mdi-delete"></i> Borrar
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vue-dropzone>
                        </div>
                    </div>
                    <!--div class="custom-control custom-checkbox">
                        <input id="customCheck1" type="checkbox" class="custom-control-input" />
                        <label class="custom-control-label" for="customCheck1">He revisado y confirmo los
                            cambios</label>
                    </div-->
                    <button @click="sendData()" type="button" class="btn btn-success mb-3">
                        <i class="mdi mdi-plus me-1"></i> Actualizar
                    </button>
                </div>
            </div>



        </b-modal>
    </div>
</template>

<style>
.custom-textarea {
    height: 150px;
    width: 100%;
}

.image-preview-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.image-preview-container:hover .image-preview {
    opacity: 0.7;
}

.image-preview-container:hover .delete-overlay {
    display: block;
}

.delete-overlay {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    /* Ajustar según la altura de tu imagen */
    font-size: 20px;
    /* Ajustar según sea necesario */
}

.image-preview {
    width: 100px;
    /* Ajustar según sea necesario */
    height: 100px;
    /* Ajustar según sea necesario */
}
</style>