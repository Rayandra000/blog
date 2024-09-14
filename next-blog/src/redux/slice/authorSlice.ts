import { IAuthorState } from "@/type/author";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IAuthorState = {
    id: 0,
    name: "",
    email: "",
    role: "",
    avatar: ""
}

export const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<IAuthorState>) => {
            const { id, name, email, role, avatar } = action.payload

            state.id = id
            state.name = name
            state.email = email
            state.role = role
            state.avatar = avatar
        },
        logoutAction: (state) => {
            state.id = 0
            state.name = ""
            state.email = ""
            state.role = ""
            state.avatar = ""
        }
    }
})

export const { loginAction, logoutAction } = authorSlice.actions
export default authorSlice.reducer