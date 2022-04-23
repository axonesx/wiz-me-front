import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { initialState } from "./mocks"
import { IState } from "./types"

const state: IState = {
    ...initialState
}

export default {
    state
}