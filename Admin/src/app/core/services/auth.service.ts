import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;
    private registerUrl = "https://saitama.snsys.com.br/api/v1/settings/register";

    constructor(private httpClient: HttpClient) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(register: any) {
      console.log(register);

      return this.httpClient.post<any>(this.registerUrl, register);
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }
}

