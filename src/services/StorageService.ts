import { Constants } from "../constants/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService{
    
    /**
     * In this method we will save the token in the storage
     * 
     */
    public async saveAuthToken(token: string){
        await AsyncStorage.setItem(Constants.STORAGE_AUTH_TOKEN, token);
    }


    /**
     * In this method we will get the token from the storage
     * 
     */
    public async getAuthToken(){
        const token = await AsyncStorage.getItem(Constants.STORAGE_AUTH_TOKEN);
        return token;
    }

    public async authTokenIsPresent():Promise<boolean>{
        const token = await AsyncStorage.getItem(Constants.STORAGE_AUTH_TOKEN)
        const exist: boolean = token != null;
        console.log(exist);
        return exist;
    }

    /**
     * In this method we will delete the token from the storage
     * 
     */
    public async deleteAuthToken(){
        console.log("Borrando el token");
        await AsyncStorage.removeItem(Constants.STORAGE_AUTH_TOKEN);
    }



    /**
     * In this method we will save the refresh token in the storage
     * 
     */
    public async saveRefreshToken(token: string){
        await AsyncStorage.setItem(Constants.STORAGE_REFRESH_TOKEN, token);
    }

    /**
     * In this method we will get the refresh token from the storage
     * 
     */
    public async getRefreshToken(){
        const token = await AsyncStorage.getItem(Constants.STORAGE_REFRESH_TOKEN);
        return token;
    }

    public async refreshTokenIsPresent():Promise<boolean>{
        const token = await AsyncStorage.getItem(Constants.STORAGE_REFRESH_TOKEN)
        const exist: boolean = token != null;
        console.log(exist);
        return exist;
    }

    /**
     * In this method we will delete the refresh token from the storage
     * 
     */
    public async deleteRefreshToken(){
        console.log("Borrando el token de refresh");
        await AsyncStorage.removeItem(Constants.STORAGE_REFRESH_TOKEN);
    }

    public async saveProperty(key: string, value: any){
        await AsyncStorage.setItem(key, value);
    }

    public async getProperty(key: string){
        return await AsyncStorage.getItem(key);
    }

    public async deleteProperty(key: string){
        return await AsyncStorage.removeItem(key);
    }

}

const StorageServiceInstance = new StorageService();
export default StorageServiceInstance;
