import React from 'react'
import Input from '../component/Input'
import MessageErreur from "./message-erreur";
const SignInForm = ({onClickSignUp,onClickBtnSignIn,onChangeInputEmail,onChangeInputPsw,messageErreur})=>(
    <div className={"signIn"}>
        <h1>Sign In</h1>
        <div>
            <MessageErreur msg={messageErreur}/>
            <Input
              name={"email"}
              text={"Email "}
              type={"input"}
              classname={'inputSignIn'}
              placeholder={"care@gmail.com"}
              classnameinput={"form-control"}
              onChange={onChangeInputEmail}
            />

            <Input
                name={"password"}
                text={"Password "}
                type={"password"}
                classname={'inputSignIn'}
                placeholder={"********"}
                classnameinput={"form-control"}
                onChange={onChangeInputPsw}

            />
            <button type="button" className="w3-button w3-round" onClick={onClickBtnSignIn}>Login</button>
            <div className={"textAccount"}>
                Dont have an account ?
            </div>

            <div className={"subscribeText"} onClick={onClickSignUp}>
                Subscribe
            </div>
        </div>
    </div>
)

export default SignInForm