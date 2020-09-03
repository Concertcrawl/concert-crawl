export const searchValidator = {
        name: {
            trim: true,
            optional: true,
            isLength: {
                errorMessage: 'Max input length is 100 characters.',
                options: {max: 100}
            }
        },
        genre: {
            trim: true,
            optional: true,
            isLength: {
                errorMessage: 'Max input length is 100 characters.',
                options: {max: 100}
            }
        },
        location: {
            trim: true,
            escape: true,
            isNumeric: true,
            optional: true,
            isLength: {
                errorMessage: 'Zip code must be 5 characters.',
                options: {min: 5, max: 5}
            }
        },
        sDate: {
            isDate: true,
            escape: true,
            trim: true,
            optional: true,
        },
        eDate: {
            isDate: true,
            escape: true,
            trim: true,
            optional: true,
        },
        venue: {
            escape: true,
            trim: true,
            optional: true,
            isLength: {
                errorMessage: 'Venue max name is 200.',
                options: {max: 200}
            }
        },
        page: {
            escape: true,
            trim: true,
            isNumeric: true,
        }
    }
