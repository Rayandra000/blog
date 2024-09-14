export interface IAuthorReg {
    name: string
    email: string
    password: string
}

export interface IAuthorLogin {
    email: string
    password: string
}

export interface IAuthorState {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
}