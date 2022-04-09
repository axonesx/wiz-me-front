import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { IState } from "./types"

const state: IState = {
    signUpStatus: '',
}

export default {
    state,
}