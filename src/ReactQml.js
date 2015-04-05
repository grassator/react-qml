'use strict';

var React = require('react');
var ReactQmlMount = require('./ReactQmlMount');
var ReactQmlComponent = require('./ReactQmlComponent');

// This makes sure that we use custom ReconcileTransaction that
// doesn't rely on DOM being available
var ReactUpdates = require('react/lib/ReactUpdates');
var ReactQmlReconcileTransaction = require('./ReactQmlReconcileTransaction');
ReactUpdates.injection.injectReconcileTransaction(ReactQmlReconcileTransaction);

function Rectangle() {
    ReactQmlComponent.apply(this, arguments);
}

Rectangle.prototype = Object.create(ReactQmlComponent.prototype);
Rectangle.displayName = 'ReactQmlRectangle';

module.exports = {
    // Qml components
    Rectangle: Rectangle,

    // Custom mounting
    render: ReactQmlMount.render,
    unmountComponentAtNode: ReactQmlMount.unmountComponentAtNode,

    // Proxying default React methods
    createFactory: React.createFactory,
    createClass: React.createClass,
    createElement: React.createElement,
    __spread: React.__spread
};
