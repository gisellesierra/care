/***
 *
  * @param url
 * @param config
 * @param callback
 */
export function fetchUtil(url, config, callback){
    let code =0
    fetch('https://care-project.herokuapp.com'+url,config)
        .then (response=>{
            code=response.status
                console.log(code)
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.indexOf("application/json") !== -1){
                    return response.json()
                }else {
                    return response.text()
                }
                //return code ===404? response:response.json();
        })
            .then(response => {/*console.log(response);*/callback(response,code)})
        .catch(error=>console.log(error))
}
/***
 *
 * @param method
 * @param data
 * @returns {{headers: {"Content-Type": string}, method, body: string}|{method}}
 */
export function requestConfig(method,data){
    if(method==="PUT"){
        method = data ===undefined ?"put":'PUT'
    }
    switch (method){
        case 'POST': case "PUT":
            return{
                method:method,
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(data)
            }
        case 'GET': case 'DELETE': case "put":
            return{
                method: method
            }

    }

}
export const METHOD={
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE"

}

