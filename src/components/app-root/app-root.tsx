import { Component, h } from '@stencil/core';

@Component( {
    tag: 'app-root',
    styleUrl: 'app-root.css',
} )
export class AppRoot {
    render () {
        return (
            <ion-app>
                <ion-router useHash={ false }>
                    <ion-route url="/" component="app-payment-form" />
                    <ion-route url="/profile/:name" component="app-profile" />
                </ion-router>
                <ion-nav />
            </ion-app>
        );
    }
}
