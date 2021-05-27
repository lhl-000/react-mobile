import React,{Component} from "react";
import "../../common/css/work.css";
import Tab from "../../common/component/tab";
import MessageList from "./message-list";
import MenuPage from "../../common/component/menuPage";
import Loading from "../../common/component/loading";
import axios from "axios";
import qs from "qs";
import PropTypes from "prop-types";
export default class Work extends Component {
    state={
        isLoad: false,
        isFirstUpdata: true,
        data: {},
        article_id:this.props.match.params.id,
        isGood: false,
        good: 0,
        goodin: false
    }
    getWordData(){
        let {article_id} = this.state;
        axios.post(
            "/koocv/lecturer/info",
            qs.stringify({
                article_id
            })
        ).then((res)=>{
            //console.log(res.data);
            this.setState({
                data:res.data,
                good:res.data.good,
                isLoad: true
            })
        })
    }
    getIsGood(){
        let {article_id} = this.state;
        axios.post(
            "/koocv/lecturer/getgood",
            qs.stringify({
                article_id
            }),
            {
                withCredentials: true
            }
        ).then((res)=>{
            console.log(res.data);
            if(res.data.code == 0){
                this.setState({
                    isGood: true
                });
            }
        })
    }
    postGood =()=>{
        let {article_id,goodin} = this.state;
        if(goodin){
            return ;
        }
        this.state.goodin = true;
        if(!this.context.user){
            this.props.history.push("/login")
        } else {
            axios.post(
                "/koocv/lecturer/getgood",
                qs.stringify({
                    article_id
                }),
                {
                    withCredentials: true
                }
            ).then((res)=>{
                //console.log(res);
                if(res.data.code === 0){
                    axios.post(
                        "/koocv/lecturer/cancelgood", qs.stringify({
                            article_id,
                            goodid: res.data.gooid
                        }),
                        {
                            withCredentials: true
                        }
                    ).then((res)=>{
                        //console.log(res.data);
                        if(res.data.code == 0){
                            this.setState({
                                isGood: false,
                                good: parseInt(this.state.good)-1,
                                goodin: false
                            });
                        }
                    });
                } else if(res.data.code === 3){
                    axios.post(
                        "/koocv/lecturer/good", qs.stringify({
                            article_id
                        }),
                        {
                            withCredentials: true
                        }
                    ).then((res)=>{
                        if(res.data.code == 0){
                            this.setState({
                                isGood: true,
                                good: parseInt(this.state.good)+1,
                                goodin: false
                            });
                        }
                    });
                }
            })
        }

    }
    componentDidMount(){
        this.getWordData();
        this.getIsGood();
    }
    componentDidUpdate(){
        if(this.state.isFirstUpdata){
            this.state.isFirstUpdata = false;
            let con = this.refs.con;
            if(con){
                let imgs = con.querySelectorAll("img");
                imgs.forEach((item)=>{
                    item.onload = function(){
                        window.scroll.refresh();
                    }
                });
            }
        }
    }
    getInner(){
        let {data,good,article_id} = this.state;
        return ( <div>
            <MenuPage
                className="work-page"
                render={MessageList}
                api = "getcomment"
                postData = {{
                    article_id
                }}
                rows = {5}
            >
                <Tab
                    className = "banner"
                    data={data.image_path}
                    renderItem = {
                        (item)=>{
                            return (
                                <img src={item.path} />
                            );
                        }
                    }
                />
                <h1 className="work-title">{data.title}</h1>
                <article
                    className="wrok-details"
                    ref="con"
                    dangerouslySetInnerHTML={{
                        __html: data.content
                    }}
                >

                </article>
                <div className="work-aside">
                    <span className="good">有{good}人觉得很赞</span>
                    <a
                        className={"iconfont icon-tuijian1 " + (this.state.isGood?"isGood":"")}
                        onTouchStart={(e)=>{
                            e.target.classList.add("a-active");
                        }}
                        onTouchEnd={(e)=>{
                            e.target.classList.remove("a-active");
                            this.postGood();
                        }}
                    >

                    </a>
                </div>
                {/*<MessageList/>*/}

            </MenuPage>
                <div className="post-message">
                    <a
                        id="message-btn"
                        className="iconfont icon-liuyan"
                        onTouchEnd={()=>{
                            if(!this.context.user){
                                this.props.history.push("/login")
                            } else {
                                this.props.history.push("/message/"+article_id);
                            }
                        }}
                    >
                        回复本帖
                    </a>
                </div>
            </div>
        );
    }
    render(){
        return (this.state.isLoad?this.getInner():<Loading/>);
    }
}
Work.contextTypes = {
    user: PropTypes.string
}