/* global Qt */
'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var ReactMultiChild = require('react/lib/ReactMultiChild');
var assign = require('object.assign');
var emptyObject = {};

function ReactQmlComponent() {
    ReactComponent.apply(this, arguments);

    // These properties are expected by ReactMultiChild
    this.node = null;
    this._rootNodeID = null;
    this._mountImage = null;
    this._renderedChildren = null;
    this._rootNodeID = null;
}

ReactQmlComponent.prototype = Object.create(ReactComponent.prototype);

assign(ReactQmlComponent.prototype, ReactMultiChild.Mixin, {
    displayName: 'ReactQmlComponent',

    /**
     * Called by internal creator when Element is available
     * @param {ReactElement} element
     */
    construct: function(element) {
        this._currentElement = element;
    },

    /**
     * Used to describe which object should be returned
     * to the caller of `React.render`
     * @this {ReactQmlComponent}
     * @returns {ReactQmlComponent}
     */
    getPublicInstance: function() {
        return this;
    },

    applyNodeProps: function(oldProps, props) {
        Object.keys(props).forEach(function (key) {
            if (key === 'children' || key === 'key' || key === 'ref') { return; }
            if (props[key] === oldProps[key]) { return; }
            this.node[key] = props[key];
        }, this);
    },

    mountComponent: function(rootID, transaction, context) {
        this._rootNodeID = rootID;
        this.node = Qt.createQmlObject('import QtQuick 2.0; Rectangle {}', context.qmlParent);
        this.node.objectName = rootID;
        var props = this._currentElement.props;
        this.applyNodeProps(emptyObject, props);
        return this.node;
    },

    receiveComponent: function(/*nextComponent, transaction, context */) {
        // React uses this method for duck-typing
    },

    unmountComponent: function() {
        // React uses this method for duck-typing
    }

});

module.exports = ReactQmlComponent;
