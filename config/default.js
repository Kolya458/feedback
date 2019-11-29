module.exports = {
    googleAutorize: {
        client_secret: process.env.client_secret,
        redirect_uris: process.env.redirect_uris,
        client_id : process.env.client_id
    },

    files: {
        file_id: process.env.file_id
    },

    googleToken: {
        access_token: process.env.access_token,
        refresh_token: process.env.refresh_token,
        token_type: process.env.token_type,
        expiry_date: process.env.expiry_date
    },

    db: {
        db_url: process.env.db_url
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
            logout: '/logout'
        }
        
    },

    jwt: {
        secret: 'secret'
    },
    
    test: {
        user: process.env.test_user,
        password: process.env.test_password
    }
}