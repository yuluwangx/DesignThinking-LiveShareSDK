import React from 'react';
import { msalConfig, apiConfig } from './AuthConfig';
import * as Msal from 'msal';

export class SignIn extends React.Component {
    signIn = async () => {
        try {
            var userAgentApplication = new Msal.UserAgentApplication(msalConfig);

            // Make sure userAgentApplication is a valid instance
            if (!userAgentApplication) {
                throw new Error("Failed to initialize UserAgentApplication");
            }

            // Use await to make sure we get the Promise resolution
            const loginResponse = await userAgentApplication.loginPopup(apiConfig.b2cScopes);

            // login success
            console.log(loginResponse);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <button onClick={this.signIn}>Sign In</button>
        );
    }
}
