import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImage, dragEnter, dragLeave, drogOver } from '../actions';
import ImageHolder from './imageHolder';
import '../../src/App.css';

class Uploader extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragEnter = this.handleDragEnter.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragLeave = this.handleDragLeave.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        
    }

    handleDrags(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dragLeave();
    }

    handleDragEnter(e) {
        this.handleDrags(e);
    }

    handleDragOver(e) {
        this.handleDrags(e);
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.dragLeave();
    }

    onChange(e) {
        e.preventDefault()
        const files = e.target.files;
        [].forEach.call(files, this.handleFiles);
    }

    handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        const data = e.dataTransfer;
        const files = data.files;
        [].forEach.call(files, this.handleFiles);
        this.props.drogOver();
    }

    handleFiles(file) {
        var reader = new FileReader();
        var self = this;
        reader.onload = (function(theFile) {
            var image = new Image();
            image.src = theFile.target.result;
            image.onload = async function() {
                var imageUrl = window.URL.createObjectURL(file);
                if(this.width !== 225 && this.height !== 225){
                alert("Sorry, Not able to upload image size should be 1024 x 1024 ");
                } else {
                    self.props.uploadImage(file, imageUrl);
                }
            };
        });
        
        reader.readAsDataURL(file);
    }


    render() {

        const dropClass = this.props.isDragging ? "dragDrop dragging" : "dragDrop";
        
        return (
        <div className="App">
    
            <div className="uploadInput" >
                <input type="file"
                    onChange={this.onChange}
                    accept="image/*"
                    multiple
                />
                <div className={dropClass} 
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave} >
                    <div className="inside">
                        <span>Drop files here to upload</span>
                        <div><i className="material-icons">file_upload</i></div>
                    </div>
                </div>
            </div> 
            <ImageHolder files_info = {this.props.files_info} ></ImageHolder>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        files_info: state.files_info,
        isDragging: state.isDragging
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadImage: (file, url) => dispatch(uploadImage(file, url)),
        dragLeave: () => dispatch(dragLeave()),
        dragEnter: () => dispatch(dragEnter()),
        drogOver:  () => dispatch(drogOver())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);