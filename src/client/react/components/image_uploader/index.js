import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import * as _ from "lodash";
import classNames from "classnames";
import * as Vibrant from 'node-vibrant'

import Dropzone from "react-dropzone";
import axios from "axios";

import { 
    initUpload
} from "../../../redux/actions/blocksActions"

class Avatar extends Component {
	state = {
		imageUrl: "",
		editedAvatar: false
	};

	handleDrop = files => {
        let current = files.count

        this.props.initUpload(
            this.props.position,
            this.props.sortedBlocks,
            files
        )
		const uploaders = files.map((file,i) => {
			// Progress
			var config = {
				onUploadProgress: function(progressEvent) {
					let percentCompleted = Math.round(
						progressEvent.loaded * 100 / progressEvent.total
					);
					console.log(
						"onUploadProgress called with",
						arguments,
						"Percent Completed:" + percentCompleted
					);
				}
			};
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `epic`);
			formData.append("upload_preset", "block_image"); // Replace the preset name with your own
			formData.append("api_key", "DhgKXiXYQqQj0nEB74w_70HfPWI"); // Replace API key with your own Cloudinary key
			formData.append("timestamp", (Date.now() / 1000) | 0);

          

			return axios
				.post(
					"https://api.cloudinary.com/v1_1/dcdnt/image/upload",
					formData,
					config
				)
				.then(response => {
					const data = response.data;
					const fileURL = data.secure_url;
                    let palette = ""

                    Vibrant.from(data.secure_url).getPalette((err, palette) => {
                        palette = palette
                        let [h, s, l] = palette.DarkVibrant.getHsl()
                        console.log(h, s, l)
                        setTimeout(() => {
                            this.setState({
                                imageUrl: data.secure_url,
                                editedAvatar: false
                            });

                            this.props.onSuccess(
                                data.secure_url, 
                                i+1, 
                                {
                                    h: h,
                                    s: s,
                                    l: l,
                                });
                        }, 100)
                    })

                  

					
				});
		});
	};

	render() {
		if (this.props.canUpload) {
			return (
				<Dropzone
					onDrop={this.handleDrop}
					multiple
					accept="image/*"
					className="avatar-container"
					className={classNames({
						"avatar-container": true,
						"empty-avatar": !this.state.editedAvatar && !this.props.imageUrl
					})}
				>
					{!this.state.editedAvatar && !this.props.imageUrl ? (
						<div className="empty-avatar-container">
							<div className="empty-avatar-headline">Upload Image</div>
						</div>
					) : (
						<img
							src={
								this.state.editedAvatar
									? this.state.imageUrl
									: this.props.imageUrl
							}
						/>
					)}
				</Dropzone>
			);
		} else {
			return (
				<div className="avatar-container">
					{!this.state.editedAvatar && !this.props.imageUrl ? (
						"no image"
					) : (
						<img src={this.props.imageUrl} />
					)}
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
    word: state.app.activeWord,
    sortedBlocks: state.app.sortedBlocks
});

export default withRouter(connect(mapStateToProps, {
    initUpload
})(Avatar));
