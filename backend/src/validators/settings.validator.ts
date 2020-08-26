export const firstNameValidator = {
    userFirstName: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'First Name too long! Max 30 characters.',
            options: {min: 1, max: 30}
        }
    }
}

export const passwordValidator = {
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: {min: 8}
        },
        trim: true,
        escape: true
    }
}

export const zipValidator = {
    userZip: {
        trim: true,
        escape: true,
        isNumeric: true,
        isLength: {
            errorMessage: 'Profile zip must be 5 characters long.',
            options: {min: 5, max: 5}
        }
    }
}