import {fetchUtil,requestConfig,METHOD} from "./util";

class TraitementDatas {
    static getTreatmentByFolowUp(id_suivi,resulCallBack){
        fetchUtil('/treatments/'+id_suivi, requestConfig(METHOD.GET), resulCallBack)
    }

    static getTreatmentByIdService(id_service,callback){
       // fetchUtil('/treatments/'+id_service, requestConfig(METHOD.GET), callback)
        const basictreatments = [
            {
                id:1,
                description:"changement de pensement",
                id_service:5
            },
            {
                id:2,
                description:"Faire tel exercice",
                id_service:5
            },
            {
                id:3,
                description:"Prendre un medicament tel",
                id_service:5
            }
        ]
        callback(basictreatments,200)
    }
}
export default TraitementDatas