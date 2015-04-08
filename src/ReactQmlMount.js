'use strict';

var React = require('react');
var ReactReconciler = require('react/lib/ReactReconciler');
var ReactUpdates = require('react/lib/ReactUpdates');
var ReactUpdateQueue = require('react/lib/ReactUpdateQueue');
var shouldUpdateReactComponent = require('react/lib/shouldUpdateReactComponent');
var instantiateReactComponent = require('react/lib/instantiateReactComponent');

var ReactQmlRoot = require('./ReactQmlRoot');
var ReactQmlComponent = require('./ReactQmlComponent');
var ReactQmlComponentCompositeWrapper = React.createClass({
    render: function () {
        return this.props.children;
    }
});

/**
 * Mounts this component and inserts it into the QML Document.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {string} rootID ID of the root node.
 * @param {QtObject} container container element to mount into.
 * @param {ReactReconcileTransaction} transaction
 */
function mountComponentIntoNode(componentInstance, rootID, container, transaction) {
    ReactReconciler.mountComponent(componentInstance, rootID, transaction, {
        qmlParent: container
    });
    // usually here we would actually mount node to native tree, but
    // in case of QML it is unnecessary because QML specifies `root`
    // during the creation of QML element
}

/**
 * Batched mount.
 *
 * @param {ReactComponent} componentInstance The instance to mount.
 * @param {string} rootID objectName of the root node (QtObject).
 * @param {QtObject} container QtObject to mount into.
 */
function batchedMountComponentIntoNode(componentInstance, rootID, container) {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(
        mountComponentIntoNode, null,
        componentInstance, rootID, container, transaction
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);
}

// these two arrays act as two-directional map
var containers = [];
var components = [];

function getComponentForContainer(container) {
    return components[containers.indexOf(container)];
}

function updateRootComponent(prevComponent, nextElement, container, callback) {
    ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
    if (callback) {
        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
    }
    return prevComponent;
}

function renderNewRootComponent(nextElement, container) {

    var componentInstance = instantiateReactComponent(nextElement, null);
    var reactRootID = 'qml' + Math.ceil(Math.random() * 100000);

    // The initial render is synchronous but any updates that happen during
    // rendering, in componentWillMount or componentDidMount, will be batched
    // according to the current batching strategy.
    ReactUpdates.batchedUpdates(
        batchedMountComponentIntoNode,
        componentInstance, reactRootID, container
    );

    return componentInstance;
}

exports.unmountComponentAtNode = function (container) {
    var index = containers.indexOf(container);
    if (index < 0) { return; }
    var instance = components.splice(index, 1)[0];
    containers.splice(index, 1);
    ReactReconciler.unmountComponent(instance);
};

exports.render = function (nextElement, container, callback) {
    if (!ReactQmlRoot.root) {
        ReactQmlRoot.updateRootFromContainer(container);
    }

    // This is necessary to avoid ReactQmlComponent being subclass of ReactCompositeComponent
    // at least as of version 0.13.1 Facebook employs similar hack
    if (nextElement.type.prototype.qmlType) {
        nextElement = React.createElement(ReactQmlComponentCompositeWrapper, null, nextElement);
    }

    var prevComponent = getComponentForContainer(container);

    if (prevComponent) {
        var prevElement = prevComponent._currentElement;
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
            return updateRootComponent(prevComponent, nextElement, container, callback);
        } else {
            exports.unmountComponentAtNode(container);
        }
    }

    var component = renderNewRootComponent(nextElement, container);
    containers.push(container);
    components.push(component);
    if (callback) {
        callback.call(component);
    }
    return component;
};
