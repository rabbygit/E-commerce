const authRoute = require('./authRoute');

const routes = [
    {
        path: '/api/auth',
        handler: authRoute
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({"message": "Congratulations! you are working great!"});
        }
    }
]


module.exports = app => {
    routes.forEach(route => {
        if (route.path == '/') {
            app.get(route.path, route.handler) // Root route
        } else {
            app.use(route.path, route.handler)
        }
    })
}