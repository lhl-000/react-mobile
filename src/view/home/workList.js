import React,{Component} from "react";
import {Link} from "react-router-dom";
export default class WorkList extends Component {
    render(){
        let {data,loading,loadEnd} = this.props;
        return (
            <section className="workList">
                <h2 className="workListTitle">学员作品</h2>
                <ul className="works">
                    {data.map((item)=>{
                        return (<li key={item.id}>
                            <Link to={"/work/"+item.id} >
                                <img src={item.icon} />
                                <div className="workMask">
                                    <h4 className="workTitle">{item.title}</h4>
                                    <span className="iconfont icon-tuijian1">{item.good}</span>
                                    <span className="iconfont icon-liuyan">{item.message}</span>
                                </div>
                            </Link>
                        </li>);
                    })}
                </ul>
                {loading?<footer className={"loadMore "+(loadEnd?"":"loadIn")}><span>{loadEnd?"这已经是底线了":"正在加载更多内容"}</span></footer>:""}
            </section>
        );
    }
}