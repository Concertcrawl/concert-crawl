export const signInValidator = {
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least five characters',
            options: {min: 5}
        },
        trim: true,
        escape: true
    },
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
        // normalizeEmail: true,
        trim: true
    }
};
