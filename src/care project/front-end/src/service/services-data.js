import {fetchUtil,requestConfig,METHOD} from "./util";

class ServicesData {
    static getServicesByIdEstablishment(id,resulCallBack){
        fetchUtil('/service/establishment/'+id, requestConfig(METHOD.GET), resulCallBack)

    }

    static addServiceByEstablishment(id_etablishment,description,resulCallBack){
          fetchUtil('/service', requestConfig(METHOD.POST, {
              id_etablishment: id_etablishment,
              description: description
          }), resulCallBack)

    }
    static getServiceById(id_service, resultCallBack){
        fetchUtil('/service/'+id_service, requestConfig(METHOD.GET), resultCallBack)
    }

    static deleteServiceById(id,callback){
        fetchUtil('/service/'+id,requestConfig(METHOD.DELETE),callback)
    }
}
export default ServicesData