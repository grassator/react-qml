'use strict';

var React = require('../');
var assert = require('referee').assert;

var Qt = require('../support/Qt');

describe('ReactQml', function () {

    describe('interface', function () {

        it('should provide `render` method', function () {
            assert.isFunction(React.render);
        });

        it('should provide `unmountComponentAtNode`', function () {
            assert.isFunction(React.unmountComponentAtNode);
        });

    });

    describe('Mount', function () {
        var root;

        beforeEach(function () {
            root = new Qt.QtObject();
            root.objectName = 'QML_ROOT';
        });

        afterEach(function () {
            root.destroy();
            root = undefined;
        });

        it('should allow to render a ReactQmlComponent wrapped in a ReactCompositeComponent', function () {
            var Test = React.createClass({
                render: function () {
                    return React.createElement(React.QtQuick.Rectangle);
                }
            });
            React.render(React.createElement(Test), root);
            assert.match(root, {
                children: [{
                    _type: 'Rectangle',
                    children: []
                }]
            });
        });

        it('should allow to render a standalone ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle), root);
            assert.match(root, {
                children: [{
                    _type: 'Rectangle',
                    children: {
                        length: 0
                    }
                }]
            });
        });

        it('should allow to unmount a ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle), root);
            React.unmountComponentAtNode(root);
            assert.equals(root.children, []);
        });

        it('should allow to update properties by re-rendering a ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle), root);
            React.render(React.createElement(React.QtQuick.Rectangle, {
                color: 'red'
            }), root);
            assert.match(root, {
                children: [{ color: 'red' }]
            });
        });

        it('should allow to unset properties by re-rendering a ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle, {
                color: 'red'
            }), root);
            React.render(React.createElement(React.QtQuick.Rectangle), root);
            assert.match(root, {
                children: [{ color: undefined }]
            });
        });

        it('should allow render nested ReactQmlComponents', function () {
            React.render(React.createElement(React.QtQuick.Rectangle, null,
                React.createElement(React.QtQuick.Rectangle, null,
                    React.createElement(React.QtQuick.Rectangle)
                )
            ), root);
            assert.match(root.children, [{
                    children: [{
                        children: [{
                            children: { length: 0 }
                        }]
                    }]
            }]);
        });

        it('should allow to add children by re-rendering a ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle), root);
            React.render(React.createElement(React.QtQuick.Rectangle, null,
                React.createElement(React.QtQuick.Rectangle)
            ), root);
            assert.match(root.children, [{
                children: [{
                    children: { length: 0 }
                }]
            }]);
        });

        it('should allow to remove children by re-rendering a ReactQmlComponent', function () {
            React.render(React.createElement(React.QtQuick.Rectangle, null,
                React.createElement(React.QtQuick.Rectangle, { key: 'one' }),
                React.createElement(React.QtQuick.Rectangle, { key: 'two' })
            ), root);
            React.render(React.createElement(React.QtQuick.Rectangle, null,
                React.createElement(React.QtQuick.Rectangle, { key: 'two' })
            ), root);
            assert.match(root.children, [{
                children: { 0: { objectName: 'two' }, length: 1 }
            }]);
        });


    });

});
