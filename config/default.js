const secret = require('./secret.conf')

module.exports = {
    googleAutorize: {
        client_secret: secret.client_secret,
        redirect_uris: secret.redirect_uris,
        client_id : secret.client_id
    },

    files: {
        file_id: secret.file_id
    },

    googleToken: {
        access_token: secret.access_token,
        refresh_token: secret.refresh_token,
        token_type: secret.token_type,
        expiry_date: secret.expiry_date
    },

    db: {
        db_url: secret.db_url
    },

    routes: {
        root: '/',
        reports: {
            root: '/reports',
            newUsers: '/new-users',
            highestSalaries: '/highest-salaries',
            topEmployees: '/top-employees'
        },
        
        users: {
            root: '/users',
            profile: '/current',
            login: '/login',
            signUp: '/register',
            logout: '/logout',
            edit: '/edit',
            deleteUser: '/delete/:id'
        }
        
    },

    jwt: {
        secret: 'secret'
    },
    
    test: {
        user: secret.test_user,
        password: secret.test_password
    }
}