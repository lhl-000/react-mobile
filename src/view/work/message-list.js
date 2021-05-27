import React,{Component} from "react";

export default class MessageList extends Component {
    render(){
        console.log(this.props);
        let {data,loadEnd,loading} = this.props;
        console.log(data);
        return (
            <div className="message-list">
                {
                    data.length > 0?(
                        <div>

                            {
                                data.map((item,index)=>{
                                    return (
                                        <aside key={index}><div className="message-info"><span>{item.username}</span> 回复:</div><div className="message-con">{item.content}</div></aside>
                                    );
                                })
                            }
                            {
                                loading?(<footer className={"loadMore " + (loadEnd?"":"loadIn")}><span>{loadEnd?"这是底线了":"正在加载"}</span></footer>):""
                            }

                        </div>
                    ):<p className="work-no-info">抢个沙发吧</p>
                }
            </div>
        );
    }
}
