export default function ({ store, redirect }) {

  console.log("Middleware Authenticated actived");
  //comprueba token
  if (!store.state.auth.loggedIn) {

    return redirect('/account/login')
  }
  if (store.state.token.length == 0) {
    store.dispatch('readToken')
  }

  if (store.state.compositions.length == 0) {
    store.dispatch('getCompositions')
  }

  if (store.state.harvests.length == 0) {
    store.dispatch('getHarvests')
  }

  if (store.state.rainySeasons.length == 0) {
    store.dispatch('getRainySeasons')
  }

  if (store.state.inspections.length == 0) {
    store.dispatch('getInspections')
  }
  if (store.state.stocks.length == 0) {
    store.dispatch('getStocks')
  }

  if (store.state.medications.length == 0) {
    store.dispatch('getMedications')
  }

  if (store.state.logos.length == 0) {
    store.dispatch('getLogos')
  }

 

}




