import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { IState } from "./types"

const initialState: IState = {
    user: null,
    token: getTokenFromLocalStorage(),
    userRequestStatus: '',
}

const mocks = {
    state: initialState,
}

export { initialState, mocks }