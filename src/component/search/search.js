import axios from 'axios'
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResult from '../image-resault/image-resault'
import CardText from 'material-ui/Card/CardText'
import Spinner from '../UI/Spinner/Spinner'

 class Search extends Component {
    state={
        searchText:'',
        amount:'',
        apiUrl:'https://pixabay.com/api',
        apiKey:'15964246-6e12f4806408e77b18735e313',
        images:[],
        loading:false,
        error:false

    };

    onChangeText=e=>{

        const val=e.target.value
        this.setState({ [e.target.name]:val},()=>{
            if(val===''){
                this.setState({images:[]})
            }
            else{
                this.setState({loading:true})
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
                .then(res=>this.setState({images:res.data.hits,loading:false}))
                .catch(err=>
                    this.setState({error:true,loading:false})                )
            }
            
        })
    }
onAmountChange=(e,index,value)=>this.setState({amount:value})

    render() {

        const style={padding:'10px 20px' ,
        background: this.state.error ? ' rgb(366, 84, 84)': 'rgb(0, 188, 212)',
        textAlign:'center',
        fontSize:'1rem',
        color:'white',
        width:'60%',
        margin:'100px 20px',
        borderRadius:'5px',
    }
        
        return (
       
        <div>
                <TextField 
                name="searchText" 
                value={this.state.searchText}
                onChange={this.onChangeText}
                floatingLabelText="Search For Images"
                fullWidth={true}
                 />
                <br/>
                <SelectField
                name="amount"
                floatingLabelText="amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
        >
          <MenuItem value={10} primaryText="10"></MenuItem>
          <MenuItem value={20} primaryText="20"></MenuItem>
          <MenuItem value={30} primaryText="30"></MenuItem>
          <MenuItem value={50} primaryText="50"></MenuItem>
          <MenuItem value={100} primaryText="100"></MenuItem>
        </SelectField>
            <hr/>
            {this.state.loading ? <Spinner/> :
             this.state.images.length >0 ?( <ImageResult images={this.state.images}/> ):   this.state.error ? <CardText style={style}>Some thing is wrong</CardText>:<CardText style={style}>PLEASE ENTER YOUR TARGET</CardText>}
            </div>
        )
    }
}
export default Search