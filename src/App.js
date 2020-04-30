import React, { Component } from 'react';
import Search from './cotainer/search';
import {Route,Redirect,withRouter} from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Auth from './component/auth/Auth';
import Logout from './component/auth/logout';
import {connect } from 'react-redux'
import *as action from './store/action/index'


class  App extends Component{  

  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  render(){
           
           
    return (
       
      <React.Fragment>
         <Layout/>
        <div className="container"> 
        <Route path="/logout" component={Logout}/>
       { this.props.token ? <Route path="/"  exact component={Search} />
        :<Redirect to="/auth" />}
       {  this.props.token ? <Redirect to="/"/> : <Route path="/auth"   component={Auth} />}
        </div>
      </React.Fragment>
  
    );
  }
} 
const mapStateToProps =state=>{
  return{
    token:state.auth.token
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup: ()=>dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)( App));
