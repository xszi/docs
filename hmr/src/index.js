const sum = require('./sum')
document.body.innerHTML = 'Hello' + sum(1, 3)
if (module.hot) {
    module.hot.accept()
}