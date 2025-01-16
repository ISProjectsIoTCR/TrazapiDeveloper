export default function ({ store, redirect }) {

   
  
    const userRole = store.state.auth.user.role.name; // Asume que el rol está disponible aquí
  
    // Para un TECNICO
    if (userRole === 'Tecnico') {
      //trae info backend
      if (store.state.mycompany.length == 0) {
        store.dispatch('getGeneralData')
      }
  
      //trae info backend
      if (store.state.tasks.length == 0) {
        store.dispatch('getTasks')
      }
  
      //trae info backend
      if (store.state.diagnostics.length == 0) {
        store.dispatch('getDiagnostics')
      }
  
      //trae info backend
      if (store.state.accounts.length == 0) {
        store.dispatch('getAccounts')
      }
  
  
      //trae info backend
      if (store.state.diseases.length == 0) {
        store.dispatch('getDiseases')
      }
  
      return; // Detiene la ejecución para que no cargue otros datos
    }
  
    if (store.state.purchases.length == 0) {
  
      store.dispatch('getPurchases');
    }
    //trae info backend
    if (store.state.tasks.length == 0) {
      store.dispatch('getTasks')
    }
  
    //trae info backend
    if (store.state.mycompany.length == 0) {
      store.dispatch('getGeneralData')
    }
  
  
    //trae info backend
    if (store.state.diagnostics.length == 0) {
      store.dispatch('getDiagnostics')
    }
  
    //trae info backend
    if (store.state.employees.length == 0) {
      store.dispatch('getEmployees')
    }
  
    //trae info backend
    if (store.state.purchases.length == 0) {
      store.dispatch('getPurchases')
    }
  
    //trae info backend
    if (store.state.accounts.length == 0) {
      store.dispatch('getAccounts')
    }
  
    //trae info backend
    if (store.state.stocks.length == 0) {
      store.dispatch('getStocks')
    }
  
  
    //trae info backend
    if (store.state.supplies.length == 0) {
      store.dispatch('getSupplies')
    }
  
  
    //trae info backend
    if (store.state.harvest.length == 0) {
      store.dispatch('getHarvest')
    }
  
    //trae info backend
    if (store.state.diseases.length == 0) {
      store.dispatch('getDiseases')
    }
  
    //trae info backend
    if (store.state.sales.length == 0) {
      store.dispatch('getSales')
    }
  
  
  
  }
  
  
  
  
  