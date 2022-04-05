import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { IState } from "./types"

const state: IState = {
    token: getTokenFromLocalStorage() || null,
    authStatus: '',
    logoutStatus: '',
}

export default {
    state,
}