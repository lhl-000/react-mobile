import React,{Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default class Header extends Component {
    render(){
        let {menu,back,login,changeOpen} = this.props;
        let {user} = this.context;
        return (
            <header id="header">
                {menu?<a
                    className="header-btn-left iconfont icon-hycaidan"
                    onTouchEnd={(e)=>{
                        changeOpen();
                        e.stopPropagation();
                    }}
                >
                </a>:""}
                {back? <a
                    className="header-btn-left iconfont icon-back"
                        onTouchEnd={()=>{
                            if(window.history.length > 1){
                                window.history.back();
                            } else {
                                window.location.href = "/";
                            }
                        }
                    }
                >
                </a>:""}

                <img src={require("../img/logo.png")} id="logo" />
                {
                    login?
                        (user?<span className="header-btn-right header-user">{user}</span>:<Link to="/login" className="header-btn-right iconfont icon-denglu"></Link>)
                        :
                        ""
                }
            </header>
        );
    }
}

Header.contextTypes = {
    user: PropTypes.string
}
