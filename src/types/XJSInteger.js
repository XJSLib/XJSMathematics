// XJSInteger
function XJSInteger( value ) {
    if ( value !== +value ) {
        throw new Error( );
    }
    if ( parseInt( value ) !== value ) {
        throw new Error( );
    }
    this.value = value;
}
XJSMathematics.defineType( {
    name: 'XJSInteger',
    constructor: XJSInteger,
    parentType: 'XJSRationalNumber',
    prototype: {
        toParentType: function ( ) {
            return new XJSRationalNumber( this, new XJSInteger( 1 ) );
        },
        toString: function ( ) {
            return this.valueOf( ).toString( );
        },
        valueOf: function ( ) {
            return this.value;
        }
    }
} );
XJSMathematics.defineOperators( [
    {
        symbol: '+',
        from: [ XJSInteger, XJSInteger ],
        to: XJSInteger,
        action: function ( a, b ) {
            return new XJSInteger( a.value + b.value );
        }
    },
    {
        symbol: 'x',
        from: [ XJSInteger, XJSInteger ],
        to: XJSInteger,
        action: function ( a, b ) {
            return new XJSInteger( a.value * b.value );
        }
    }
] );