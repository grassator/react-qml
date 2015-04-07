/* global Qt */
'use strict';

var ReactComponent = require('react/lib/ReactComponent');
var ReactMultiChild = require('react/lib/ReactMultiChild');
var assign = require('object.assign');
var emptyObject = {};

function ReactQmlComponent() {}

ReactQmlComponent.prototype = Object.create(ReactComponent.prototype);

assign(ReactQmlComponent.prototype, ReactMultiChild.Mixin, {
    displayName: 'ReactQmlComponent',

    qmlLibrary: 'QtQuick 2.4',
    qmlElement: 'Item',

    generateQmlMarkup: function () {
        return 'import ' + this.qmlLibrary + ';' + this.qmlElement + '{}';
    },

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

    moveChild: function(/* child, toIndex */) {
        // there is currently no easy way to move children in QML so ignore for now
    },

    createChild: function(/*child, childNode*/) {
        // node is created during `mountComponent`, don't need another one
        // unless I'm missing something from React internals
    },

    removeChild: function(/*child*/) {
        // node is destroyed during `unmountComponent`, don't need to do it again
        // unless I'm missing something from React internals
    },

    /**
     * Applies a diff between old an new props to an underlying node
     * @param {Object} oldProps
     * @param {Object} props
     */
    applyNodeProps: function(oldProps, props) {
        // applying new / changed properties
        Object.keys(props).forEach(function (key) {
            if (key === 'children' || key === 'key' || key === 'ref') { return; }
            if (props[key] === oldProps[key]) { return; }
            this.node[key] = props[key];
        }, this);

        // unsetting removed properties
        Object.keys(oldProps).forEach(function (key) {
            if (key in props || key === 'children') { return; }
            this.node[key] = undefined;
        }, this);
    },

    mountComponent: function(rootID, transaction, context) {
        var props = this._currentElement.props;
        this._rootNodeID = rootID;
        this.node = Qt.createQmlObject(this.generateQmlMarkup(), context.qmlParent);
        this.node.objectName = rootID;
        this.mountChildren(props.children, transaction, assign({}, context, { qmlParent: this.node }));
        this.applyNodeProps(emptyObject, props);
        return this.node;
    },

    receiveComponent: function(nextComponent, transaction, context) {
        var props = nextComponent.props;
        var oldProps = this._currentElement.props;
        this.updateChildren(props.children, transaction, assign({}, context, { qmlParent: this.node }));
        this.applyNodeProps(oldProps, props);
        this._currentElement = nextComponent;
    },

    unmountComponent: function() {
        // TODO check if it's necessary to unbind events here
        this.unmountChildren();
        this.node.destroy();
        this.node = null;
    }

});

/**
 * Provides an easy way to create derived classes.
 * @param {string} qmlElement
 * @param {string} qmlLibrary
 * @returns {Function}
 */
ReactQmlComponent.extend = function (qmlElement, qmlLibrary) {
    var Constructor = function() {
        ReactComponent.apply(this, arguments);

        // These properties are expected by ReactMultiChild
        this.node = null;
        this._currentElement = null;
        this._rootNodeID = null;
        this._mountIndex = null;
        this._renderedChildren = null;
    };
    Constructor.displayName = 'ReactQml' + qmlElement;
    Constructor.prototype = Object.create(ReactQmlComponent.prototype);
    Constructor.prototype.qmlElement = qmlElement;
    Constructor.prototype.qmlLibrary = qmlLibrary;
    return Constructor;
};

module.exports = ReactQmlComponent;
