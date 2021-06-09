import React from 'react'

const makeLi = (data,index,array)=>{
        const datasMutiple = getMultipleChoiceResponces(array,data.question, index)
        return(
            <li  key={index} className={!datasMutiple.isYetDispled?"MultiTrue":"" } > {data.question}
                    {data.is_emoticon ?<img src={getEmoticonRessource(data.response)} alt={'emoji'}/>:data.is_multiple_choice?<span>
                        { datasMutiple.filteredDatas.join(' , ')}</span>:<span>{data.response}</span> }
            </li>
        )
}
const getEmoticonRessource = (identifiant)=>{
    switch (parseInt(identifiant)) {
        case 2:
            return 'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-happy.svg.png'
        case 5:
            return 'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-sweat.svg.png'
        case 7:
            return 'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-desperate.svg.png'
        case 10:
            return 'https://care-project.s3.us-east-2.amazonaws.com/emoticons/face-sushi.svg.png'
    }
}

const getMultipleChoiceResponces = (datas,question,indexQuestion)=>{
    let isYetDispled = true
    const dataMutiple = datas.responses.map((data1, index1)=>{
        if( index1 >= indexQuestion){
            if(data1.is_multiple_choice){
                if(data1.question === question){
                    return data1.response
                }
            }
        }else{
            if(data1.question === question){
                isYetDispled = false
            }
        }
    })
    const filteredDatas =  dataMutiple.filter(data=>data!==undefined)
    return {
        isYetDispled:isYetDispled,
        filteredDatas:filteredDatas
    }
}
const OrderedList = ({datas}) => {
    //console.log('date ',datas.date_response)
    console.log('datas responses ',datas.responses)

    return (
        <ol className={"ulcontenue"}>
            {datas.responses.map((data,index)=>makeLi(data,index,datas))}
        </ol>
    )
}
export default OrderedList