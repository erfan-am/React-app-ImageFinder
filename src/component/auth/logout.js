import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as action from '../../store/action/index'
class logout extends Component {


    componentDidMount(){
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/auth"/>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(action.logout())
    }
}
export default connect(null,mapDispatchToProps)(logout)