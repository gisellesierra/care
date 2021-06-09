import React from 'react'

const PatientsFollowUp = ({patientstreatment })=>(
    <div>
        <div>
            {patientstreatment.map((treatment)=>(
                <div className={"patientsFollowUp"}>
                    <div>
                        <h4>Type of operation: <span>{treatment.operationName}</span></h4>
                        <h5>Treatment</h5>
                        <div>{treatment.treatmentName}</div>
                        <div>{treatment.instructions}</div>
                    </div>
                    <div>
                        <img src={treatment.src} alt={treatment.alt}/>
                    </div>

                </div>))}
        </div>


    </div>
)

export default PatientsFollowUp