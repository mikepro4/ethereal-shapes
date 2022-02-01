import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import Drawer from "./react/components/drawer"
import Scroll from "./react/components/scroll"
import Viz from "./react/components/viz"
import SettingsIcon from "./react/components/icons/settings"

import qs from "qs";
import * as _ from "lodash"
import axios from "axios";
import Web3Modal from "web3modal";

import {
    nftAddress, nftMarketAddress
} from "../../config";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import ESMarket from "../../artifacts/contracts/ESMarket.sol/ESMarket.json";
import { ethers } from "ethers";

import { showDrawer } from "../client/redux/actions/appActions"
import { loadWord, updateBlocks } from "../client/redux/actions/wordsActions"
import { loadShape } from "../client/redux/actions/shapesActions"
import { initSave } from "../client/redux/actions/blocksActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

import Player from "./react/components/player"
import AudioPlayer from "./react/components/audioplayer"

// if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
//             this.props.initSave()

class App extends Component {
    state = {
        appVisible: false,
        savingBlocks: false,
        balance: null
    }

    async componentDidMount() {
        this.auth()
        this.loadWeb3()
        const provider = new ethers.providers.JsonRpcProvider("");
        const tokenContract = new ethers.Contract(nftAddress, NFT.abi, provider);
        const marketContract = new ethers.Contract(nftMarketAddress, ESMarket.abi, provider);
        const data = await marketContract.fetchMarketTokens();
       

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await tokenContract.tokenURI(i.tokenId);

            const meta = await axios.get(tokenURI);
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item;
        }))

        console.log(items)
        setTimeout(() => {
            this.getBalance()
        }, 1000)

    }

    async getBalance() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
        console.log(this.state.account)
        let balance = await contract.balanceOf(this.state.account);
        console.log("owned token: " + parseInt(balance, 16))

        const ethbalance = await provider.getBalance(this.state.account)
        console.log(ethers.utils.formatUnits(ethbalance.toString(), "ether"))
    }

    auth() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.loadUser()
		} else {
			this.showApp()
		}
    }

    componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.location.search, this.props.location.search)) {
            this.loadWord()
        }
        if(this.props.word && this.props.word.metadata) {
            if(!_.isEqual(prevprops.word, this.props.word)) {
                this.props.loadShape(this.props.word.metadata.shapeId)
            }
        }

        if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
            if(this.props.blocks.status !== "saving") {
                this.props.updateBlocks(
                    this.props.word,
                    this.props.blocks.updatedBlocks, 
                    () => {
                        
                        this.props.loadWord(this.getQueryParams().word, (data) => {
                    })
                })
            }
        }
        
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };
    
    loadUser() {
		this.props.fetchCurrentUser(() => {
			this.showApp()
		})
    }
    
    showApp() {
        this.setState({
            appVisible: true
        })
    }

    loadWord() {
        // console.log(this.getQueryParams())
        this.props.loadWord(this.getQueryParams().word, (data) => {
            console.log(data)
        })
    }

    async loadWeb3() {
        const provider = window.ethereum;

        if (typeof provider !== 'undefined') {
            console.log('MetaMask is installed!');
        }

        const accounts = await provider.request({ method: "eth_requestAccounts"});
        const account = accounts[0]
        console.log(account)
        this.setState({
            account: account
        })

        provider.on('chainChanged', () => {
            window.location.reload();
            console.log("reload")
        })

        provider.on('accountsChanged', () => {
            // window.location.reload();
            console.log("reload")
        })

        provider.on('networkChanged', function(networkId){
            console.log('networkChanged',networkId);
            this.setState({
                networkId: networkId
            })
        });

    }

    getAccountBalance = async () => {
        userTokenBalance = await tokenContract.balanceOf(signerAddress);
        //Note that userTokenBalance is not a number and it is bigNumber
        console.log(userTokenBalance);
    }

    render() {
        return (
            <div className="app">
                {this.props.drawerOpen && <Drawer type={this.props.drawerType} />}
                <Header balance={this.state.balance}/>

                {/* <div className="main-section">
                    <div className="app-route-container">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>

                <div className="main-settings" onClick={() =>  this.props.showDrawer("word-settings")}>
                    <SettingsIcon />
                </div>

                <div 
                    className="viz-wrapper"
                    className={classNames({
                        "viz-wrapper": true,
                        "active": this.props.word && this.props.word.metadata && this.props.word.metadata.shapeId
                    })}
                >
                    <Viz/>
                </div>

                <div className="new-player">
                    {!this.props.demoMode &&<Player/> }
                    <AudioPlayer/>
                    
                </div> */}

                <div className="placeholder"></div>


                <Scroll/>
                
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        appReducer: state.appReducer,
        user: state.app.user,
        drawerType: state.app.drawerType,
        drawerOpen: state.app.drawerOpen,
        word: state.app.activeWord,
        blocks: state.blocks
    };
}

export default {
    component: withRouter(connect(mapStateToProps, {
        authUser, 
        fetchCurrentUser, 
        clearCurrentUser,
        loadWord,
        showDrawer,
        loadShape,
        initSave,
        updateBlocks
    })(App))
};