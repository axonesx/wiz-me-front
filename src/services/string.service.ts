import { IUser } from "@/store/module/user/types"

const formatToInitial = (user: IUser | null): string => {
    let initial = ''
    if(user){
        initial = user?.firstName.substring(0,1).toUpperCase() + user?.lastName.substring(0,1).toUpperCase()
    }
    return initial
}

export {
    formatToInitial,
}