
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


 class ImageResault extends Component {
     state={
         open:false,
         currentImage:''
     }


     handleClose=()=>{
        this.setState({open:false})
    }
    handleOpen=imag=>{
        this.setState({open:true,currentImage:imag})
    }
    render() {
        let imageListContent;
        const { images }=this.props;
        
        if(images){
            imageListContent=(
                <GridList cols={3}>
                    {images.map((imag)=>(
                        <GridTile
                        title={imag.tags}
                        key={imag.id}
                        subtitle={
                            <span>
                                by <strong>{imag.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={()=>this.handleOpen(imag.largeImageURL)}>
                                <ZoomIn color="white"/>
                            </IconButton>
                        }
                        >
                            <img src={imag.largeImageURL} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            )
        }else{
            imageListContent=null
        }
        const actions=[
            <FlatButton label="Close" primary={true} onclick={this.handleClose} />
        ]
        return <div>
                {imageListContent}
                <Dialog 
                actions={actions}
                modal={false}
                onRequestClose={this.handleClose}
                open={this.state.open}
                 >
                     <img src={this.state.currentImage} alt="" style={{width:'100%'}} />
                 </Dialog>
            </div>
        
    }

}

ImageResault.propTypes={
    images:PropTypes.array.isRequired

}
export default ImageResault
