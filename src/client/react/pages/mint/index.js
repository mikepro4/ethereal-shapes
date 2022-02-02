import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import qs from "qs";
import moment from 'moment'
import classNames from "classnames";
import * as _ from "lodash"

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

import { updateMarketTokens } from "../../../redux//actions/appActions"


class Mint extends Component {

    state = {
        price: "",
        name: "",
        description: "",
        fileUrl: null
    }

    renderHead = () => (
		<Helmet>
			<title>Home</title>
		</Helmet>
    )


     onChange = async(e) => {
        const file = e.target.files[0];
        console.log(file)

        try {
            const added = await client.add(
                file, {
                    progress: (prog) => console.log("received: ", prog)
                }
            )
            console.log(added)
            const url = `https://ipfs.infura.io/ipfs/${added[0].path}`;
            console.log(url)
            this.setState({
                fileUrl: url.toString()
            })
        } catch(error) {
            console.log("error: ", error);
        }
    }

    createMarket = async() => {
        const {name, description, price} = this.state;
        if(!name || !description || !price || !this.state.fileUrl) return 
        
        const data = JSON.stringify({
            name, description, image: this.state.fileUrl
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
        const price = ethers.utils.parseUnits(this.state.price, "ether");

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
        this.props.history.push("/");
        this.props.updateMarketTokens()
        // router.push("./")
    }

	render() {
		return (
     		<div className="mint-container">
                {this.renderHead()}

                <div>
                    <input
                        placeholder="Asset name"
                        onChange={e => this.setState({name: e.target.value})}
                    />
                    <textarea
                        placeholder="Asset Description"
                        onChange={e => this.setState({description: e.target.value})}
                    />
                    <input
                        placeholder="Asset price"
                        onChange={e => this.setState({price: e.target.value})}
                    />
                    <input
                        type="file"
                        name="Asset"
                        onChange={this.onChange}
                    />
                    {this.state.fileUrl && <img src={this.state.fileUrl}></img>}

                    <button onClick={this.createMarket}>
                        Mint NFT
                    </button>
                </div>

            </div>
				
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
        updateMarketTokens
	})(Mint))
}