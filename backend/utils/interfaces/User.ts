export interface User {
    userId: string|null,
    userFirstName: string,
    userLastName: string,
    userProfileName: string,
    userEmail: string,
    userHash: string,
    userActivationToken: string|null,
    userZip: number
}