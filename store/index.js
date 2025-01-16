export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },
    readLang(state) {
        return state.lang
    },

    readCompositions(state) {
        return state.compositions
    },
    readHarvests(state) {
        return state.harvests
    },
    readRainySeasons(state) {
        return state.rainySeasons
    },
    readInspections(state) {
        return state.inspections
    },
    readStocks(state) {
        return state.stocks
    },
    readMedications(state) {
        return state.medications
    },
    readLogos(state) {
        return state.logos
    },
    readUserData(state) {
        return state.userdata
    },


}
export const state = () => ({
    mobileDrawerStatus: false,
    searchPopupStatus: false,
    token: "",
    user: null,
    locale: "",
    lang: "en",
    compositions: "",
    harvests: "",
    rainySeasons:"",
    inspections:"",
    stocks:"",
    medications:"",
    logos:"",
    userData:""
})


export const mutations = {
    changeMobileDrawerStatus(state) {
        state.mobileDrawerStatus = !state.mobileDrawerStatus
    },
    changeSearchPopupStatus(state) {
        state.searchPopupStatus = !state.searchPopupStatus
    },
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
    },
    setLocale(state, payload) {
        state.locale = payload
    },
    setLang(state, payload) {
        state.lang = payload
    },

    setCompositions(state, payload) {
        state.compositions = payload
    },

    setHarvests(state, payload) {
        state.harvests = payload
    },
    setRainySeasons(state, payload) {
        state.rainySeasons = payload
    },
    setInspections(state, payload) {
        state.inspections = payload
    },
    setStocks(state, payload) {
        state.stocks = payload
    },
    setMedications(state, payload) {
        state.medications = payload
    },
    setLogos(state, payload) {
        state.logos = payload
    },
    setUserData(state, payload) {
        state.userData = payload
    },

};
export const actions = {
    async getUserData({ commit }) {
        const jwt = JSON.parse(localStorage.getItem("jwt"));
        console.log("Trayendo UserData");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getUserData.gql"),
            variables: {
                userId: userId
            },
            context: {
                headers: {
                    Authorization: `Bearer ${jwt.token}`
                }
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setUserData', data);
        } catch (error) {
            console.error("Error al obtener las UserData:", error);
        }
    },

    async getLogos({ commit }) {
        console.log("Trayendo Logos");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getLogos.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setLogos', data.logos.data);
        } catch (error) {
            console.error("Error al obtener las Logos:", error);
        }
    },


    async getMedications({ commit }) {
        console.log("Trayendo Medications");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getMedications.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setMedications', data.medications.data);
        } catch (error) {
            console.error("Error al obtener las Medications:", error);
        }
    },

    async getStocks({ commit }) {
        console.log("Trayendo Stocks");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getStocks.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setStocks', data.stocks.data);
        } catch (error) {
            console.error("Error al obtener las Stocks:", error);
        }
    },

    async getInspections({ commit }) {
        console.log("Trayendo Inspections");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getInspections.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setInspections', data.inspections.data);
        } catch (error) {
            console.error("Error al obtener las Inspections:", error);
        }
    },

    async getRainySeasons({ commit }) {
        console.log("Trayendo RainySeasons");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getRainySeasons.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setRainySeasons', data.rainySeasons.data);
        } catch (error) {
            console.error("Error al obtener las rainySeasons:", error);
        }
    },

    async getHarvests({ commit }) {
        console.log("trayendo harvest");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getHarvests.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setHarvests', data.harvests.data);
        } catch (error) {
            console.error("Error al obtener las harvests:", error);
        }
    },

    async getCompositions({ commit }) {
        console.log("trayendo compositions");
        const client = this.app.apolloProvider.defaultClient;
        const userId = this.$auth.user?.id; // Usar el operador opcional para evitar errores si user es null o undefined
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const query = {
            query: require("../graphql/getCompositions.gql"),
            variables: {
                userId: userId
            }
        };

        try {
            const { data } = await client.query(query);
            commit('setCompositions', data.compositions.data);
        } catch (error) {
            console.error("Error al obtener las composiciones:", error);
        }
    },



  

    async readToken() {
        try {
            console.log("trayendo tokens");
            const jwt = JSON.parse(localStorage.getItem("jwt"));
            if (jwt && jwt.token) {
                this.commit("setToken", jwt.token);
            } else {
                // Aquí podrías redirigir al usuario a la página de inicio de sesión
                // o manejar el caso de no tener token como creas conveniente.
                await this.$auth.logout(); // Por ejemplo, cerrar sesión.
            }
        } catch (error) {
            console.error("Error al leer el token:", error);
            // Manejar el error según sea necesario.
        }
    },

    readLang() {
        let lang = null;
        try {

            lang = JSON.parse(localStorage.getItem("language"));
            if (lang != null) {
                this.commit("setLang", lang);
                this.commit("setLocale", lang);

            } else {
                this.commit("setLang", "en");
                this.commit("setLocale", "en");
            }

        } catch (error) {
            console.log(err);
        }
    },








};

