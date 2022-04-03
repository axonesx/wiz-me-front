const initialState = {
    user: null,
    parameters: null,
    isFetchingParameters: false,
}

const mocks = {
    state: initialState,
    user: {
        email: 'axonesx@gmail.com',
        password: 'test',
        firstName: 'Antoine',
        lastName: 'Wattiaux',
        birthday: new Date('1991-03-13T02:30:00'),
    }
}

export { initialState, mocks }