'use strict';

var React = require('react');
var ReactQmlMount = require('./ReactQmlMount');
var ReactQmlQtQuick = require('./ReactQmlQtQuick');

// This makes sure that we use custom ReconcileTransaction that
// doesn't rely on DOM being available
var ReactUpdates = require('react/lib/ReactUpdates');
var ReactQmlReconcileTransaction = require('./ReactQmlReconcileTransaction');
ReactUpdates.injection.injectReconcileTransaction(ReactQmlReconcileTransaction);

module.exports = {
    // Qml components
    QtQuick: ReactQmlQtQuick,

    // Custom mounting
    render: ReactQmlMount.render,
    unmountComponentAtNode: ReactQmlMount.unmountComponentAtNode,

    // Proxying default React methods
    createFactory: React.createFactory,
    createClass: React.createClass,
    createElement: React.createElement,
    __spread: React.__spread
};
