import React, { Component } from 'react';
import {withRouter } from 'react-router-dom'
import {connect} from 'react-redux' 
import * as action from '../../store/action/index';
import Spinner from '../UI/Spinner/Spinner';

class Auth extends Component {

    state={
        email:'',
        password:'',
        isSignup:true
    }

    onChange=(e)=>{
        console.log(this.state);
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmitHan=(e)=>{
        e.preventDefault()
        this.props.onAuth(this.state.email,this.state.password,this.state.isSignup);
        this.setState({email:'',password:''})
    }
  
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p className="bg-danger p-2 text-white text-center font-weight-bold">{this.props.error.message}</p>
            )
        }

        let form =(
            <form >
            <div className="form-group">
            <label for="exampleInputEmail1">E_Mail address</label>
           <input
           onChange={this.onChange}
           value={this.state.email}
           className="form-control"
           type="email"
           name="email" 
           />
           <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
            <label for="exampleInputEmail1">E_Mail Password</label>

            <input 
           onChange={this.onChange}
            value={this.state.password}
            className="form-control" 
            type="password" 
            name="password"
          />
          <small className="text-muted form-text">Yor Password Should be Six Digete</small>
            
            </div>
            <div className="form-group">
            <button onClick={this.onSubmitHan}
            className="form-control bg-dark text-white" type="submit" name="submit">Please</button>
             
            </div>
        </form>
        )
        if(this.props.loading){
            form=<Spinner/>
        }
       
        return (
            <div className="col-md-7 m-auto border p-5 mt-5 bg-light">
          
             {form}
             <button 
                 onClick={this.switchAuthModeHandler}
                 className="form-control bg-primary text-white" type="submit" name="submit">
                     {this.state.isSignup ? 'SignUp ' : 'SIGNIN'}
                 </button>
                 <small className="text-muted form-text">Click Button To Change SignUp to SignIn</small>
                 <br/>
                 {errorMessage}
            </div>
        )
    }
 };
 
 const mapStateToProps=state=>{
        return{
         loading:state.auth.loading,
         error:state.auth.error

        }
    }

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(action.auth(email,password,isSignup))
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)( Auth))