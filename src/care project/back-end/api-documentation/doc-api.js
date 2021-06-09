const API = {
    USERS: [
        {
            title: "Return all the users",
            Method: "GET",
            url: "domain/users",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: " 22/04/2021",
                    poste: null
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 4,
                    lastName: "admin",
                    firstName: "super",
                    date_of_birth: "25/04/1995",
                    phone: null,
                    email: "superAdmin123@hotmail.com",
                    password: "theSuperAdmin",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 4,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: null,
                    poste: null
                }
            ]
        },
        {
            title: "Return a user",
            Method: "GET",
            url: "domain/user/id",
            response: [
                {
                    id: 0,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                }
            ]
        },
        {
            title: "Delete(deactivate) a user",
            Method: "DELETE",
            url: "domain/user/2",
            response: true
        },
        {
            title: "Add a user",
            Method: "POST",
            url: "domain/user",
            request_body: {
                lastName: "Doe",
                firstName: "Jhon",
                date_of_birth: "25/04/1995",
                phone: "514-381-7598",
                email: "jhonDoe@hotmail.com",
                password: "jhon1234",
                id_sexe: 1,
                access_code: "148596",
                poste: null
            },
            response: true
        },
        {
            title: "Update a user",
            Method: "PUT",
            url: "domain/user/id",
            request_body: {
                id: 3,
                lastName: "Ron",
                firstName: "Weasley",
                date_of_birth: "25/04/1995",
                phone: "514-381-7598",
                email: "jhonDoe@hotmail.com",
                password: "jhon1234",
                is_actif: true,
                creation_date_account: "20/04/2021",
                id_role: 1,
                id_sexe: 1,
                poste: null
            },
            response: true
        },
        {
            title: "Get a user by email and password ",
            Method: "POST",
            url: "domain/user/login",
            request_body: {
                email: "jhonDoe@hotmail.com",
                password: "jhon1234"
            },
            response: {
                id: 3,
                lastName: "Jon",
                firstName: "Doe",
                date_of_birth: "25/04/1995",
                phone: "514-381-7598",
                email: "jhonDoe@hotmail.com",
                password: "jhon1234",
                is_actif: true,
                creation_date_account: "20/04/2021",
                id_role: 1,
                id_sexe: 1,
                poste: null
            }
        },
        {
            title: "recuperer tous les users d'un etablishment",
            Method: "GET",
            url: "domain/usersetablishment/id_etablishment",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "medecin"
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "infirmier"
                },
                {
                    id: 4,
                    lastName: "Toto",
                    firstName: "Titi",
                    date_of_birth: "25/04/1995",
                    phone: null,
                    email: "toto@hotmail.com",
                    password: "theSuperAdmin",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: 15684653,
                    last_date_connected: null,
                    poste: 'infirmier'
                }
            ]
        },
        {
            title: "recuperer tous les representant d'un etablishment",
            Method: "GET",
            url: "domain/representants/id_etablishment",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "medecin chef"
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "medecin"
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: "infirmier"
                },
                {
                    id: 4,
                    lastName: "Toto",
                    firstName: "Titi",
                    date_of_birth: "25/04/1995",
                    phone: null,
                    email: "toto@hotmail.com",
                    password: "theSuperAdmin",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: null,
                    poste: "secretaire"
                }
            ]
        },
        {
            title: "recuperer tous les representantants associes à un patient",
            Method: "GET",
            url: "domain/patient/representants/id_user",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "infirmier"
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "medecin"
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: "infirmier"
                }
            ]
        },
        {
            title: "recuperer tous les patients dans un etablishment",
            Method: "GET",
            url: "domain/patient/id_etablishment",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: null
                }
            ]
        },
        {
            title: "Delete(deactivate) a user",
            Method: "PUT",
            url: "domain/user/desactivate/id",
            response: true
        },
        {
            title: "Recuperer un user d'un etablissement",
            Method: "GET",
            url: "domain/user/id_user/id_etablishment",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                }
            ]
        },
        {
            title: "Recuperer tous les patients de suivi actif(s) dans un etablishment",
            Method: "GET",
            url: "domain/patients/suivi/actif",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: null
                }
            ]
        },
        {
            title: "Recuperer tous les users selon statut",
            Method: "GET",
            url: "domain/users/actif",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: " 22/04/2021",
                    poste: null
                },
                {
                    id: 3,
                    lastName: "Marc",
                    firstName: "Stein",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "marcStein@hotmail.com",
                    password: "marcStein123456",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 3,
                    id_sexe: 1,
                    access_code: 142536,
                    last_date_connected: "22/04/2021",
                    poste: null
                },
                {
                    id: 4,
                    lastName: "admin",
                    firstName: "super",
                    date_of_birth: "25/04/1995",
                    phone: null,
                    email: "superAdmin123@hotmail.com",
                    password: "theSuperAdmin",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 4,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: null,
                    poste: null
                }
            ]
        },
        {
            title: "recuperer tous les users selon categorie",
            Method: "GET",
            url: "domain/usersetablishment/{id_role}",
            response: [
                {
                    id: 1,
                    lastName: "Doe",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonDoe@hotmail.com",
                    password: "jhon1234",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 1,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "infirmiere"
                },
                {
                    id: 2,
                    lastName: "Smith",
                    firstName: "Jhon",
                    date_of_birth: "25/04/1995",
                    phone: "514-381-7598",
                    email: "jhonSmmith154@hotmail.com",
                    password: "jhon145",
                    is_actif: true,
                    creation_date_account: "20/04/2021",
                    id_role: 2,
                    id_sexe: 1,
                    access_code: null,
                    last_date_connected: "22/04/2021",
                    poste: "infirmier"
                }
            ]
        },
        {
            title: "Add a note to a patient",
            Method: "POST",
            url: "domain/user/add-note/{id_user}",
            request_body: {
                id_user: 5,
                note: "Fumeur"
            },
            response: true
        }
    ],
    ROLE: [
        {
            title: "Recuperer le role selon id",
            Method: "GET",
            url: "domain/role/1",
            response: [
                {
                    id: 1,
                    description: "admin"
                }
            ]
        },
        {
            title: "Recuperer tous les roles",
            Method: "GET",
            url: "domain/roles",
            response: [
                {
                    id: 1,
                    description: "admin"
                },
                {
                    id: 2,
                    description: "representant"
                },
                {
                    id: 3,
                    description: "patient"
                },
                {
                    id: 4,
                    description: "super admin"
                }
            ]
        }
    ],
    etablishment: [
        {
            title: "Return all the establishement",
            Method: "GET",
            url: "domain/establishements",
            response: [
                {
                    id: 1,
                    name: "Centaire dentaire Montreal",
                    description: "Clinique Dentaire",
                    logo_url: "clinique_dentaire_logo",
                    phone: "514-284-7599",
                    email: "cliniquemedical@hotmail.com",
                    adress: "1234, rue des BoisBirand"
                },
                {
                    id: 2,
                    name: "chum",
                    logo_url: "chum_logo",
                    description: "Hospital",
                    phone: "514-458-8015",
                    email: "chuml@hotmail.com",
                    adress: "1589, rue des hopitaux"
                },
                {
                    id: 2,
                    name: "Mio",
                    logo_url: "Mio_logo",
                    description: "Viterinaire",
                    phone: "514-458-8015",
                    email: "chuml@hotmail.com",
                    adress: "1589, rue des hopitaux"
                }
            ]
        },
        {
            title: "add an establishement",
            Method: "POST",
            url: "domain/establishement",
            request_body: {
                etablishment: {
                    id: 3,
                    name: "hopital Juif",
                    logo_url: "hopital_juif_logo",
                    phone: "514-786-7555",
                    email: "hopital-juif@hotmail.com",
                    adress: "1434, boulevard Maisonneuve",
                    description: "Hospital"
                },
                admin: {
                    lastName: "Ndiaye",
                    firstName: "biran",
                    email: "biran.n@gmail.com",
                    password: "biran123"
                }
            },
            response: true
        },
        {
            title: "Update an establishement",
            Method: "PUT",
            url: "domain/establishement/3",
            request_body: {
                id: 3,
                name: "hopital Juif",
                logo_url: "hopital_juif_logo",
                phone: "514-786-7555",
                email: "hopital-juif@hotmail.com",
                adress: "4200, rue des passants",
                description: "Hospital"
            },
            response: true
        },
        {
            title: "Get an establishement by id",
            Method: "GET",
            url: "domain/establishement/id",
            response: [
                {
                    id: 3,
                    name: "hopital Juif",
                    logo_url: "hopital_juif_logo",
                    phone: "514-786-7555",
                    email: "hopital-juif@hotmail.com",
                    adress: "1434, boulevard Maisonneuve",
                    description: "Hospital"
                }
            ]
        },
        {
            title: "Delete an establishement",
            Method: "DELETE",
            url: "domain/establishement/1",
            response: true
        },
        {
            title: "recuperer les etablishments ou un user a des suivis actif ou pas",
            Method: "GET",
            url: "domain/establishement/id_user",
            response: [
                {
                    id: 1,
                    name: "Centre dentaire Montreal",
                    description: "Clinique Dentaire",
                    logo_url: "clinique_dentaire_logo",
                    phone: "514-284-7599",
                    email: "cliniquemedical@hotmail.com",
                    adress: "1234, rue des BoisBirand"
                },
                {
                    id: 2,
                    name: "chum",
                    logo_url: "chum_logo",
                    description: "Hospital",
                    phone: "514-458-8015",
                    email: "chuml@hotmail.com",
                    adress: "1589, rue des hopitaux"
                },
                {
                    id: 2,
                    name: "Mio",
                    logo_url: "Mio_logo",
                    description: "Viterinaire",
                    phone: "514-458-8015",
                    email: "chuml@hotmail.com",
                    adress: "1589, rue des hopitaux"
                }
            ]
        },
        {
            title: "Recuperer les etablishments d'un utilisateur avec au moins un suivi actif",
            Method: "GET",
            url: "domain/establishement/id_user",
            response: [
                {
                    id: 1,
                    name: "Centre dentaire Montreal",
                    description: "Clinique Dentaire",
                    logo_url: "clinique_dentaire_logo",
                    phone: "514-284-7599",
                    email: "cliniquemedical@hotmail.com",
                    adress: "1234, rue des BoisBirand"
                },
                {
                    id: 2,
                    name: "chum",
                    logo_url: "chum_logo",
                    description: "Hospital",
                    phone: "514-458-8015",
                    email: "chuml@hotmail.com",
                    adress: "1589, rue des hopitaux"
                }
            ]
        }
    ],
    SERVICE: [
        {
            title: "Return all  services ",
            Method: "GET",
            url: "domain/establishements",
            response: [
                {
                    id: 1,
                    description: "operation de l'epaule droit",
                    id_etablishment: 2
                },
                {
                    id: 2,
                    description: "retrait d'une dent de sagesse",
                    id_etablishment: 1
                }
            ]
        },
        {
            title: "Return all the services by establishement",
            Method: "GET",
            url: "domain/services/id_etablishment",
            response: [
                {
                    id: 1,
                    description: "prothèse dentaire",
                    id_etablishment: 1
                },
                {
                    id: 2,
                    description: "retrait d'une dent de sagesse",
                    id_etablishment: 1
                }
            ]
        },
        {
            title: "Return service by id",
            Method: "GET",
            url: "domain/service/1",
            response: [
                {
                    id: 1,
                    description: "prothèse dentaire",
                    id_etablishment: 1
                }
            ]
        },
        {
            title: "Add a service",
            Method: "POST",
            url: " domain/service",
            request_body: {
                description: "Chirugie du coeur",
                id_etablishment: 2
            },
            response: true
        },
        {
            title: "Update a service",
            Method: "PUT",
            url: "domain/service/1",
            request_body: {
                id: 1,
                description: "Chirugie du coeur",
                id_etablishment: 2
            },
            response: true
        },
        {
            title: "Delete a service",
            Method: "DELETE",
            url: "domain/service/1",
            response: true
        }
    ],
    SUIVI:[
        {
            title: "Return all the medical follow-up",
            Method: "GET",
            url: "domain/medical-follow-ups",
            response: [
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service: 1
                },
                {
                    id : 2,
                    id_user : 2,
                    is_actif : true,
                    date_started : '28/03/2021',
                    id_service: 2
                }
            ]
        },
        {
            title: "Return a medical follow-up by id",
            Method: "GET",
            url: "domain/medical-follow-up/id",
            response:
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service : 1
                }
            
        },
        {
            title: "Add a medical follow-up",
            Method: "POST",
            url: "domain/medical-follow-up",
            request_body:{
                id_user : 1,
                id_service : 3
            },
            response: true
        },
        {
            title: "Update a medical follow-up",
            Method: "PUT",
            url: "domain/medical-follow-up",
            request_body:{
                id:1,
                id_user : 1,
                is_actif : true,
                id_service: 2
            },
            response: true
        },
        {
            title: "Delete a medical follow-u",
            Method: "DELETE",
            url: "domain/medical-follow-up/id",
            response: true
        },
        {
            title: "Recuperer tous les suivis associes a un representant",
            Method: "GET",
            url: "domain/representants/suivi/id_representant",
            response: [
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service: 1
                },
                {
                    id : 2,
                    id_user : 2,
                    is_actif : true,
                    date_started : '28/03/2021',
                    id_service: 2
                }
                ,
                {
                    id : 2,
                    id_user : 2,
                    is_actif : false,
                    date_started : '28/03/2019',
                    id_service: 2
                }
            ]
        },
        {
            title: "recuperer tous les suivis d'un user dans un etablishment",
            Method: "GET",
            url: "domain/suivis/id_user/id_etablishment",
            response: [
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service: 1
                },
                {
                    id : 2,
                    id_user : 2,
                    is_actif : false,
                    date_started : '28/03/2019',
                    id_service: 2
                }
            ]
        },
        {
            title: " Associer traitement à un suivi",
            Method: "POST",
            url: "domain/add-treatment-follow-up",
            request_body:{
                id_suivi: 1,
                id_traitement: 2
            },
            response: true
        },
        {
            title: "Recuperer tous les messages echangées dans un suivi",
            Method: "GET",
            url: "domain/medical-follow-up/messages/:id_follow-up",
            response: [
                {
                    id : 1,
                    text : "allo",
                    img_url : "left_shoulder_surgery.png",
                    video_url : null,
                    date_time: "24-02-2021",
                    id_user_from: 1,
                    id_user_to: 20,
                    id_suivi: 15
                },
                {
                    id : 2,
                    text : "Bonjour monsieur",
                    img_url : null,
                    video_url : null,
                    date_time: "24-02-2021",
                    id_user_from: 20,
                    id_user_to: 1,
                    id_suivi: 15
                }
            ]
        },
        {
            title: "Deactivate a follow-up",
            Method: "PUT",
            url: "domain/deactivate-medical-follow-up/id",
            request_body:{
                id_suivi: 1
            }
        },
        {
            title: "Add a rep to a follow-up",
            Method: "POST",
            url: "domain/medical-follow-up/add-rep",
            request_body:{
                id_user : 1,
                id_suivi : 3
            },
            response: true
        },
        {
            title: "Return all active medical follow-up related to a rep",
            Method: "GET",
            url: "domain/active-medical-follow-ups/{id_user(rep)}",
            response: [
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service: 1
                },
                {
                    id : 2,
                    id_user : 2,
                    is_actif : true,
                    date_started : '28/03/2021',
                    id_service: 2
                }
            ]
        },
        {
            title: "Ajouter un questionnaire a un suivi",
            Method: "POST",
            url: "domain/medical-follow-up/add-questionnaire",
            request_body:{
                id_service : 1,
            },
            response: true
        },
    ],
    TRAITEMENT:[
        {
            title: "Return all the treatements",
            Method: "GET",
            url: "domain/treatments",
            response: [
                {
                    id : 1,
                    id_user : 1,
                    is_actif : true,
                    date_started : '25/03/2021',
                    id_service: 1
                },
                {
                    id : 2,
                    id_user : 2,
                    is_actif : true,
                    date_started : '28/03/2021',
                    id_service: 2
                }
            ]
        },
        {
            title: "Return a treatement by id",
            Method: "GET",
            url: "domain/treatment/id",
            response: [
                {
                    id : 1,
                    description: "Shoulder circles",
                    id_service: 1
                }
            ]
        },
        {
            title: "Add a treatement",
            Method: "POST",
            url: "domain/treatment",
            request_body:{
                description: "Doorway shoulder stretch",
                id_service: 1
            },
            response: true
        },
        {
            title: "Update a treatement",
            Method: "PUT",
            url: "domain/treatment",
            request_body:{
                id:1,
                description:  "Neck Releases",
                id_service : 1

            },
            response: true
        },
        {
            title: "Delete a treatement",
            Method: "DELETE",
            url: "domain/treatment/id",
            response: true
        },
        {
            title: " Recuperer tous les traitements à un suivi ",
            Method: "GET",
            url: "domain/treatments/id_suivi",
            response: [
                {
                    id : 1,
                    description : "changer de pansement",
                    id_service : 2,
                },
                {
                    id : 2,
                    description : "prendre une pillule (tylenol) chaque 6 heures ",
                    id_service : 5,
                }
            ]
        }
        
    ],
    STATS:[
        {
            title: "Recuperer le nombre total de message echanges dans un etablishment",
            Method: "GET",
            url: "domain/nombre-de-message/id_etablishment",
            response: 156
        },
        {
            title: "Recuperer le nombre total de message echanges dans toute la plate-forme",
            Method: "GET",
            url: "domain/nombre-de-message",
            response: 845
        },
        {
            title: "Recupere le nombre de message en moyenne echanges par jour dans un etablishment",
            Method: "GET",
            url: "domain/nombre-de-message-par-jour/id_etablishment",
            response: 125.5
        },
        {
            title: "Recupere le nombre de message en moyenne echanges par jour dans toute la plate-forme",
            Method: "GET",
            url: "domain/nombre-de-message-par-jour",
            response: 501.87
        },
        {
            title: "Recuperer le nombre de patient connected par jour lors de la derniere semaine dans un etablishment",
            Method: "GET",
            url: "domain/nombre-de-patients-connected-par-jour/id_etablishment",
            response: [
                {
                    day: "Lundi",
                    connected: 38
                },
                {
                    day: "Mardi",
                    connected: 52
                },
                {
                    day: "Mercredi",
                    connected: 61
                },
                {
                    day: "Jeudi",
                    connected: 45
                },
                {
                    day: "Vendredi",
                    connected: 48
                },
                {
                    day: "Samedi",
                    connected: 38
                },
                {
                    day: "Dimanche",
                    connected: 38
                }
            ]
        },
        {
            title: "Recuperer le nombre de patient connected par jour lors de la derniere semaine dans toute la plate-forme",
            Method: "GET",
            url: "domain/nombre-de-patients-connected-par-jour",
            response: [
                {
                    day: "Lundi",
                    connected: 38
                },
                {
                    day: "Mardi",
                    connected: 52
                },
                {
                    day: "Mercredi",
                    connected: 61
                },
                {
                    day: "Jeudi",
                    connected: 45
                },
                {
                    day: "Vendredi",
                    connected: 48
                },
                {
                    day: "Samedi",
                    connected: 38
                },
                {
                    day: "Dimanche",
                    connected: 38
                }
            ]
        }
    ],
    REPONSES:[
        {
            title: "Add response(s) to question",
            Method: "POST",
            url: "domain/add-response",
            request_body:{
               response: "oui",
                id_question: 2
            },
            response: true
        },
        // {
        //     title: "Recuperer tous les reponses d'un user dans un suivi",
        //     Method: "GET",
        //     url: "domain/all-responses/{id-follow-up}",
        //     response: {
        //        
        //     }
        // }
    ],
    FREQUENCE:[
        {
            title: "Modifier frequence traitement",
            Method: "POST",
            url: "domain/frequence/update-treatment",
            request_body:{
                amplitude_jour: 1,
                frequence_par_jour: 3,
                id_traitement:  1,
                id_suivi_questionnaire : null

            },
            response:true
        },
        {
            title: "Modifier frequence suivi questionnaire",
            Method: "POST",
            url: "domain/frequence/update-suivi-questionnaire",
            request_body:{
                amplitude_jour: 2,
                frequence_par_jour: 1,
                id_traitement:  null,
                id_suivi_questionnaire : 1

            },
            response:true
        }
    ],
    QUESTION:[
        {
            title:"Recuperer la liste des questions dans un questionnaire",
            Method: "GET",
            url: "domain/questionnaire/list-questions",
            response: [
                {
                    question: "Quel est le niveau de votre douleur?"
                },
                {
                    question: "À quel endroit ressentez-vous la douleur?"
                }
            ]
        },
        {
            title:"Ajouter une question",
            Method: "POST",
            url: "domain/add-question",
            request_body:[
                {                          
                    QUESTION:{
                        question:"Ressentez-vous la douleur?",
                        is_boolean:true,
                        is_multiple_choice:null
                    },
                    QUESTIONNAIRE_RESPONSES:{
                        response:true,
                        id_question:1
                    }
                },
                {
                    QUESTION:{
                        question:"Ou sont vos symptomes?",
                        is_boolean:null,
                        is_multiple_choice:true
                    },
                    QUESTIONNAIRE_RESPONSES:{
                        response:["bras","epaule","tête"],
                        id_question:2
                    }
                }
            ],
            response:true
        },
        {
            title:"Modifier une question",
            Method: "PUT",
            url: "domain/update-question",
            request_body:
                {
                    QUESTION:{
                        id:1,
                        question:"Ressentez-vous de la douleur?",
                        is_boolean:true,
                        is_multiple_choice:null
                    }
                },
            response: true
        },
        {
            title:"Modifier le ou les reponse d'une question",
            Method: "PUT",
            url: "domain/update-response",
            request_body:[
                {
                    QUESTIONNAIRE_RESPONSES:{
                        id:1,
                        response:false,
                        id_question:1,
                    }
                },
                {
                    QUESTIONNAIRE_RESPONSES:{
                        id:2,
                        response:["jambe","epaule"],
                        id_question:2
                    }
                }
                
            ],
            response: true
        },
        {
            title:"Recuperer les reponses à un questionnaire d'un utitlisateur dans un suivi",
            Method: "GET",
            url: "domain/questionnaire/responses/follow-up/{id_suivi_questionnaire}",
            response:[
                {
                    id:1,
                    reponse:true,
                    question:"Ressentez-vous de la douleur?"
                }
            ] 
        }
    ]
}
//