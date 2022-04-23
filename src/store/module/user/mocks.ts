import { getTokenFromLocalStorage } from "@/services/local-storage.service"
import { IState } from "./types"


const initialState: IState = {
    user: null,
    token: null,
    userRequestStatus: '',
    userUpdateRequestStatus: '',
}

const mocks = {
    state: initialState,
}

export { initialState, mocks }