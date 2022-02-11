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
import Arrow from "../icons/arrow"

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

import { 
    updateMarketTokens, 
    updateCollectionItem,
    updateStatusBuying,
    updateStatusMinting
} from "../../../redux/actions/appActions"
import { createNFT, loadNFT, loadNewNFT, updateNFT, buyNFT } from "../../../redux/actions/nftActions"
import { StaticJsonRpcProvider } from "@ethersproject/providers";


import { createShape } from "../../../redux/actions/shapeActions"

import Player from "../player"

import Mic from "../mic/index"


class NFTDetails extends Component {

    constructor(props) {
        super(props)

        this.nftMore = this.nftMore = React.createRef();
    }

    mintNFT() {
        this.createMarket()
    }

    buyNFT = () => {

        if(this.props.app.account.address) {
            this.props.updateStatusBuying(true)
            this.props.buyNFT(this.props.item.nft.fileUrl, this.props.item, () => {
                this.props.updateStatusBuying(false)
                this.showToast("NFT succcesfully purchased ")
            })
        } else {
            this.props.showDrawer("connect-wallet-buy")
        }
        
    }

    createMarket = async () => {
        this.props.updateStatusMinting(true)
        const { name, description, price, fileUrl } = this.props.item.nft;
        console.log(name, description, price, fileUrl)

        if (!name || !description || !price || !fileUrl) return

        const data = JSON.stringify({
            name, description, image: fileUrl
        })

        try {
            // const added = await client.add(data)
            // const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;

            // run create sell and pass url
            console.log(data)

            const file = { content: Buffer.from(data) }
            const added = await client.add(file)
            console.log(added)
            const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;
            console.log(url)
            this.createSale(url);
        } catch (error) {
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

        this.showToast("NFT successfully minted on Polygon Network")

        this.props.updateNFT(this.props.item, {
            metadata: {
                minted: true,
                tokenId: tokenId
            }
        }, () => {
            this.props.updateStatusMinting(false)
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

    renderArrow = () => {
        return(
            <div className="arrow-container" onClick={() => this.props.history.push("/nft?id=" + this.props.item._id)}>
                <Arrow/>
            </div>
        )
    }

    showToast = (message, id) => {
		this.refs.toaster.show({
			message: message,
			intent: Intent.SUCCESS,
		});
    }

    renderMic() {
        return(
            <div>
                <Mic/>
            </div>
        )
    }
		

    renderButton(type) {

        switch (type) {
            case "own":
                return (
                    <div> 
                        {!this.props.more && this.renderArrow()}
                        {this.props.mic && this.renderMic()}
                    </div>
                )
            case "sold":
                return (
                    <div>
                         {!this.props.more && this.renderArrow()}
                         {this.props.mic && this.renderMic()}
                    </div>)

            case "buy":
                return (<Button
                    className={"buy-button main-button"}
                    type="submit"
                    loading={this.props.app.buying}
                    text="Buy"
                    large="true"
                    onClick={() => this.buyNFT()}
                />)

            case "mint":
                return (<Button
                    className={"mint-button main-button"}
                    type="submit"
                    text="Mint"
                    large="true"
                    loading={this.props.app.minting}
                    onClick={() => this.mintNFT()}
                />)
            case "create":
                return (<Button
                    className={"create-button main-button"}
                    onClick={() => this.createNFT()}
                    text="Create"
                    large="true"
                />)
            default:
                return;
        }
    }

    createNFT = () => {
        let shape = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.shape : this.props.shape.defaultViz.shape
        let point = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.point : this.props.shape.defaultViz.point
        let overlay = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.overlay : this.props.shape.defaultViz.overlay
        let colors = this.props.newShape && this.props.newShape.defaultViz ? this.props.newShape.defaultViz.colors : this.props.shape.defaultViz.colors

        let user 

        if(this.props.user && this.props.user._id ) {
            user = this.props.user._id
        } else {
            user = "anon"
        }

        this.props.createShape({
            metadata: {
                title: this.props.shape.metadata.title,
                createdBy: user
            },
            defaultViz: {
                shape: shape,
                point: point,
                overlay: overlay,
                colors: colors
            }
        }, (data) => {
            console.log(data)

            console.log(this.props.nft)

            let newNft = {
                ...this.props.nft,
                metadata: {
                    ...this.props.nft.metadata,
                    shapeId: data._id
                }
            }
            this.props.createNFT(
                newNft
            , (data) => {
                this.props.history.push("/nft?id=" + data._id);
                this.props.hideDrawer()
            });
        })
       
    }

    getStatus = () => {
        let status = ""
        let color = ""
        if (this.props.item && this.props.item.metadata) {
            if (this.props.item.metadata.minted) {

                if (this.props.item.metadata.owner && this.props.item.metadata.owner !== "0x0000000000000000000000000000000000000000") {
                    if (this.props.type == "own") {
                        status = "Owned by you"
                        color = "owned"
                    } else {
                        status = "Sold"
                        color = "grey"
                    }

                } else {
                    status = "On Sale"
                    color = "green"
                }

            } else {
                status = "Draft"
                color = "orange"
            }
        }

        return (
            <div className={"status " + color}>
                {status}
            </div>
        )

    }

    renderPrice = () => {
        if (this.props.type == "own") {
            return (<div></div>)
        } else {
            return (<div className="price green">
                <Polygon />
                {this.props.item.nft.price}
            </div>)

        }
    }

    render() {

        return (
            <div
                className={classNames({
                    "nft-details-container": true,
                    "large": this.props.large,
                    "demo-mode": this.props.app.demoMode
                })}
            >
                <div className="nft-details-left">

                    <div className="play-container">
                        <Player nft={this.props.item} />
                    </div>

                    <div className="metadata-container" onClick={() => this.props.showDrawer("nft-settings", this.props.item)}>
                        <div className="metadata-name">
                            {this.props.item.nft.name}
                        </div>

                        <div className="metadata-status-bar">
                            {this.getStatus()}

                            {this.renderPrice()}

                            {this.props.user && this.props.item.metadata.featured && <span className="f">F</span>}
                            {this.props.user && this.props.item.metadata.approved && <span className="f">A</span>}
                            {this.props.user && this.props.item.metadata.rejected && <span className="f">R</span>}
                        </div>
                    </div>

                </div>

               

                <div className="nft-details-left">
                    <div className="left">
                        {this.renderButton(this.props.type)}
                    </div>
                    {this.props.more && <div className="right">
                        <div className="more-container" ref={this.nftMore} onClick={() => this.props.showDrawer("nft")}>
                            <Settings />
                        </div>
                    </div>}

                </div>

                <Toaster position={Position.BOTTOM_RIGHT} ref="toaster" />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        nft: state.activeNFT.newNFT,
        shape: state.shape.currentShape,
        newShape: state.shape.newShape,
        user: state.app.user
    };
}

export default withRouter(connect(mapStateToProps, {
    showDrawer,
    updateMarketTokens,
    createNFT, loadNFT, loadNewNFT, updateNFT,
    buyNFT,
    updateCollectionItem,
    updateStatusBuying,
    updateStatusMinting,
    createShape
})(NFTDetails));
