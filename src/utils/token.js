import * as Msal from 'msal';
import { msalConfig } from '../AuthConfig';


export const userAgentApplication = new Msal.UserAgentApplication(msalConfig);

export function getToken() {
  const account = userAgentApplication.getAccount();
  
  if(account) {
    return account.idToken;
  } else {
    return null;
  }
}

export function setToken(token) {
    localStorage.setItem('myToken', token);
  }
  