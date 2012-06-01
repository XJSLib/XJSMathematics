// XJSRationalNumber
function XJSRationalNumber( numerator, denominator ) {
    this.numerator = numerator instanceof XJSInteger ? numerator : new XJSInteger( numerator );
    this.denominator = denominator instanceof XJSInteger ? denominator : new XJSInteger( denominator );
}
XJSMathematics.defineType( {
    name: 'XJSRationalNumber',
    constructor: XJSRationalNumber,
    parentType: 'XJSMathematicalObject',
    prototype: {
        toParentType: function ( ) {
            return new XJSMathematicalObject( );
        },
        toString: function ( ) {
            return this.numerator.toString( ) + '/' + this.denominator.toString( );
        },
        valueOf: function ( ) {
            return this.numerator / this.denominator;
        }
    }
} );
XJSMathematics.defineOperators( [
    {
        symbol: '+',
        from: [ XJSRationalNumber, XJSRationalNumber ],
        to: XJSRationalNumber,
        action: function ( a, b ) {
            var an = a.numerator;
            var ad = a.denominator;
            var bn = b.numerator;
            var bd = b.denominator;
            return new XJSRationalNumber(
                an[ 'x' ]( bd )[ '+' ]( ad[ 'x' ]( bn ) ),
                ad[ 'x' ]( bd )
            );
        }
    },
    {
        symbol: 'x',
        from: [ XJSRationalNumber, XJSRationalNumber ],
        to: XJSRationalNumber,
        action: function ( a, b ) {
            return new XJSRationalNumber( a.numerator[ 'x' ]( b.numerator ), a.denominator[ 'x' ]( b.denominator ) );
        }
    }
] );