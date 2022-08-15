export enum AuthMutationTypesEnum {
    SET_USER = 'setUser',
    AUTO_LOGOUT = 'autoLogout',
}

export enum AuthActionTypesEnum {
    AUTHENTICATE = 'auth/authenticate',
    LOGOUT = 'auth/logout',
    TRY_LOGIN = 'auth/tryLogin',
}

export enum AuthGettersEnum {
    DID_AUTO_LOGOUT = 'auth/didAutoLogout',
    IS_AUTHENTICATED = 'auth/isAuthenticated',
    TOKEN = 'auth/token',
}

export type AuthStateType = {
    didAutoLogout: boolean;
    token: string | null;
    userId: string | null;
};
