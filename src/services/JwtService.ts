import {jwtDecode} from "jwt-decode";
import axios, { AxiosResponse } from "axios";
import { Constants } from "../constants/Constants";
import StorageServiceInstance from "./StorageService";

class JwtService {

    public isExpired (token: string) {
        let decodedToken = jwtDecode(token);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
            return true
        } else {
            return false;
        }
    }

    /* public async refresh(oldToken: string) {
        let instance = axios.create({
            headers: { 
                "Content-Type": "application/json",
            }
        });
        let urlFinal = `${Constants.BASE_API_URL}${Constants.API_V1}/auth/token/refresh`;

        const promise = new Promise<string>((resolve, reject)=>{
            instance.post(urlFinal, {token: oldToken}).then((data)=>{
                const refreshToken = this.getRefreshTokenFromResponse(data)
                StorageServiceInstance.saveAuthToken(data.data.access_token);
                StorageServiceInstance.saveRefreshToken(refreshToken)
                console.log(refreshToken)
                resolve(data.data.access_token);
            }).catch((error) => {
                console.error("An error has occurred while refreshing token", error);
                reject(error);
            });
        })
        return promise
    }

    public getRefreshTokenFromResponse(res: AxiosResponse){
        const refreshToken = res.headers['set-cookie'][0].split(';')
                            .find(cookie => cookie.startsWith('refreshToken')).split('=')[1]
        return refreshToken
    } */
}

const jwtService = new JwtService()
export default jwtService
