export default {
    login: {
        title: `S'identifier :`,
        subtitle: `Remplissez les informations ci-dessous`,
        button: `S'IDENTIFIER`,
        form: {
            email:`Entrez votre Email`,
            password:`Entrez votre mot de passe`
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