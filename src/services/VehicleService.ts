import Constants from "../constants/Constants";
import { VehiclePeople } from "../interfaces/interfaces";
import httpClient from "./HttpClient";

class VehicleService {

    public getByQrCode(code: string){
        //Se debe implementar el login del usuario
        const urlFinal = `${Constants.BASE_API_URL}${Constants.API_V1}/census/infoApp/${code}`;
        const promise = new Promise<VehiclePeople>((resolve, reject) => {
            return  httpClient.get(urlFinal).then(res => {
                resolve(res.data.data);
            }).catch(error => {
                console.info("An error has been ocurred", error.response);
                reject(error.response);
            })
        });
        return promise;
    }

}

const vehicleService = new VehicleService();
export default vehicleService