import { IState } from "./types"


const initialState: IState = {
    user: null,
    token: null,
    userRequestStatus: '',
    userUpdateRequestStatus: '',
    userUploadAvatarRequestStatus: '',
    userDeleteAvatarRequestStatus: '',
}

const mocks = {
    state: initialState,
}

export { initialState, mocks }