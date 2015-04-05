'use strict';

var React = require('../');
var assert = require('referee').assert;

var Qt = require('../support/Qt');

describe('ReactQml', function () {

    describe('interface', function () {

        it('should be provide `render` method', function () {
            assert.isFunction(React.render);
        });

        it('should be provide `unmountComponentAtNode`', function () {
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
                    return React.createElement(React.Rectangle);
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
            React.render(React.createElement(React.Rectangle), root);
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
            React.render(React.createElement(React.Rectangle), root);
            React.unmountComponentAtNode(root);
            assert.equals(root.children, []);
        });
    });

});
