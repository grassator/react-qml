'use strict';

var ReactQmlRoot = {
    updateRootFromContainer: function(item) {
        while (item.parent) {
            item = item.parent;
        }
        ReactQmlRoot.root = item;
    },
    root: null
};

module.exports = ReactQmlRoot;
