// XJSMatrix
function XJSMatrix( matrix ) {
    this.matrix = matrix
}
XJSMathematics.defineType( {
    name: 'XJSMatrix',
    constructor: XJSMatrix,
    parentType: 'XJSMathematicalObject',
    prototype: {
        clone: function ( ) {
            return new XJSMatrix( this.matrix.map( function ( row ) {
                return row.slice( );
            } ) );
        },
        getHeight: function ( ) {
            return this.matrix.length;
        },
        getWidth: function ( ) {
            var firstRow = this.matrix[ 0 ];
            return firstRow ? firstRow.length : 0;
        },
        map: function ( f ) {
            return new XJSMatrix( this.matrix.map( function ( row, rowIndex ) {
                return row.map( function ( item, columnIndex ) {
                    return f( item, rowIndex, columnIndex );
                } );
            } ) );
        },
        reduce: function ( ) {
            var matrix = this.clone( );
            var width = matrix.getWidth( );
            var height = matrix.getHeight( );
            var columnIndex;
            var rowIndex;
            for ( columnIndex = 0; columnIndex < width; ++columnIndex ) {
                
            }
            return matrix;
        },
        toParentType: function ( ) {
            return new XJSMathematicalObject( );
        },
        toString: function ( ) {
            var maxLength = 0;
            var stringMatrix = this.matrix.map( function ( row ) {
                return row.map( function ( item ) {
                    var string = item.toString( );
                    var length = string.length;
                    if ( length > maxLength ) {
                        maxLength = length;
                    }
                    return string;
                } );
            } );
            return stringMatrix.map( function ( row ) {
                return '[ ' + row.map( function ( string ) {
                    var spacesToAddPerSide = ( maxLength - string.length ) / 2;
                    var i;
                    i = Math.floor( spacesToAddPerSide );
                    while ( i-- ) {
                        string = ' ' + string;
                    }
                    i = Math.ceil( spacesToAddPerSide );
                    while ( i-- ) {
                        string += ' ';
                    }
                    return string;
                } ).join( ' ' ) + ' ]';
            } ).join( '\r\n' );
        },
        valueOf: function ( ) {
            return this.value;
        }
    }
} );
XJSMathematics.defineOperators( [
    {
        symbol: '+',
        from: [ XJSMatrix, XJSMatrix ],
        to: XJSMatrix,
        action: function ( operand1, operand2 ) {
            if ( operand1.getWidth( ) !== operand2.getWidth( ) ) {
                throw new Error( );
            }
            if ( operand1.getHeight( ) !== operand2.getHeight( ) ) {
                throw new Error( );
            }
            var matrix2 = operand2.matrix;
            return new XJSMatrix( operand1.matrix.map( function ( row1, rowIndex ) {
                var row2 = matrix2[ rowIndex ];
                return row1.map( function ( element1, columnIndex ) {
                    return element1 + row2[ columnIndex ];
                } );
            } ) );
        }
    },
    {
        symbol: 'x',
        from: [ XJSRationalNumber, XJSMatrix ],
        to: XJSMatrix,
        action: function ( a, b ) {
            return b.map( function ( element ) {
                return a[ 'x' ]( element );
            } );
        },
        doNotConvert: true
    }
] );