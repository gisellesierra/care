import {fetchUtil,requestConfig,METHOD} from "./util";
import axios from "axios";

class EtablissementsDatas{
    /**
     * @function resulCallBack
     * Recuperer tous les etablissements
     * @param resultCallback
     * */
    static getAllPartners(resultCallback){
        fetchUtil('/establishment',requestConfig(METHOD.GET), resultCallback)
    }
    /**
     * @param etablissementAdmin:le le contenu des informarion de l'etablissement
     * @param resulCallBack: respose
     * Ajouter un etablissement medical
     * */
    static addPartner(etablissementAdmin , resulCallBack ){
        axios.post('https://care-project.herokuapp.com/establishment', etablissementAdmin, {})
            .then(response => {console.log(response);console.log('status',response.status);resulCallBack(response.data,response.status)})
            .catch(error=>console.log(error))
    }
    /***
     *
     * @param id : identifiant
     * @param resulCallBack
     * @function resulCallBack
     */
    static  getParnterById(id,resulCallBack){
        fetchUtil('/establishement/'+id,requestConfig(METHOD.GET),resulCallBack)
    }

    /***
     *
     * @param admin : Object
     * @param idEstablishment : Number
     * @param resultCallBack : CallableFunction
     */
    static addEstatblishementAdmin(admin,idEstablishment,resultCallBack){
        fetchUtil('/establishment/admin', requestConfig(METHOD.POST,{admin:admin, idEstablishment:idEstablishment} ), resultCallBack)
    }

    static getIdEtablishmentByIdUser(id_user,resultCallBack){
        fetchUtil('/establishment/user/'+id_user,requestConfig(METHOD.GET),resultCallBack)

        // resultCallBack({
        //     id:1,
        //     id_etablishment: 24,
        //     id_user: idUser
        // },200)
    }
    static getActifEstablishmentByIdUser(idUser,resultCallBack){
        fetchUtil(''+idUser,requestConfig(METHOD.GET),resultCallBack)
    }
}
export default EtablissementsDatas