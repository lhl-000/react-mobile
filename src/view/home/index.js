import React,{ Component } from "react";
import Header from '../../common/component/header';
import Menu from "../../common/component/menu";

let tabImg = [
    require("../../common/img/tab/img1.png"),
    require("../../common/img/tab/img2.png"),
    require("../../common/img/tab/img3.png"),
    require("../../common/img/tab/img4.png")
];
export default class Home extends Component {
    render() {
        return (
            <div>
                 <Header 
                    menu = {true}
                    login = {true}
                />
                <Menu/>
                <Tab
                    className = "banner"
                    data={tabImg}
                    renderItem = {
                        (item)=>{
                            return (
                                <img src={item} />
                            );
                        }
                    }
                />
                <div className="tab">
                    <div className="picList"></div>
                </div>
            </div>

        )
    }
}