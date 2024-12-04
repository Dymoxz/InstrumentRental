/**
 * User information required for loggin in
 */
export interface IUserCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

/**
 * User information required for registration
 */
export interface IUserRegistration extends IUserCredentials {
    firstName: string;
    lastName: string;

}

export interface IToken {
    token: string;
}
