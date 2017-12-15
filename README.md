> DEPRECATED. This project is no longer in active development.

# react-qml
[![GitHub version][git-tag-image]][project-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-url]][daviddm-image]
[![Inline docs][doc-image]][doc-url]
[![Code Climate][climate-image]][climate-url]

`react-qml` is a bridge library that allows to use React.js with QML.

## Install

At the moment ReactQml requires special manual bundling before it can be used inside Qml, so you have to download javascript bundle manually from [releases pages|https://github.com/grassator/react-qml/releases].

After that place it in your QML root, and import by adding following line at the top your `main.qml`:

```qml
.import 'ReactQml.js' as React
```

## Example

Usage of `ReactQml` is pretty straightforward — the only difference from web version is that you need to pass id of the qml item to `React.render` instead of DOM node. For example:

```qml
import QtQuick 2.4
import QtQuick.Controls 1.3
import "js/ReactQml.js" as React

ApplicationWindow {
    id: root
    title: qsTr("React QML")
    width: 300
    height: 300
    visible: true

    function reactRender(x, y) {
        var props = {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            color: '#000'
        };
        var childProps = {
            x: 25,
            y: 25,
            width: 50,
            height: 50,
            color: '#fff'
        };
        var child = React.createElement(React.Rectangle, childProps);
        React.render(React.createElement(React.Rectangle, props, child), root);
    }

    Component.onCompleted: {
        reactRender();
    }
}
```


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [gulp](http://gulpjs.com/).


## License

Copyright (c) 2015 Dmitriy Kubyshkin. Licensed under the MIT license.



[doc-url]: http://inch-ci.org/github/grassator/react-qml
[doc-image]: http://inch-ci.org/github/grassator/react-qml.svg?branch=master
[project-url]: https://github.com/grassator/react-qml
[git-tag-image]: http://img.shields.io/github/tag/grassator/react-qml.svg
[climate-url]: https://codeclimate.com/github/grassator/react-qml
[climate-image]: https://codeclimate.com/github/grassator/react-qml/badges/gpa.svg
[travis-url]: https://travis-ci.org/grassator/react-qml
[travis-image]: https://travis-ci.org/grassator/react-qml.svg?branch=master
[daviddm-url]: https://david-dm.org/grassator/react-qml.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/grassator/react-qml

