export type AuthResponse = void



    
export type LoginRequest = {
    
    /* Username of the user. */
    username: string
    
    /* Password of the user. */
    password: string
    
    /* Authentication method. */
    method?: "tui" | "local"}


export type LoginResponse201 = string


export type LoginResponse = LoginResponse201



    
export type LogoutRequest = {
    
    /* The token to be invalidated. */
    token?: string}


export type LogoutResponse = void



    
export type ListUsersResponse200Items = {
    url: string
    id: string
    username: string
    password: string}


export type ListUsersResponse200 = ListUsersResponse200Items[]


export type ListUsersResponse = ListUsersResponse200



    
export type CreateUserRequest = {
    url: string
    id: string
    username: string
    password: string}



    
export type CreateUserResponse201 = {
    url: string
    id: string
    username: string
    password: string}


export type CreateUserResponse = CreateUserResponse201



    
export type GetUserResponse200 = {
    url: string
    id: string
    username: string
    password: string}


export type GetUserResponse = GetUserResponse200



    
export type UpdateUserRequest = {
    password: string}



    
export type UpdateUserResponse200 = {
    url: string
    id: string
    username: string
    password: string}


export type UpdateUserResponse = UpdateUserResponse200


export type DeleteUserResponse = void



    
export type GetIdentityResponse200 = {
    url: string
    id: string
    username: string
    password: string}


export type GetIdentityResponse = GetIdentityResponse200



    
export type UpdateIdentityRequest = {
    password: string}



    
export type UpdateIdentityResponse200 = {
    url: string
    id: string
    username: string
    password: string}


export type UpdateIdentityResponse = UpdateIdentityResponse200



    /**
    The claims that will be added to the token. If left empty, the token will have the full scope of the user.
    
*/
export type CreateTokenRequestClaims = never



    
export type CreateTokenRequest = {
    
    /* The username of the user. */
    username?: string
    
    /* The claims that will be added to the token. If left empty, the token will have the full scope of the user.
 */
    claims?: CreateTokenRequestClaims}


export type CreateTokenResponse201 = string


export type CreateTokenResponse = CreateTokenResponse201
