<script>

import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            languages: [
                {
                    flag: require("~/assets/images/flags/crc.png"),
                    language: "es",
                    title: "Español",
                },
                {
                    flag: require("~/assets/images/flags/germany.jpg"),
                    language: "de",
                    title: "Deutsch",
                },
                {
                    flag: require("~/assets/images/flags/us.jpg"),
                    language: "en",
                    title: "English",
                },


            ],
            current_language: this.$i18n.locale,
            text: null,
            flag: null,
            value: null,
        };
    },
    mounted() {
        this.value = this.languages.find((x) => x.language === this.$i18n.locale);
        this.text = this.value.title;
        this.flag = this.value.flag;
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'loggedInUser']),
        profiles() {
            let result = "";
            let profile = this.$store.getters.readLogos[0];
            if (profile != "") {
                result = profile;
                return result;
            }
            return result;
        },
    },
    methods: {
        /**
         * Toggle menu
         */
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        initFullScreen() {
            document.body.classList.toggle("fullscreen-enable");
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        /**
         * Toggle rightsidebar
         */
        toggleRightSidebar() {
            this.$parent.toggleRightSidebar();
        },
        /**
         * Set languages
         */
        setLanguage(locale, country, flag) {
            this.$i18n.locale = locale;
            this.current_language = locale;
            this.text = country;
            this.flag = flag;
        },
        async logoutUser() {

            this.$store.commit('resetState');
            await this.$auth.logout();

        },
    },
};
</script>

<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <nuxt-link to="/" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="~/assets/images/logo-sm.png" alt height="22" />
                        </span>
                        <span class="logo-lg">
                            <img src="~/assets/images/logo-dark.png" alt height="20" />
                        </span>
                    </nuxt-link>

                    <nuxt-link to="/" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="~/assets/images/logo-sm.png" alt height="22" />
                        </span>
                        <span class="logo-lg">
                            <img src="~/assets/images/logo-light.png" alt height="20" />
                        </span>
                    </nuxt-link>
                </div>

                <button @click="toggleMenu" type="button" class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn"
                    id="vertical-menu-btn">
                    <i class="fa fa-fw fa-bars"></i>
                </button>


            </div>

            <div class="d-flex">
                <b-dropdown variant="white" class="d-inline-block d-lg-none ms-2" toggle-class="header-item noti-icon" right
                    menu-class="dropdown-menu-lg p-0">
                    <template v-slot:button-content>
                        <i class="uil-search"></i>
                    </template>
                    <form class="p-3">
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" :placeholder="$t('navbar.search.text')"
                                    aria-label="Recipient's username" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit">
                                        <i class="mdi mdi-magnify"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </b-dropdown>

                <b-dropdown variant="white" right toggle-class="header-item">
                    <template v-slot:button-content>
                        <img class :src="flag" alt="Header Language" height="16" />
                        {{ text }}
                    </template>
                    <b-dropdown-item class="notify-item" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                        @click="setLanguage(entry.language, entry.title, entry.flag)"
                        :link-class="{ 'active': entry.language === current_language }">
                        <img :src="`${entry.flag}`" alt="user-image" class="me-1" height="12" />
                        <span class="align-middle">{{ entry.title }}</span>
                    </b-dropdown-item>
                </b-dropdown>


                <b-dropdown variant="white" class="d-none d-lg-inline-block ms-1" toggle-class="header-item noti-icon" right
                    menu-class="dropdown-menu-lg">
                    <template v-slot:button-content>
                        <i class="uil-apps"></i>
                    </template>
                    <div class="px-lg-2">
                        <div class="row no-gutters">
                            <div class="col">
                                <a target="_blank" class="dropdown-icon-item" href="https://coronadorada.com/app/">
                                    <img src="~/assets/images/brands/vr.png" alt="app" />
                                    <span>{{ $t("navbar.dropdown.site.list.app") }}</span>
                                </a>
                            </div>
                            <div class="col">
                                <a target="_blank" class="dropdown-icon-item" href="https://coronadorada.com/tienda/">
                                    <img src="~/assets/images/brands/e-commerce.png" alt="store" />
                                    <span>{{ $t("navbar.dropdown.site.list.store") }}</span>
                                </a>
                            </div>
                            <div class="col">
                                <a target="_blank" class="dropdown-icon-item" href="https://coronadorada.com">
                                    <img src="~/assets/images/brands/cdlogo.png" alt="cd" />
                                    <span>{{ $t("navbar.dropdown.site.list.cd") }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </b-dropdown>

                <div class="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen"
                        @click="initFullScreen">
                        <i class="uil-minus-path"></i>
                    </button>
                </div>


                <b-dropdown class="d-inline-block" toggle-class="header-item" right variant="white"
                    menu-class="dropdown-menu-end">
                    <template v-slot:button-content>
                        <div v-if="profiles && profiles.attributes.Logo.data">
                            <img class="rounded-circle header-profile-user"
                                :src="$config.CMS_API_URL + profiles.attributes.Logo.data.attributes.url"
                                alt="Header Avatar" />
                            <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{{
                                loggedInUser.username }}</span>
                            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                        </div>
                        <div v-else>
                            <img class="rounded-circle header-profile-user" src="~/assets/images/users/avatar-4.jpg"
                                alt="Header Avatar" />
                            <span class="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                                User </span>
                            <i class="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                        </div>
                    </template>

                    <!-- item-->

                    <nuxt-link to="/account/profile" class="dropdown-item">
                        <i class="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
                        <span class="align-middle">{{ $t('navbar.dropdown.marcus.list.profile') }}</span>
                    </nuxt-link>

                    <a class="dropdown-item" @click="logoutUser" href="javascript: void(0);">
                        <i class="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
                        <span class="align-middle">{{ $t('navbar.dropdown.marcus.list.logout') }}</span>
                    </a>
                </b-dropdown>


            </div>
        </div>
    </header>
</template>
