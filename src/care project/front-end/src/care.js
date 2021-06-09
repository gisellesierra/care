import React, {Component} from "react";
 import '../src/css/style.css';
import UsersDatas from "./service/users-datas";
import PublicContainer from "./container/public/public-container";
import AdminContainer from "./container/admin/admin-container";
import PatientContainer from "./container/patient/patient-container";
import RepresentantContainer from "./container/representant/representant-container";
import SuperAdminContainer from "./container/super-admin/super-admin-container";
import AppSocket from "./container/patient/socket.io";
import carousel from "./component/carousel";

class Care extends Component{
    constructor(props){
        super(props)
        this.state={
            superContainer:'publicContainer',
            connectedUser:undefined
        }
    }
    /***
     *
     * @param user:lorsque l'utilisateur s'est connecte avec un succe recuperer ses infos
     *
     */
    onClickBtnLogin = (user)=>{
        this.setState({connectedUser:user})
        UsersDatas.getRoleById(user["id_role"],(result, code)=>{
            if(code===200){
                this.setState({superContainer:result[0].description})
            }
        })
    }

    onClickLogout = ()=>{
        window.location.reload(false);
       // this.setState({superContainer: "publicContainer"})
    }

    /***
     *
     * @returns {JSX.Element}
     * @description {Afficher les conteneurs principales selon l'utilisateur}
     */
    renderSuperContainer(){
        switch (this.state.superContainer){
            case "publicContainer":
                return (<PublicContainer onClickBtnlogin={this.onClickBtnLogin}/>)
            case "admin":
                return (<AdminContainer adminUser={this.state.connectedUser} onClickLogout={this.onClickLogout} />)
            case "patient":
                return (<PatientContainer patientUser={this.state.connectedUser} onClickLogout={this.onClickLogout}/>)
            case "representant":
                return (<RepresentantContainer representantUser={this.state.connectedUser} onClickLogout={this.onClickLogout}/>)
            case "super-admin":
                return (<SuperAdminContainer superAdminUser={this.state.connectedUser} onClickLogout={this.onClickLogout}/>)

        }
    }
    render() {
          return(
              <div>
                  {/*<AppSocket />*/}
                  {  this.renderSuperContainer()}
              </div>
          )
    }
}
export default Care;
