import { getApi } from "@/api"
import { store } from "@/store"
import { isActiveToken } from "./local-storage.service"

async function handleFetchParameters() {
    if (!store.getters.existParameters){
        return store.dispatch('fetchParameters', getApi())
    }
}

async function authActive() {
    store.dispatch('authActive')
}

async function logout() {
    if(isActiveToken()) store.dispatch('logoutUser')
    if(!isActiveToken()) store.dispatch('logoutUserFromFront')
}

export {
    handleFetchParameters,
    authActive,
    logout,
}