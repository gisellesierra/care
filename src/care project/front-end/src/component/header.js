import React from 'react'
import Navbar from './navbar';


const Header = ({liensNav,onClickLogin,onClickSignUp,onClickNav, onClickLogo,connectedUser,onClickLogout,src,classname,title, careLogo,establishment})=>(
    <header className={classname}>
        <div className={'headerTop'}>
            <div className={'logo'}>
                <img src={establishment!==undefined?establishment.logo_url:src} alt={'logo'} onClick={onClickLogo} className={"carelogo"}/>
                <h1>{establishment!==undefined?establishment.name:title}</h1>
                {/*<img src={careLogo} alt={'logo'} onClick={onClickLogo} className={"logocareother"}/>*/}
            </div>

            <div className={'connexion'}>
               <span onClick={onClickLogin}>{connectedUser === undefined ? "LOGIN" : connectedUser.firstName }</span>
                <span onClick={connectedUser === undefined? onClickSignUp : onClickLogout}>{connectedUser === undefined ? "SIGN-UP" : "LOGOUT" }</span>
            </div>
        </div>
        <div>
            <Navbar navigationLinks={liensNav} onClickNav={onClickNav} />
        </div>
    </header>
)

export default Header