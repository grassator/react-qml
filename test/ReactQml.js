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

        it('should allow to render a single item', function () {
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
    });

});
