'use strict';

var ReactMultiChild = require('react/lib/ReactMultiChild');
var ReactQmlComponentMetaFactory = require('./ReactQmlComponentMetaFactory');
var assign = require('react/lib/Object.assign');

var Mixin = assign({}, ReactMultiChild.Mixin, {
    displayName: 'ReactQmlComponent',

    qmlLibrary: 'QtQuick 2.4',
    qmlType: 'Item',

    /**
     * @param {QtObject} parent
     * @param {Object} props
     * @protected
     */
    createQmlObject: function (parent, props) {
        var assignableProps = {};
        for (var key in props) {
            if (key === 'key' || key === 'children' || key === 'ref') { continue; }
            if (props.hasOwnProperty(key)) {
                assignableProps[key] = props[key];
            }
        }

        var factory = ReactQmlComponentMetaFactory.createFactory(this.qmlLibrary, this.qmlType);
        return factory.createObject(parent, assignableProps);
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
        var key;

        // applying new / changed properties
        for (key in props) {
            if (key === 'children' || key === 'key' || key === 'ref') { continue; }
            if (props[key] === oldProps[key]) { continue; }
            if (props.hasOwnProperty(key)) {
                this.node[key] = props[key];
            }
        }

        // unsetting removed properties
        for (key in oldProps) {
            if (key in props || key === 'children') { continue; }
            if (oldProps.hasOwnProperty(key)) {
                this.node[key] = undefined;
            }
        }
    },

    mountComponent: function(rootID, transaction, context) {
        var props = this._currentElement.props;
        this._rootNodeID = rootID;
        this.node = this.createQmlObject(context.qmlParent, props);
        this.node.objectName = rootID;
        this.mountChildren(props.children, transaction, assign({}, context, { qmlParent: this.node }));
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
 * @param {string} qmlLibrary
 * @param {string} qmlType
 * @returns {Function}
 */
module.exports = {
    extend: function (qmlLibrary, qmlType) {
        var Constructor = function() {
            // These properties are expected by ReactMultiChild
            this.node = null;
            this._currentElement = null;
            this._rootNodeID = null;
            this._mountIndex = null;
            this._renderedChildren = null;
        };
        Constructor.displayName = 'ReactQml' + qmlType;
        assign(Constructor.prototype, Mixin);
        Constructor.prototype.qmlType = qmlType;
        Constructor.prototype.qmlLibrary = qmlLibrary;
        return Constructor;
    }
};
