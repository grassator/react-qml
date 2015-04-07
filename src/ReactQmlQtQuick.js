'use strict';
var ReactQmlComponent = require('./ReactQmlComponent');
var QT_QUICK_LIB = 'QtQuick 2.4';
var QT_QUICK_DIALOG_LIB = 'QtQuick.Dialogs 1.2';
var QT_QUICK_WINDOW_LIB = 'QtQuick.Window 2.0';
var QT_QUICK_CONTROLS_LIB = 'QtQuick.Controls 1.3';

exports.Image = ReactQmlComponent.extend('Image', QT_QUICK_LIB);
exports.Item = ReactQmlComponent.extend('Item', QT_QUICK_LIB);
exports.Rectangle = ReactQmlComponent.extend('Rectangle', QT_QUICK_LIB);
exports.Text = ReactQmlComponent.extend('Text', QT_QUICK_LIB);
exports.TextInput = ReactQmlComponent.extend('TextInput', QT_QUICK_LIB);
exports.TextEdit = ReactQmlComponent.extend('TextEdit', QT_QUICK_LIB);

// TODO Add support for Grid / Row / Column / Flow layouts
// Required: children reordering when updating tree


exports.Window = ReactQmlComponent.extend('Window', QT_QUICK_WINDOW_LIB);

exports.Dialogs = {
    ColorDialog: ReactQmlComponent.extend('ColorDialog', QT_QUICK_DIALOG_LIB),
    Dialog: ReactQmlComponent.extend('Dialog', QT_QUICK_DIALOG_LIB),
    FileDialog: ReactQmlComponent.extend('FileDialog', QT_QUICK_DIALOG_LIB),
    FontDialog: ReactQmlComponent.extend('FontDialog', QT_QUICK_DIALOG_LIB),
    MessageDialog: ReactQmlComponent.extend('MessageDialog', QT_QUICK_DIALOG_LIB)
};

exports.Controls = {
    BusyIndicator: ReactQmlComponent.extend('BusyIndicator', QT_QUICK_CONTROLS_LIB),
    Button: ReactQmlComponent.extend('Button', QT_QUICK_CONTROLS_LIB),
    Calendar: ReactQmlComponent.extend('Calendar', QT_QUICK_CONTROLS_LIB),
    CheckBox: ReactQmlComponent.extend('CheckBox', QT_QUICK_CONTROLS_LIB),
    Label: ReactQmlComponent.extend('Label', QT_QUICK_CONTROLS_LIB),
    ProgressBar: ReactQmlComponent.extend('ProgressBar', QT_QUICK_CONTROLS_LIB),
    Slider: ReactQmlComponent.extend('Slider', QT_QUICK_CONTROLS_LIB),
    SpinBox: ReactQmlComponent.extend('SpinBox', QT_QUICK_CONTROLS_LIB),
    Switch: ReactQmlComponent.extend('Switch', QT_QUICK_CONTROLS_LIB),
    TextArea: ReactQmlComponent.extend('TextArea', QT_QUICK_CONTROLS_LIB),
    TextField: ReactQmlComponent.extend('TextField', QT_QUICK_CONTROLS_LIB)
};

// TODO Add support for Menu / MenuItem / MenuBar / MenuSeparator / Action / ScrollView
// Required: support for QML default properties:
// http://doc.qt.io/qt-5/qtqml-syntax-objectattributes.html#default-properties

// TODO Add support for RadioBox
// Required: support for ExclusiveGroup



