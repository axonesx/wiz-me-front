import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { IState } from "./types"

const state: IState = {
    token: getTokenFromLocalStorage() || '',
    status: '',
}

export default {
    state,
}