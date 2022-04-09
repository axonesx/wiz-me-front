import { getApi } from "@/api"
import { store } from "@/store"

async function handleFetchParameters() {
    if (!store.getters.existParameters){
        return store.dispatch('fetchParameters', getApi())
    }
}

export {
    handleFetchParameters,
}