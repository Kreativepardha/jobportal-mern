
import { atom } from 'recoil'







export const userState = atom({
    key: 'userState',
    default: null
})


export const loadingState = ({
    key: 'loadingState',
    default: false
})