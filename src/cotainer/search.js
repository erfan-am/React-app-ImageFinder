import React, { Component } from 'react'
import NavBar from '../component/navbar/navbra';
import SEARCH from '../component/search/search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {withRouter} from 'react-router-dom'
 class search extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <SEARCH/> 
                </div>
           </MuiThemeProvider>
        )
    }
}

export default withRouter(search) 