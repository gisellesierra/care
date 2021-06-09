import React, {Component} from "react";
import NewFollowUp from "./new-follow-up";
import AdminOperationsComponent from "../../../component/admin-operations-component";
import ServicesData from "../../../service/services-data";
import EtablissementsDatas from "../../../service/etablissements-datas";

class OurServices extends Component{
    constructor(props){
        super(props)

        this.state={
            services:[],
            id_establishment:0,
            addServiceInput:"",

        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        EtablissementsDatas.getIdEtablishmentByIdUser(this.props.adminUser.id,(result,code)=>{
            console.log(result.id_etablishment)
            if(code===200){
                this.setState({id_establishment:result.id_etablishment})
                ServicesData.getServicesByIdEstablishment(result.id_etablishment,(resutl,code)=>{
                    // const serviceName = resutl.map(name=>(name.description))
                    if(code===200){
                        this.setState({services:resutl})
                    }
                })
            }
        })
    }
    onClickAddService = (event)=>{
        console.log(this.state.services)
        ServicesData.addServiceByEstablishment(this.state.id_establishment,this.state.addServiceInput,(result,code)=>{
            if(code===201){

                this.setState({services:[...this.state.services,result],addServiceInput:""})
                console.log(result)
            }
        })
    }
    onChangeInputAddService=(event)=>{
        this.setState({addServiceInput:event.target.value})
    }
    onClickDelete=(idServicesDeleted)=>()=>{
        ServicesData.deleteServiceById(idServicesDeleted,(result,code)=>{
            if(code===222){
                const services = this.state.services.filter(service=>service.id!==idServicesDeleted)
                this.setState({services:[...services]})
            }
        })
    }
    render() {
        return(
            <div>
                <AdminOperationsComponent value={this.state.addServiceInput} onClick={this.onClickDelete} onClickAddService={this.onClickAddService} service={this.state.services} onChange={this.onChangeInputAddService}/>
            </div>
        )
    }
}

export default OurServices