'use strict';
var ReactQmlComponent = require('./ReactQmlComponent');
var QT_QUICK_LIB = 'QtQuick 2.4';
var QT_QUICK_DIALOG_LIB = 'QtQuick.Dialogs 1.2';
var QT_QUICK_WINDOW_LIB = 'QtQuick.Window 2.0';
var QT_QUICK_CONTROLS_LIB = 'QtQuick.Controls 1.3';

exports.Image = ReactQmlComponent.extend(QT_QUICK_LIB, 'Image');
exports.Item = ReactQmlComponent.extend(QT_QUICK_LIB, 'Item');
exports.Rectangle = ReactQmlComponent.extend(QT_QUICK_LIB, 'Rectangle');
exports.Text = ReactQmlComponent.extend(QT_QUICK_LIB, 'Text');
exports.TextInput = ReactQmlComponent.extend(QT_QUICK_LIB, 'TextInput');
exports.TextEdit = ReactQmlComponent.extend(QT_QUICK_LIB, 'TextEdit');

// TODO Add support for Grid / Row / Column / Flow layouts
// Required: children reordering when updating tree


exports.Window = ReactQmlComponent.extend(QT_QUICK_WINDOW_LIB, 'Window');

exports.Dialogs = {
    ColorDialog: ReactQmlComponent.extend(QT_QUICK_DIALOG_LIB, 'ColorDialog'),
    Dialog: ReactQmlComponent.extend(QT_QUICK_DIALOG_LIB, 'Dialog'),
    FileDialog: ReactQmlComponent.extend(QT_QUICK_DIALOG_LIB, 'FileDialog'),
    FontDialog: ReactQmlComponent.extend(QT_QUICK_DIALOG_LIB, 'FontDialog'),
    MessageDialog: ReactQmlComponent.extend(QT_QUICK_DIALOG_LIB, 'MessageDialog')
};

exports.Controls = {
    BusyIndicator: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'BusyIndicator'),
    Button: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'Button'),
    Calendar: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'Calendar'),
    CheckBox: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'CheckBox'),
    Label: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'Label'),
    ProgressBar: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'ProgressBar'),
    Slider: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'Slider'),
    SpinBox: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'SpinBox'),
    Switch: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'Switch'),
    TextArea: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'TextArea'),
    TextField: ReactQmlComponent.extend(QT_QUICK_CONTROLS_LIB, 'TextField')
};

// TODO Add support for Menu / MenuItem / MenuBar / MenuSeparator / Action / ScrollView
// Required: support for QML default properties:
// http://doc.qt.io/qt-5/qtqml-syntax-objectattributes.html#default-properties

// TODO Add support for RadioBox
// Required: support for ExclusiveGroup



