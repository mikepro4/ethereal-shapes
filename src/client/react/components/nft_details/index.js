import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import { withRouter } from "react-router-dom";

import Play from "../icons/play"
import Polygon from "../icons/polygon"
import More from "../icons/more"
import Settings from "../icons/settings"

import { showDrawer } from "../../../redux/actions/appActions"

import Web3Modal from "web3modal";

import {
    nftAddress, nftMarketAddress
} from "../../../../../config";

import NFT from "../../../../../artifacts/contracts/NFT.sol/NFT.json";
import ESMarket from "../../../../../artifacts/contracts/ESMarket.sol/ESMarket.json";
import { ethers } from "ethers";

import ipfsHttpClient from "ipfs-http-client";

import { Buffer } from 'buffer';

// var client = ipfsHttpClient('ipfs.infura.io:5001/api/v0', "", { protocol: "https"}) // leaving out the arguments will default to these values

var client = ipfsHttpClient({ host: 'ipfs.infura.io', port: '5001', 'api-path': '/api/v0/', protocol: "https" })
// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

import { updateMarketTokens, updateCollectionItem} from "../../../redux/actions/appActions"
import { createNFT, loadNFT, loadNewNFT, updateNFT, buyNFT } from "../../../redux/actions/nftActions"
import { StaticJsonRpcProvider } from "@ethersproject/providers";


class NFTDetails extends Component {

    constructor (props) {
        super(props)

        this.nftMore =  this.nftMore = React.createRef();
    }

    mintNFT() { 
        this.createMarket()
    }

    buyNFT =() => {
        this.props.buyNFT(this.props.item.nft.fileUrl, this.props.item)
    }

    createMarket = async() => {
        const {name, description, price, fileUrl} = this.props.item.nft;
        console.log(name, description, price, fileUrl)

        if(!name || !description || !price || !fileUrl) return 
        
        const data = JSON.stringify({
            name, description, image: fileUrl
        })

        try {
            // const added = await client.add(data)
            // const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;

            // run create sell and pass url
            console.log(data)

            const file = {content: Buffer.from(data)}
            const added = await client.add(file)
            console.log(added) 
            const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;
            console.log(url)
            this.createSale(url);
        } catch(error) {
            console.log("error: ", error);
        }
    }

    async createSale(url) {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
        console.log(contract)
        let transaction = await contract.mintToken(url)
        let tx = await transaction.wait()
        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()
        const price = ethers.utils.parseUnits(this.props.item.nft.price, "ether");

        // list the item for sale

        let market = new ethers.Contract(nftMarketAddress, ESMarket.abi, signer);
        let listingPrice = await market.getListingPrice()
        listingPrice = listingPrice.toString()

        transaction = await market.makeMarketItem(
            nftAddress,
            tokenId,
            price, {
                value: listingPrice
            }
        )


        await transaction.wait()
        

        let res = ethers.utils.formatEther(price);
        res = Math.round(res * 1e4) / 1e4;


        this.props.updateNFT(this.props.item, {
            metadata: {
                minted: true
            }
        }, () => {
            this.props.loadNFT(this.props.item._id, (data) => {
                this.props.loadNewNFT(data)
                this.props.updateMarketTokens()
                this.props.updateCollectionItem(this.props.item)
            })
        })

        // this.props.createNFT( { 
        //     nft: {
        //         price: res,
        //         name: this.state.name,
        //         description: this.state.description,
        //         fileUrl: this.state.fileUrl,
        //     },
        //     metadata: {
        //         shapeId: "61f854c2858f150021ef714c"
        //     }
        // }, () => {
        //     this.props.history.push("/");
        //     this.props.updateMarketTokens()
        // });
        // router.push("./")
    }

    renderButton(type) {
        
        switch (type) {
            case "own": 
                return (<div>Own</div>)
            case "sold": 
                return (<div>Sold</div>)

            case "buy": 
                return (<Button
                    className={"buy-button"}
                    type="submit"
                    text="Buy"
                    large="true"
                    onClick={() => this.buyNFT()}
                />)
               
            case "mint":
                return (<Button
                    className={"mint-button"}
                    type="submit"
                    text="Mint"
                    large="true"
                    onClick={() => this.mintNFT()}
                />)
            case "create":
                return (<Button
                    className={"create-button"}
                    onClick={() => this.createNFT()}
                    text="Create"
                    large="true"
                />)
            default:
                return;
        }
    }

    createNFT = () => {
        this.props.createNFT( 
            this.props.nft
        , (data) => {
            this.props.history.push("/nft?id="+ data._id);
            this.props.hideDrawer()
        });
    }

	render() {

		return (
			<div 
                className="nft-details-container"
                className={classNames({
                    "nft-details-container": true,
                    "large": this.props.large
                })}
            >
                <div className="nft-details-left">

                    <div className="play-container">
                        <Play/>
                    </div>

                    <div className="metadata-container" onClick={() => this.props.showDrawer("nft-settings", this.props.item)}>
                        <div className="metadata-name">
                            {this.props.item.nft.name}
                        </div>

                        <div className="metadata-status-bar">
                            <div className="status green">
                                On Sale
                            </div>

                            <div className="price green">
                                <Polygon/>
                                {this.props.item.nft.price}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="nft-details-left">
                    <div className="left">
                    {this.renderButton(this.props.type)}
                    </div>
                    {this.props.more && <div className="right">
                        <div className="more-container" ref={this.nftMore} onClick={() => this.props.showDrawer("nft")}>
                            <Settings/>
                        </div>
                    </div>}
                    
                </div>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        app: state.app,
        nft: state.activeNFT.newNFT
	};
}

export default withRouter(connect(mapStateToProps, {
    showDrawer,
    updateMarketTokens,
    createNFT, loadNFT, loadNewNFT, updateNFT,
    buyNFT,
    updateCollectionItem
})(NFTDetails));
