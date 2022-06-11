import { getApi } from "@/api"
import { store } from "@/store"

async function handleFetchParameters() {
    if (!store.getters.existParameters){
        return store.dispatch('fetchParameters', getApi())
    }
}

async function logout() {
    store.dispatch('logoutUser')
}


function isAuthenticated(): Promise<boolean> {
    return store.getters.isAuthenticated
}

export {
    isAuthenticated,
    handleFetchParameters,
    logout,
}