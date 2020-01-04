export interface User {
    id: number;
    fullname: string;
    username: string;
    email: string;
    password: string;
    token?: string;
    /*
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;*/
}
