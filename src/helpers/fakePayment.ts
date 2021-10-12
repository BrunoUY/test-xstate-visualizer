export default function fakePayment () {
    return new Promise( ( resolve, reject ) => {
        console.log( 'taking payment...' );

        setTimeout( () => {
            const dice = Math.floor( Math.random() * Math.floor( 2 ) );

            if ( dice === 0 ) return resolve( "Payment succeded" );

            return reject( 'Payment failed.' );
        }, 1000 );
    } )
}