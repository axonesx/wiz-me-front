export default {
    login: {
        title: `Log in :`,
        subtitle: `Please identify yourself`,
        button: `LOGIN`,
        form: {
            email: {
                label: `Enter your email`,
                required: `Email is required.`,
                isEmail: `Must be an email.`,
            },
            password: {
                label: `Enter your Password`,
                required: `Password is required.`,
            },
        },
        error: {
            title: `Login Error !`,
            text: `Your account is not activated.`
        },
        registration:{
            span: `Not yet registered ? `,
            link: `Sign up here`,
            success: {
                title: `Sign Up success !`,
                textAlreadyRegistrated: `You registrated yourself with success, please check your emails to confirm your account.`,
                textNotYetRegistrated: `Your account allready exist, please check your emails to confirm your account.`
            },
        }
    },
    logout: {
        success: {
            title: `Logout Success !`,
            text: `You log out with success.`
        }
    }
}