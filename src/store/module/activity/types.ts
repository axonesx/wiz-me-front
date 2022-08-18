interface IState {
    activityStatus: string
}

interface Activity {
    title: string
    startDate:Date
    endDate: Date
    description: string
    place: string
}

export { IState, Activity, }