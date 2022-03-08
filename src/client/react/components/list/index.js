import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

import update from "immutability-helper";

import {
    updateCollection,
} from "../../../redux/actions/appActions"


import WordView from "./views/wordView"

import NFTView from "./views/nftView"
import ShapeView from "./views/shapeView"
import NFTReview from "./views/nftReview"
import CollectionView from "./views/collectionView"

class ListResults extends Component {

    state = {
        collection: [],
        loading: false,
        offset: 0,
        limit: 20,
        count: null,
        updateCollection: false,
        horizontalScroll: 0
    }

	componentDidMount() {
        this.searchCollection()

        let node = document.getElementById(this.props.type)
        node.addEventListener('scroll', this.handleScroll);
        
    }
    
    handleScroll = (event) => {
        this.setState({
            horizontalScroll: document.getElementById(this.props.type).scrollLeft
        })
        // this.props.updateTotalScrolledPixels(document.getElementById("body").scrollTop)
    }

	componentWillUnmount() {
	}

	componentDidUpdate(prevprops) {
        if(prevprops.identifier !== this.props.identifier) {
            this.searchCollection(null, true)
        }

		if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
            if( this.props.updateCollectionValue && !this.state.loading) {
                this.setState({
                    updateCollection: true
                })
                this.searchCollection(null, true)
            }
        } else {
            const loadMore = document.getElementById("loadmore")

            if(!this.props.horizontal) {
                if(loadMore && !this.state.loading) {
                    if(this.refs.loadMore) {
                        if((this.props.app.totalScrolledPixels + 200)  > (this.refs.loadMore.offsetTop - this.props.app.totalPixels)) {
                            if( !this.props.updateCollectionValue) {
                                this.searchCollection(20)
                            }
                        }
                    }
                    
                }
            } else if (this.props.horizontal) {
                if(loadMore && !this.state.loading) {
                    if(this.state.horizontalScroll + 100 > loadMore.getBoundingClientRect().x) {
                        if( !this.props.updateCollectionValue) {
                            this.searchCollection(20)
                        }
                    }
                } 
            }
            
        }

        if(!_.isEqual(prevprops.app.updateCollectionItem, this.props.app.updateCollectionItem)) {
           console.log("UPDATE COLLECTION ITEM ", this.props.app.updateCollectionItem)
            this.updateItem(this.props.app.updateCollectionItem)
        }
    }

    updateItem = (item) => {

        this.props.updateCollectionItem( item._id, (data) => {
              let keyToDeactivateIndex = _.findIndex(this.state.collection, item);
              console.log(data, keyToDeactivateIndex, this.state.collection)


            // if(keyToDeactivateIndex) {
            // return update(this.state.collection, { $splice: [[keyToDeactivateIndex, 1, data]] 
            // });
            let newCollection = update(this.state.collection, { $splice: [[keyToDeactivateIndex, 1, data]] })
            this.setState({
                collection: newCollection
            })
        // }
        })
      
    }
    

	searchCollection = (offset, reset) => {
        if(!offset) {
            offset = 0
        }
        this.setState({
            loading: true
        })

        let newOffset 

        if(reset) {
            newOffset = 0
        } else {
            newOffset = this.state.offset + offset
        }

		this.props.searchCollection(
            this.props.type,
            this.props.identifier,
			newOffset,
            this.state.limit, 
            this.props.query,
            (results) => {
                let newCollection = _.concat(this.state.collection, results.all)

                if(this.props.onInitialLoad && this.state.collection.length == 0) {
                    this.props.onInitialLoad(results.all)
                }

                if(reset) {
                    this.setState({
                        collection: results.all,
                        offset: newOffset,
                        count: results.count,
                        loading: false,
                        updateCollection: false
                    })
                    this.props.updateTotal(results.count)
                    
                } else {
                    this.setState({
                        collection: newCollection,
                        offset: newOffset,
                        count: results.count,
                        loading: false,
                        updateCollection: false
                    })
                    this.props.updateTotal(results.count)
                }

               

                this.props.updateCollection(false)
                this.props.updateTotal(results.count)

            }
        )
    };

	renderLoadMoreButton = () => {
		if (
			this.state.count >
			this.state.offset 
		) {
			return (
				<a className="anchor-button" id="loadmore" ref="loadMore"onClick={() => this.searchCollection(20)}>
				</a>
			);
		}
	};

	renderResultItem = (item) => {
		switch (this.props.resultType) {
			case "word":
                if(!this.state.updateCollection) {
                    return (<WordView
                        item={item}
                        key={item._id}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "nft":
                if(!this.state.updateCollection) {
                    return (<NFTView
                        item={item}
                        key={item._id}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "nft-review":
                if(!this.state.updateCollection) {
                    return (<NFTReview
                        item={item}
                        key={item._id}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "shape":
                if(!this.state.updateCollection) {
                    return (<ShapeView
                        item={item}
                        key={item._id}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "collection":
                if(!this.state.updateCollection) {
                    return (<CollectionView
                        item={item}
                        key={item._id}
                        count={this.state.count}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "nft-verified":
                if(!this.state.updateCollection) {
                    return (<NFTView
                        item={item}
                        key={item._id}
                        verified={true}
                        handleClick={() => this.props.handleClick()}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
			default:
				return(
					<div></div>
				)
		}
	}

	render() {
		return (
            <div 
                className={
                    classNames({
                        "list-results": true,
                        "horizontal": this.props.horizontal
                    })
                }
                style={{
                    height: this.props.height ? this.props.height: "inherit"
                }}
                id={this.props.type}
            >
				{this.state.collection.map(item => {
					return this.renderResultItem(item)
				})}

				{this.renderLoadMoreButton()}
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
        app: state.app,
        updateCollectionValue: state.app.updateCollection,
        location: state.router.pathname
	};;
}

export default connect(mapStateToProps, {
    updateCollection
})(withRouter(ListResults));
