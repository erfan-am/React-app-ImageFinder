import * as action from './actionTypes';
import axios from 'axios';
import { connect } from 'react-redux';


export const authStart=()=>{
    return{
        type:action.AUTH_START
}}

export const authSuccess=(token,userId)=>{
    return{
        type:action.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }}

export const authFail=(error)=>{
    return{
        type:action.AUTH_FAIL,
        error:error
}}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:action.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime * 1000 )
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCir2ywU9EBBYDZPhcK9D8LYDUHiRTaVEY';

        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCir2ywU9EBBYDZPhcK9D8LYDUHiRTaVEY'
        }
        axios.post(url,authData)
        .then(response=>{
            console.log(response);
            const expirationDate=new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error=>{
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    }
}


export const authCheckState=()=>{
    return dispatch=>{
        const token =localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate=new  Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
            dispatch(logout())

            }{
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() )/ 1000))

            }
        }   
    }
}