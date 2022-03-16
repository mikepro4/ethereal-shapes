import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";


// import { 
//     updateCover,
//     updateCoverGradient,
//     updateProfile
// } from "../../../../redux/actions/profileActions"

import {
    loadWord,
    updateBlocks
} from "../../../redux/actions/wordsActions"

import ImageUploader from "../image_uploader"

import qs from "qs";
import * as _ from "lodash"

import { 
    addBlock,
    initSave
} from "../../../redux/actions/blocksActions"

class Block extends Component {

    state = {
        loading: false,
        current: false,
        saving: false
    }

    componentDidMount = () => {
        // let image = _.filter(this.props.sortedBlocks, (block) => {
        //     return block.position = this.props.position.toString()
        // })

        // let image = _.filter(this.props.sortedBlocks, {position: this.props.position});
        // let image = _.filter(this.props.sortedBlocks, {position: this.props.position})
        // // console.log(this.props.sortedBlocks[this.props.position])
        // // console.log(image)
        // if(image.length > 0) {
        //     this.setState({
        //         value: image[0].url
        //     })
        // }

        this.loadImage()

    }

    loadImage() {
        let image
        let filteredImages = _.filter(this.props.sortedBlocks, {position: this.props.position})
        image = filteredImages[0]

        if(image) {
            this.setState({
                value: image.url
            })
        } else {
            this.setState({
                value: null
            })
        }
        
    }

    componentDidUpdate = (prevprops) => {
        if(!_.isEqual(prevprops.sortedBlocks, this.props.sortedBlocks)) {
            let image1 = _.filter(this.props.sortedBlocks, {position: this.props.position});
            // console.log("here",image1 )

            // let image = _.filter(this.props.sortedBlocks, {position: this.props.position});
            // let image = this.props.sortedBlocks[this.props.position]
            // // console.log(this.props.sortedBlocks, this.props.position)
            // // console.log(image)
            // if(image) {
            //     this.setState({
            //         value: image.url
            //     })
            // } else {
            //     this.setState({
            //         value: ""
            //     })
            // }

            this.loadImage()
        }

        if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
            // this.props.initSave()

            

                // setTimeout(() => {
                //     if(this.props.blocks.status == "saving" && !this.state.saving) {
                //         this.setState({
                //             saving: true
                //         })
                //         this.props.updateBlocks(
                //             this.props.word,
                //             this.props.blocks.updatedBlocks, 
                //             () => {
                                
                //                 this.props.loadWord(this.getQueryParams().word, (data) => {
                //                     this.setState({
                //                         saving: false
                //                     })
                //             })
                //         })
                //     }

                // }, 100 )
               
        }

        // console.log(this.getQueryParams().word,  this.props.word._id)

        if(this.getQueryParams().word !== this.props.word._id) {

            // this.loadImage()
        }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    handleInputChange = (value, position, palette) => {
        if(position == 0) {
            this.setState({
                value: value
            })
    
        }

        console.log(value, position, palette)

        let newPosition
        console.log(this.props.position, position)
        if(position == 1 ) {
            newPosition = this.props.blocks.initialPosition
        } else if(position > 1) {
            newPosition = this.props.blocks.initialPosition + position -1
        }

        console.log("newPosition: ", newPosition )

        this.props.addBlock(
            {
                position: newPosition,
                url: value,
                palette: palette
            }
        )
      
       

        
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };



	render() {
        return (
            <div className="block-container">
               {/* <div className="block-position">{this.props.position}</div> */}

               <ImageUploader
                    canUpload={true}
                    onSuccess={(value, position, palette) => this.handleInputChange(value, position, palette)}
                    imageUrl={this.state.value}
                    position={this.props.position}
                />
            </div>

        )
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        word: state.app.activeWord,
        blocks: state.blocks,
        sortedBlocks: state.app.sortedBlocks
	};
}

export default withRouter(connect(mapStateToProps, {
    updateBlocks,
    loadWord,
    addBlock,
    initSave
})(Block));
