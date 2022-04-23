import { getApi } from "@/api"
import { store } from "@/store"
import { isActiveToken } from "./local-storage.service"

async function handleFetchParameters() {
    if (!store.getters.existParameters){
        return store.dispatch('fetchParameters', getApi())
    }
}

async function logout() {
    if(isActiveToken()) {
        store.dispatch('logoutUser')
    } else {
        store.dispatch('logoutUserFromFront')
    }
}

export {
    handleFetchParameters,
    logout,
}