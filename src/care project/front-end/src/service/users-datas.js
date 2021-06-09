import {fetchUtil, METHOD, requestConfig} from "./util";

class UsersDatas {
    /***
     * @callback resuktcallback : contient le reponse de l'API
     * @param {response}
     * get All users
     */
    /***
     * callback : contient le reponse de l'API
     * get All users
     * @param callback
     */
    static getAll(callback){
        fetchUtil('/users',requestConfig(METHOD.GET),callback)
    }

    /***
     *
     * @param callback
     * @param id
     */
    static getUserById(id,callback){
        fetchUtil('/user/'+id,requestConfig(METHOD.GET),callback)
    }

    /***
     *
     * @param email:username saisi
     * @param password
     * @param callback
     */
    static checkUser(email,password,callback){
        fetchUtil('/user/login', requestConfig(METHOD.POST,{email:email,password:password}), callback)
    }

    static getRoleById(id,callback){
        fetchUtil('/role/'+id,requestConfig(METHOD.GET),callback)
    }

    /***
     *
     * @param user
     * @param callback
     */

    static addUserNoAccessCode(user,callback){
        fetchUtil('/medical-follow-up/patient', requestConfig(METHOD.POST,user), callback)

    }

    static addUserWithAccessCode(user,callback){
        fetchUtil('/medical-follow-up/access-code', requestConfig(METHOD.POST,user), callback)

    }
    static addFollowUpExistingPatient(user,callback){
        fetchUtil('/medical-follow-up/existing-patient', requestConfig(METHOD.POST,user), callback)

    }
    static SignUpUser(user,callback){
        fetchUtil('/user/subscribe', requestConfig(METHOD.PUT,user), callback)

    }
    static SignUpUserVerify(user,callback){
        fetchUtil('/user/verify', requestConfig(METHOD.POST,user), callback)

    }
    static getRepresetantByEstablishment(id_establishment, callback){
        fetchUtil('/user/representant/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static getPatientByEstablishment(id_establishment, callback){
        fetchUtil('/user/patient/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static addRepresetant(user,idEstablishment,callback){
        fetchUtil('/user/representant', requestConfig(METHOD.POST, {representant: user, idEstablishment: idEstablishment}), callback)
    }

    static modifyRepresetant(representant,callback){
        fetchUtil('/user/representant', requestConfig(METHOD.PUT,representant), callback)
    }

    static modifyPatient(patient,callback){
        fetchUtil('/user/patient', requestConfig(METHOD.PUT,patient), callback)
    }

    static desactivateUser(id_user,callback){
        fetchUtil('/user/desactivate/'+id_user, requestConfig(METHOD.PUT), callback)
    }

    static addNoteByUserId(description,id_user,callback){
        fetchUtil('/note', requestConfig(METHOD.POST, {description: description, id_user: id_user}), callback)
    }

    static getAllNotesByIdUser(id_user,callback){
        fetchUtil('/note/'+id_user,requestConfig(METHOD.GET),callback)
    }

    static deleteNoteById(id,callback){
        fetchUtil('/note/'+id,requestConfig(METHOD.DELETE),callback)
    }

    static getActifUser(id_establishment, callback){
        fetchUtil('/user/patient/active/'+id_establishment, requestConfig(METHOD.GET), callback)

    }
    static getInactifUser(id_establishment, callback){
        fetchUtil('/user/patient/inactive/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static getActifRep(id_establishment, callback){
        fetchUtil('/user/representant/active/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static getInactifRep(id_establishment, callback){
        fetchUtil('/user/representant/inactive/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static getPatientActifMedicalFollowUpByIdEstablishment(id_establishment, callback){
        fetchUtil('/medical-follow-up/patient/active/'+id_establishment, requestConfig(METHOD.GET), callback)

    }

    static getUserByEmail(email, callback){
        fetchUtil('/user/email/'+email, requestConfig(METHOD.GET), callback)

    }
}
export default UsersDatas