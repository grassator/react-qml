'use strict';

var ReactQml = require('../');
var assert = require('referee').assert;

describe('ReactQml', function () {

    describe('interface', function () {

        it('should be provide `render` method', function () {
            assert.isFunction(ReactQml.render);
        });

        it('should be provide `unmountComponentAtNode`', function () {
            assert.isFunction(ReactQml.unmountComponentAtNode);
        });

    });

});
