import React,{Component} from "react";
import Header from "../../common/component/header";
import Menu from "../../common/component/menu";
import PageScroll from "./page-scroll";
export default class MenuPage extends Component {
    state = {
        open: false
    }
    changeOpen=()=>{
        this.setState({
            open: !this.state.open
        });
    }
    componentDidMount(){
        let {view,page} = this.refs;
        let that = this;
        page.style.height = window.innerHeight + "px";
        view.addEventListener("touchmove",function(e){
            if(that.state.open){
                e.preventDefault();
            }
        });
    }
    render(){
        let {className,children,render,api,postData,rows} = this.props;
        let {open} = this.state;
        return (
            <div
                ref="view"
                onTouchEnd={()=>{
                    if(this.state.open){
                        this.changeOpen();
                    }
                }}
            >
                <Header
                    menu={true}
                    login={true}
                    changeOpen={this.changeOpen}
                />
                <Menu />
                <div
                    className={"page " + className}
                    style={{
                        transition: open?".5s cubic-bezier(.2,.85,.23,1.27)":".3s",
                        transform: open?"translate3d(4.5rem,0,0)":"translate3d(0,0,0)"
                    }}
                    ref = "page"
                >
                     <PageScroll
                        render = {render}
                        api = {api}
                        postData = {postData}
                        rows = {rows}
                     >
                        {children}
                     </PageScroll>
                </div>
            </div>
        );
    }
}