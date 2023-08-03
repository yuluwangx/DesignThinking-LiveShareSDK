export const msalConfig = {
    auth: {
        clientId: "66742fe7-5d0b-4c63-af94-922464eff9fd",
        authority: "https://login.microsoftonline.com/1faf88fe-a998-4c5b-93c9-210a11d9a5c2",
        redirectUri: "http://localhost:3000",
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add here the endpoints and scopes for the web API you want to access.
export const apiConfig = {
    b2cScopes: ["https://graph.microsoft.com/user.read"],
};
