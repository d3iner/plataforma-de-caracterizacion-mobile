import axios, { AxiosInstance } from "axios";
import StorageServiceInstance from "./StorageService";
import jwtService from "./JwtService";

class HttpClient {

    private instance: AxiosInstance;
    private noAuthInstance: AxiosInstance;

    constructor() {
        let instance = axios.create({
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });

        let noAuthinstance = instance
        
        instance.interceptors.request.use(
            async (config) => {
                let token = await StorageServiceInstance.getAuthToken();
                if (token != null) {
                    if (jwtService.isExpired(token)) {
                        const refresh = await StorageServiceInstance.getRefreshToken() 
                        //token = await jwtService.refresh(refresh);
                    }
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => Promise.reject(error),
        );
        this.instance = instance
        this.noAuthInstance = noAuthinstance
    }

    public get(url: string) {
        return this.instance.get(url);
    }

    public post(url: string, data: any) {
        return this.instance.post(url, data);
    }

    public put(url: string, data?: any) {
        return this.instance.put(url, data);
    }

    public delete(url: string){
        return this.instance.delete(url);
    }

    public noAuthget(url: string) {
        return this.noAuthInstance.get(url);
    }

    public noAuthpost(url: string, data: any) {
        return this.noAuthInstance.post(url, data);
    }

    public noAuthput(url: string, data?: any) {
        return this.noAuthInstance.put(url, data);
    }

    public noAuthdelete(url: string){
        return this.noAuthInstance.delete(url);
    }

}

const httpClient = new HttpClient();
export default httpClient;
