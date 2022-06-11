export default {
    registration: {
        title: `Créer un compte :`,
        subtitle: `Compléter les informations ci-dessous`,
        button: `S'ENREGISTRER`,
        form: {
            email: {
                label: `Entrez votre email`,
                required: `L'email est requis.`,
                isEmail: `Doit être un email.`,
            },
            password: {
                label: `Entrez votre mot de passe`,
                required: `Le mot de passe est requis.`,
                isPassword: `Le mot de passe doit contenir au moins : 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.`,
            },
            confirmPassword: {
                label: `Confirmez votre mot de passe`,
                required: `Le mot de passe est requis.`,
                sameAsPassword: `Les mots de passes ne sont pas identiques`,
            },
            firstName: {
                label: `Entrez votre prénom`,
                required: `Votre prénom est requis.`,
                maxLength: `Votre prénom doit être < 200 caractères.`,
                minLength: `Votre prénom doit être > 2 caractères.`,
            },
            lastName: {
                label: `Entrez votre nom`,
                required: `Votre nom est requis.`,
                maxLength: `Votre nom doit être < 200 caractères.`,
                minLength: `Votre nom doit être > 2 caractères.`,
            },
            birthday: {
                label: `Entrez votre date de naissance`,
                required: `Votre anniversaire est requis.`,
            },
            description: {
                maxLength: `La description doit être < 1000 caractères.`,
            }
        },
        error: {
            text: `Une erreur est survenue durant la création de votre compte, veuillez recommencer s'il vous plait.`,
            title: `Erreur d'enregistrement !`
        },
        login:{
            span: `Déjà enregistré ? `,
            link: `S'identifier ici`
        }
    }
}