'use strict';
/* global Qt */
var ReactQmlRoot = require('./ReactQmlRoot');
var cache = Object.create(null);

/**
 * Creates a factory (a `Component` in QML terms) for given `qmlType`
 * @param {string} qmlLibrary
 * @param {string} qmlType
 * @constructor
 */
function ReactQmlComponentFactory(qmlLibrary, qmlType) {
    this.qmlComponent = Qt.createQmlObject(
        'import ' + qmlLibrary + ';Component{' + qmlType + '{}}',
        ReactQmlRoot.root
    );
}

/**
 * Produces a QML item of the factory type
 * @param {QtObject} parent
 * @param {Object} props
 */
ReactQmlComponentFactory.prototype.createObject = function(parent, props) {
    return this.qmlComponent.createObject(parent, props);
};

module.exports = {
    createFactory: function(qmlLibrary, qmlType) {
        var cacheKey = qmlLibrary + '/' + qmlType;
        var factory = cache[cacheKey];
        if (!factory) {
            factory = cache[cacheKey] = new ReactQmlComponentFactory(qmlLibrary, qmlType);
        }
        return factory
    }
};
