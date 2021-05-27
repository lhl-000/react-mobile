import React,{Component} from "react";
import axios from "axios";
import qs from "qs";
export default class LoginForm extends Component {
    state = {
            verify:"",
            username:"miaov00",
            password:"miaov12",
            verifyImg: "/koocv/user/verify?"+Date.now(),
            vierfyShow: false
    };
    changeValue = (e,attr)=>{
        let obj = {
            [attr]:e.target.value
        }
        this.setState(obj);
    }
    changeVerify = ()=>{
        this.setState({
            verifyImg: "/koocv/user/verify?"+Date.now()
        })
    }
    postLogin = ()=>{
        let {verify,username,password} = this.state;
        axios.post(
            "/koocv/user/login",
            qs.stringify({
                verify,
                username,
                password
            }),{
                withCredentials: true
            }
        ).then((res)=>{
            if(res.data.code === 0){
                alert("登陆成功");
                console.log(window.history);
                if(window.history.length > 1){
                    window.history.back();
                } else {
                   window.location.href = "/";
                }
            } else {
                alert(res.data.msg);
            }
            this.changeVerify();
        }).catch((error)=>{
            alert("网络故障，请稍后再试");
            this.changeVerify();
        })
    }
    render(){
        let {verify,username,password,verifyImg,vierfyShow} = this.state;
        return (
            <div className="login-inner login-form">
                <div className="login-ico iconfont icon-dengluming"></div>
                <p className="login-info">如有账号，请直接登录</p>
                <div className="input-txt">
                    <input
                        type="text"
                        placeholder="用户名"
                        value={username}
                        onChange={(e)=>{
                            this.changeValue(e,"username");
                        }}
                    />
                    <span className="input-txt-ico icon-youxiang iconfont"></span>
                </div>
                <div className="input-txt">
                    <input
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={(e)=>{
                            this.changeValue(e,"password");
                        }}
                    />
                    <span className="input-txt-ico icon-mima iconfont"></span>
                </div>
                <div className="input-verify">
                    <div className="input-txt">
                        <input
                            type="text"
                            placeholder="验证码"
                            value={verify}
                            onChange={(e)=>{
                                this.changeValue(e,"verify");
                            }}
                            onFocus={()=>{
                                this.setState({
                                    vierfyShow: true
                                })
                            }}
                        />
                        <span className="input-txt-ico icon-authcode iconfont"></span>
                    </div>
                    {
                        vierfyShow?
                            <img
                                className="input-verify-img"
                                src={verifyImg}
                                onTouchEnd={this.changeVerify}
                            />
                            :
                            ""
                    }

                </div>
                <a
                    className="miaov-btn miaov-btn-md input-btn"
                    onTouchEnd={this.postLogin}
                >登陆</a>
                <p className="login-info">没有帐号？<a
                    className="to-register"
                    onTouchEnd={()=>{
                        this.props.changeDeg(-180)
                    }}
                >立即注册</a></p>
            </div>
        );
    }
}