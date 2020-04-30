import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'

 class Layout extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        PhotoSearch
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                           { this.props.token ? <NavLink className="nav-link " exact to="/">
                                Search
                            </NavLink> : null}
                        </li>
                        <li className="nav-item">
                           { this.props.token ? <NavLink className="nav-link" exact to="/logout">
                                Logout
                           </NavLink> : <NavLink className="nav-link" exact to="/auth">
                              Auth
                            </NavLink>}
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


const mapStateToProps=state=>{
    return{
        token:state.auth.token
    }
}
export default  connect(mapStateToProps,null)(Layout)