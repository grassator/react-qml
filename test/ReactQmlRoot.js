'use strict';

var ReactQmlRoot = require('../src/ReactQmlRoot');
var assert = require('referee').assert;

describe('ReactQmlRoot', function () {

    afterEach(function () {
        ReactQmlRoot.root = null;
    });

    it('should be able to travers parents to the root', function () {
        var root = {};
        var l1 = { parent: root };
        var l2 = { parent: l1 };
        var l3 = { parent: l2 };
        ReactQmlRoot.updateRootFromContainer(l3);
        assert.same(ReactQmlRoot.root, root);
    });

});
