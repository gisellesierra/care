import {fetchUtil, METHOD, requestConfig} from "./util";

class SuiviDatas{
    /***
     *
     * @param id_user
     * @param resultCallBack
     *
     * recuperer la liste des etablissements medical ou le patient a un suivi Actif
     */
    static getPatientFollowUps (id_user, resultCallBack){
        fetchUtil('/establishment/'+id_user,requestConfig(METHOD.GET),resultCallBack)
    }

    /***
     *
     * @param idUser
     * @param idEstablishment
     * @param resultCallBack
     * recuperer les suivis
     */
    static getFollowUpInfo(idUser,idEstablishment, resultCallBack){
        fetchUtil('/medical-follow-up/'+idUser+'/'+idEstablishment,requestConfig(METHOD.GET),resultCallBack)
        // const followUps = [
        //     {
        //         id:5,
        //         id_user:105,
        //         is_actif: true,
        //         date_debut_suivi:'2021-03-03',
        //         id_service: 4,
        //         description_traitement:'Prenez 1 comprimé une fois par jour le matin et faire un petit dodo le soir'
        //     }
        // ]
        // resultCallBack(followUps, 200)
    }
    static getFollowUpQuestionnaireOfTheDay(idSuivi,resultCallBack){
        fetchUtil('/question/follow-up-day/'+idSuivi,requestConfig(METHOD.GET),resultCallBack)
    }
    static getQuestionById(idQuestion, resultCallBack){
        fetchUtil('/question/'+idQuestion, requestConfig(METHOD.GET), resultCallBack)
    }
    static getResponsesByIdQuestion(idQuestion,resultCallBack){
        fetchUtil('/question/responses/'+idQuestion, requestConfig(METHOD.GET), resultCallBack)
    }
    static submitResponses(responses, resultCallBack){
        fetchUtil('/question/response',requestConfig(METHOD.POST,responses),resultCallBack)
    }
    static getDistinctResponseDate(idFollowUp,resultCallBack){
        fetchUtil('/question/responses/distinct/'+idFollowUp,requestConfig(METHOD.GET), resultCallBack)
    }
    static getResponsesFOllowUp(idFollowUp, dateResponse, resultCallBack){
        fetchUtil('/question/responses/'+idFollowUp+'/'+dateResponse , requestConfig(METHOD.GET), resultCallBack)
    }

    static getBasicQuestionByIdEstablishment( resultCallBack){
        fetchUtil('/question/basic' , requestConfig(METHOD.GET), resultCallBack)
    }

    static addQuestion(data,resultCallBack){
        fetchUtil('/question/follow-up',requestConfig(METHOD.POST,data),resultCallBack)
    }

}

export default SuiviDatas