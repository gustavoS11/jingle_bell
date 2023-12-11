module.exports = function (app) {
    app.get('/', function (req, res) {
        app.app.controller.controller.render(app, req, res)
    })

    app.post('/mostrarGrafico', function (req, res) {
        app.app.controller.controller.mostrarGrafico(app, req, res)
    })
}