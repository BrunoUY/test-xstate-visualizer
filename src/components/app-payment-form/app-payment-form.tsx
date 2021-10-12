import { Component, h } from '@stencil/core';
import { createMachine, interpret, assign } from "xstate";
import fakePayment from "../../helpers/fakePayment";

const stateMachine = createMachine( {
    id: 'fetch',
    initial: 'idle',
    context: {
        name: '',
        card: '',
    },
    states: {
        idle: {
            on: {
                SUBMIT: 'loading'
            }
        },
        loading: {
            invoke: {
                id: 'doPayments',
                // @ts-ignore
                src: ( context, event ) => fakePayment(),
                onDone: {
                    target: 'success',
                },
                onError: {
                    target: 'error',
                }
            }
        },
        success: {
            type: 'final'
        },
        error: {
            on: {
                SUBMIT: 'loading',
            }
        }
    },
    on: {
        INPUT_CHANGE: {
            actions: assign( ( event ) => {
                return {
                    // @ts-ignore
                    [ event.name ]: event.value
                }
            } )
        }
    }
} );


@Component( {
    tag: 'app-payment-form',
    styleUrl: 'app-payment-form.scss'
} )
export class AppPaymentForm {
    // @ts-ignore
    @State() state = stateMachine.initialState;

    //@ts-ignore
    private _service = interpret( stateMachine );

    componentWillLoad () {
        this._service.subscribe( state => {
            this.state = state;
        } );

        this._service.start();
        //console.log( this._service );

    }

    componentDidRender () {
        console.log( 'state.value -> ' + this.state.value );

    }

    disconnectedCallback () {
        this._service.stop();
    }



    handleSubmit () {
        console.log( 'submitting' );
        this._service.send( 'SUBMIT' );
    }

    handleOnChange ( e ) {
        this._service.send( "INPUT_CHANGE",
            {
                name: e.target.name,
                value: e.target.value
            } );
    }

    render () {

        //const { send } = this._service;

        return (
            <ion-content>
                <div>
                    <p>Welcome to State Machine Part 2!</p>
                    <ion-label>Name on card</ion-label>

                    <ion-input type="text" placeholder="Input" name="name"
                        onChange={ ( event ) => this.handleOnChange( event ) }
                        value={ this.state.context.name }
                    ></ion-input>

                    <ion-label>Card Number</ion-label>
                    <ion-input type="text" placeholder="Input" name="card"
                        onChange={ ( event ) => this.handleOnChange( event ) }
                        value={ this.state.context.card }
                    ></ion-input>

                    {
                        this.state.value === 'idle'
                            ? <ion-button onClick={ () => this.handleSubmit() }>Pay Now</ion-button>
                            : ''
                    }

                    {
                        this.state.value === 'loading'
                            ? <ion-spinner></ion-spinner>
                            : ''
                    }

                    {
                        this.state.value === 'error'
                            ?
                            <div>
                                <p>Error, try again</p>
                                <ion-button onClick={ () => this.handleSubmit() }>Pay Now</ion-button>
                            </div>
                            : ''
                    }
                    {
                        this.state.value === 'success'
                            ? <ion-label>Thanks for the payment</ion-label>
                            : ''
                    }
                </div>
            </ion-content>
        );
    }

}
