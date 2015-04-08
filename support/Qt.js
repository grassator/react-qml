'use strict';

/**
 * This provides minimal QML environment that is used by ReactQml
 */

var assign = require('react/lib/Object.assign');

function QtObject(parent) {
    if (parent && !(parent instanceof QtObject)) {
        throw new Error('`parent` needs to be an instance of QtObject');
    }

    this.children = [];
    this._type = 'QtObject';

    // need to make parent non-enumerable to avoid
    // cyclic reference when doing JSON.stringify
    Object.defineProperty(this, 'parent', {
        value: parent,
        writable: true,
        enumerable: false
    });

    if (parent) {
        parent.children.push(this);
    }
}

assign(QtObject.prototype, {
    _type: 'QtObject',
    destroy: function () {
        if (!this.parent) { return; }
        var children = this.parent.children;
        var index = children.indexOf(this);
        if (index >= 0) {
            var child = children.splice(index, 1)[0];
            child.parent = null;
        }
    }
});

function QtComponent(type) {
    this._componentType = type;
}

QtComponent.prototype.createObject = function (parent, props) {
    var obj = new QtObject(parent);
    assign(obj, props);
    obj._type = this._componentType;
    return obj;
};

/**
 * @param evalText
 * @param parent
 * @returns {QtObject|QtComponent}
 */
function createQmlObject(evalText, parent) {
    if (!parent) {
        throw new Error('You need to provide a `parent` to Qt.createQmlObject');
    }
    var obj;
    var match = evalText.match(/import\s+[^;]+;\s*(Component\s*\{)?\s*([A-z][\w]*)[\s|\n]*\{/);
    if (match[1]) {
        obj = new QtComponent(match[2]);
    } else {
        obj = new QtObject(parent);
        obj._type = match[2];
    }
    return obj;
}

module.exports = global.Qt = {
    createQmlObject: createQmlObject,
    QtObject: QtObject
};
