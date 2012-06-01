// XJSMathematicalObject
function XJSMathematicalObject( ) { }
XJSMathematics.defineType( {
    name: 'XJSMathematicalObject',
    constructor: XJSMathematicalObject,
    parentType: 'XJSMathematicalObject',
    prototype: {
        toParentType: function ( ) {
            return new this.constructor.parentType( );
        }
    }
} );