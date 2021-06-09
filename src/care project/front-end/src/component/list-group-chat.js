import React from "react";

function makeList(onClickChat){
        return(
            <div className="list-group-item list-group-item-action flex-column align-items-start" onClick={onClickChat()}>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Suivis - Service-Name</h5>


                </div>
               <div className={'lastMessage'}>
                   <small>Last Message</small>
                   <small>04:14 PM</small>
               </div>
            </div>
        )
}
const ListGrouChat = ({lists, onClickChat})=>(
    <div className="list-group chatContainer">
        <h2 className={'discussionh2'}> Discussion </h2>
        {lists.map(()=>makeList(onClickChat))}
    </div>
)
export default ListGrouChat