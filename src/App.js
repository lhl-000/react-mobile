import React, { Component } from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Home from "./view/home/index";
import Course from  "./view/course/index";
import Lecturer from  "./view/lecturer/index";
import Work from  "./view/work/index";
import Login from  "./view/login/index";
import Message from  "./view/message/index";
import axios from "axios";
import PropTypes from "prop-types";
import "./common/css/style.css";
class App extends Component {
  state = {
      user: ""
  }
  getChildContext(){
      return {
          user: this.state.user
      }
  }
  constructor(arg){
    super(arg);
    this.getLoginState();
  }
  getLoginState = ()=>{
      axios.post(
          "/koocv/user/islogin",
          "",
          {
              withCredentials: true
          }
      ).then((res)=>{
          let user;
          if(res.data.code === 1){
            user = "";
          } else if(res.data.code === 0){
            user = res.data.username;
          }
          if(user !== this.state.user){
              this.setState({
                  user
              });
          }
      }).catch((error)=>{
          console.log(error);
      })
  }
  componentDidUpdate(){
      this.getLoginState();
  }
  render() {
    return (
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/course" component={Course}/>
          <Route path="/lecturer" component={Lecturer}/>
          <Route path="/work/:id" component={Work}/>
          <Route path="/login" render={()=>{
              if(this.state.user){
                  return <Redirect to="/" />
              }
              return <Login />
          }}/>
          <Route path="/message/:id" component={Message}/>
        </Switch>
    );
  }
}
App.childContextTypes  = {
    user: PropTypes.string
}
export default App;
