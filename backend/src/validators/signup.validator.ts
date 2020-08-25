export const signupValidator = {
    userFirstName: {
        escape: true,
        trim: true,
        isLength: {
            errorMessage: 'First Name too long! Max 30 characters.',
            options: { max: 30 }
        }
    },
    userLastName: {
        trim: true,
        escape: true,
        isLength: {
            errorMessage: 'First Name too long! Max 30 characters.',
            options: { max: 30 }
        }
    },
    userProfileName: {
        trim: true,
        escape: true,
        isLength: {
            errorMessage: 'Profile name must be between 5 and 30 characters.',
            options: { min: 5, max: 30 }
        }
    },
    userZip: {
        trim: true,
        escape: true,
        isNumeric: true,
        isLength: {
            errorMessage: 'Profile name must be between 5 and 30 characters.',
            options: { min: 5, max: 5 }
        }
    },
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
        normalizeEmail: true,
        trim: true
    },
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true
    },
    userPasswordConfirm: {
        isLength: {
            errorMessage: 'confirm password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true
    }
};
