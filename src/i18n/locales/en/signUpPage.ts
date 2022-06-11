export default {
    registration: {
        title: `Sign up :`,
        subtitle: `Please register yourself`,
        button: `SIGN UP`,
        form: {
            email: {
                label: `Enter your email`,
                required: `Email is required.`,
                isEmail: `Must be an email.`,
            },
            password: {
                label: `Enter your Password`,
                required: `Password is required.`,
                isPassword: `Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.`,
            },
            confirmPassword: {
                label: `Confirm your Password`,
                required: `Password is required.`,
                sameAsPassword: `Must be the same as password.`,
            },
            firstName: {
                label: `Enter your first name`,
                required: `First name is required.`,
                maxLength: `First name should be < 200 caracters.`,
                minLength: `First name should be > 2 caracters.`,
            },
            lastName: {
                label: `Enter your last name`,
                required: `Last name is required.`,
                maxLength: `Last name should be < 200 caracters.`,
                minLength: `Last name should be > 2 caracters.`,
            },
            birthday: {
                label: `Enter your birthday`,
                required: `Birthday is required.`,
            },
            description: {
                maxLength: `Description should be < 1000 caracters.`,
            }
        },
        error: {
            title: `Registration Error !`,
            text: `An Error occured during registration, please try again.`
        },
        success: {
            title: `Registration Success !`,
            text: `Please check your email, and confirm the link send by Wiz-us Team before login.`
        },
        login:{
            span: `Already registred ? `,
            link: `Log in here`
        }
    }
}