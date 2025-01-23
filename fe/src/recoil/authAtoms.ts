
import { atom } from 'recoil'







export const userState = atom<any>({
    key: 'userState',
    default: null
})


export const loadingState = atom<boolean>({
    key: 'loadingState',
    default: false
})