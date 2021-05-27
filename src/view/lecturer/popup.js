import React,{Component} from "react";
import BScroll from "better-scroll";
export default class popup extends Component {
    componentDidMount(){
        //console.log(this.refs.popupCon);
        new BScroll(this.refs.popupCon,{
            bounce: false
        })
    }
    render(){
        let {data,clos} = this.props;
        return (
            <div
                className="popup"
                onTouchEnd={clos}
            >
                <div
                    className="popup-win"
                    onTouchEnd={(e)=>{
                        e.stopPropagation();
                    }}
                >
                    <div
                        className="popup-photo"
                        style={{
                            backgroundImage: `url(${data.icon})`
                        }}
                    >
                    </div>
                    <h3 className="popup-title">{data.title}</h3>
                    <div
                        className="popup-con"
                        ref="popupCon"
                    >
                       <div
                           dangerouslySetInnerHTML={{
                               __html:data.content
                           }}
                       >

                       </div>
                    </div>
                    <a
                        className="close"
                        onTouchEnd={clos}
                    >
                    </a>
                </div>
            </div>
        );
    }
}