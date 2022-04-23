export default {
    login: {
        title: `S'identifier :`,
        subtitle: `Remplissez les informations ci-dessous`,
        button: `S'IDENTIFIER`,
        form: {
            email: {
                label: `Entrez votre email`,
                required: `Votre email est requis.`,
                isEmail: `Doit être un email.`,
            },
            password: {
                label: `Entrez votre mot de passe`,
                required: `Votre mot de passe est requis.`,
            },
        },
        error: {
            title: `Erreur d'identification !`,
            text: `Une erreur est survenue durant votre identification, votre compte n'est pas activé.`
        },
        registration:{
            span: `Pas encore enregistré ? `,
            link: `Enregistrez vous ici`,
            success: {
                title: `Enregistrement réussi !`,
                textAlreadyRegistrated: `Vous vous etiez déjà enregistré, veuillez confirmer votre mail en vérifiant votre boîte de réception.`,
                textNotYetRegistrated: `Vous vous êtes correctement enregistré, veuillez confirmer votre mail en vérifiant votre boîte de réception.`
            },
        }
    },
    logout: {
        success: {
            title: `Déconnexion !`,
            text: `Vous vous êtes déconnecté avec succés.`
        }
    }
}