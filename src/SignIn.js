import React from 'react';
import { msalConfig, apiConfig } from './AuthConfig';
import * as Msal from 'msal';

export const userAgentApplication = new Msal.UserAgentApplication(msalConfig);

export const signIn = async () => {
    try {
        var loginResponse = await userAgentApplication.loginPopup(apiConfig.b2cScopes);
        console.log(loginResponse);
    } catch (error) {
        console.log(error);
    }
}

export class SignIn extends React.Component {
    render() {
        return (
            <button onClick={this.signIn}>Sign In</button>
        );
    }
}
