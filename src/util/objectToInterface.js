"use strict";

// const interfaces: Object[] = []
function objectToInterfaces(jsonSchema, name) {
    var objSchema;
    try {
        objSchema = JSON.parse(jsonSchema);
    }
    catch (error) {
        console.error(error);
        return '';
    }
    var props = '';
    for (var key in objSchema) {
        var value = objSchema[key];
        props += "".concat(key, ": ").concat(getType(key, value), "\n");
    }
    return "interface {\n".concat(props, "}");
}
function getType(key, value) {
    var type;
    if (Array.isArray(value)) {
        type = 'Array<>';
    }
    else if (typeof value === 'object') {
        type = capitalize(key);
    }
    else {
        type = typeof value;
    }
    console.log(type);
    return type;
}
function capitalize(str) {
    var start = str.charAt(0).toLocaleUpperCase();
    var end = str.length > 1 ? str.slice(1) : '';
    return start + end;
}
// getType('category', { name: 'some name'})
var testJson = require('./test.js');
console.log(objectToInterfaces(testJson, 'Category'));
