



export async function signupUserController(request: Request, response: Response) {
    try {

        const {profileAtHandle, profileEmail, profilePhone, profilePassword} = request.body;
        const profileHash = await setHash(profilePassword);
        const profileActivationToken = setActivationToken();
        const profileAvatarUrl = "http://www.fillmurray.com/100/150"
        const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}activation/${profileActivationToken}`
        console.log(profileActivationToken)