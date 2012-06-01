var XJSMathematics = ( function ( ) {
    function XJSMathematics( ) { }
    var API = new XJSMathematics( );
    
    var types = Object.create( null );
    function defineType( descriptor ) {
        var constructor = descriptor.constructor;
        var name = constructor.name = descriptor.name;
        types[ name ] = constructor;
        var parentType = types[ descriptor.parentType ];
        var prototype = constructor.prototype = Object.create( parentType.prototype ).extend( descriptor.prototype );
        prototype.constructor = constructor;
        constructor.parentType = parentType;
        return constructor;
    }
    API.defineType = defineType;

    var operators = Object.create( null );
    function defineOperators( newOperators ) {
        newOperators.forEach( function ( operator ) {
            var symbol = operator.symbol;
            var operatorsWithSameSymbol;
            if ( symbol in operators ) {
                operatorsWithSameSymbol = operators[ symbol ];
            } else {
                operatorsWithSameSymbol = operators[ symbol ] = [ ];
                XJSMathematicalObject.prototype[ symbol ] = function ( operand ) {
                    return applyOperator( symbol, this, operand );
                };
            }
            // check if combinaison already exists ++
            operatorsWithSameSymbol.push( operator );
        } );
    }
    API.defineOperators = defineOperators;

    function applyOperator( symbol, operand1, operand2 ) {
        // get operators that can be applied
        var appliableOperators = operators[ symbol ].filter( function ( operator ) {
            var constructors = operator.from;
            var constructor1 = constructors[ 0 ];
            var constructor2 = constructors[ 1 ];
            return (
                (
                    operand1 instanceof constructor1 &&
                    operand2 instanceof constructor2
                ) || (
                    operator.commutative &&
                    operand1 instanceof constructor2 &&
                    operand2 instanceof constructor1
                )
            );
        } );
        // throw an error if none was found
        if ( appliableOperators.length === 0 ) {
            throw new Error( 'That operator cannot be applied to these operands!' );
        }
        // get the number of time the first operand will have to be transformed
        var distances = appliableOperators.map( function ( operator ) {
            var from = operator.from;
            var constructor = from[ 0 ];
            var operand = operand1;
            if ( ! ( operand instanceof constructor ) ) {
                constructor = from[ 1 ];
            }
            var distance = 0;
            operand = operand.constructor.prototype;
            while ( operand instanceof constructor ) {
                operand = operand.constructor.parentType;
                ++distance;
            }
            return distance;
        } );
        // remove all operators that require too many transformations on the first operand
        var minDistance1 = Math.min.apply( null, distances );
        appliableOperators = appliableOperators.filter( function ( operator, index ) {
            return distances[ index ] === minDistance1;
        } );
        // get the number of time the second operand will have to be transformed
        distances = appliableOperators.map( function ( operator ) {
            var from = operator.from;
            var constructor = from[ 1 ];
            var operand = operand2;
            if ( ! ( operand instanceof constructor ) ) {
                constructor = from[ 0 ];
            }
            var distance = 0;
            operand = operand.constructor.prototype;
            while ( operand instanceof constructor ) {
                operand = operand.constructor.parentType;
                ++distance;
            }
            return distance;
        } );
        // remove all operators that require too many transformations on the second operand
        var minDistance2 = Math.min.apply( null, distances );
        appliableOperators = appliableOperators.filter( function ( operator, index ) {
            return distances[ index ] === minDistance2;
        } );
        // get the operator
        var operator = appliableOperators[ 0 ];
        // convert operands if needed
        if ( ! operator.doNotConvert ) {
            while ( minDistance1-- ) {
                operand1 = operand1.toParentType( );
            }
            while ( minDistance2-- ) {
                operand2 = operand2.toParentType( );
            }
        }
        // return the first of those operators
        return operator.action( operand1, operand2 );
    }

    return API;
}( ) );