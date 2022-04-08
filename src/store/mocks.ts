import { getTokenFromLocalStorage } from "@/services/local-storage.service"


interface IUser {
    email?: string
    firstName?: string
    lastName?: string
    birthday?: Date
}

const initialState = {
    user: {},
    token: getTokenFromLocalStorage(),
    parameters: null,
    isFetchingParameters: false,
}

const mocks = {
    state: initialState,
    user: {
        email: 'axonesx@gmail.com',
        firstName: 'Antoine',
        lastName: 'Wattiaux',
        birthday: new Date('1991-03-13T02:30:00'),
    }
}

export { initialState, mocks }