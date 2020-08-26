export interface SetUserName {
    userId: string,
    userFirstName: string
}

export interface SetPassword {
    userId: string,
    userHash: string
}

export interface SetZip {
    userId: string,
    userZip: number
}