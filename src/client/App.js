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

import { 
    showDrawer, 
    updateAccount, 
    updateMarketTokens, 
    updateCollection,  
    activateKey,
    deactivateKey,
    updateQueryString,
    pauseAnimation,
    setDraft,
    setApproved,
    setRejected,
    setSold
} from "../client/redux/actions/appActions"
import { loadWord, updateBlocks } from "../client/redux/actions/wordsActions"
import { loadShape } from "../client/redux/actions/shapeActions"
import { initSave } from "../client/redux/actions/blocksActions"
import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

import Player from "./react/components/player"
import AudioPlayer from "./react/components/audioplayer"

import detectEthereumProvider from '@metamask/detect-provider'


// if(prevprops.blocks.uploadDone !== this.props.blocks.uploadDone && this.props.blocks.uploadDone == true) {
//             this.props.initSave()

class App extends Component {

    constructor(props){
		super(props)
		this.state = {
            appVisible: false,
            savingBlocks: false,
            balance: null
        }
    }
    
    static loadData(store, match, route, path, query) {
        if(query.draft) {
            return store.dispatch(setDraft(true));
        } 
        if(query.approved) {
            return store.dispatch(setApproved(true));
        }  
        if(query.rejected) {
            return store.dispatch(setRejected(true));
        }   
        if(query.sold) {
            return store.dispatch(setSold(true));
        }       
	}

    async componentDidMount() {
        // this.auth()
        this.loadWeb3()
        this.props.updateMarketTokens()

        setTimeout(() => {
            this.getBalance()
        }, 100)

        setInterval(() => {
            this.getBalance()
        }, 2222)

        document.addEventListener("keydown", this.onKeyDownPressed.bind(this))
        document.addEventListener("keyup", this.onKeyUpPressed.bind(this))

        if(this.getQueryParams().draft == "true") {
            this.props.setDraft(true)
        }

        setInterval(() => {
            if(!this.props.account.address) {
                this.loadWeb3()
            }
        }, 2222)
        
    }

    componentWillUnmount() {
        this.props.setDraft(false)
        document.removeEventListener("keydown", this.onKeyDownPressed.bind(this));
        document.removeEventListener("keyup", this.onKeyUpPressed.bind(this));
    }     

    @keydown("ctrl + e")
	toggleEditor() {
		console.log("toggle editor")
        if(this.getQueryParams().imageEditor == "true") {
            this.props.updateQueryString(
                { imageEditor: false },
                this.props.location,
                this.props.history
            );
        } else {
            this.props.updateQueryString(
                { imageEditor: true },
                this.props.location,
                this.props.history
            );
        }
        
    }

    @keydown("ctrl + space")
	togglePauseAnimation() {
		console.log("toggle editor")
        if(this.props.app.pauseAnimation) {
            this.props.pauseAnimation(false)
        } else {
            this.props.pauseAnimation(true)
        }
    }
    
    onKeyDownPressed(e) {
        // console.log("down", e.keyCode);
        this.props.activateKey(e.keyCode)
    }

    onKeyUpPressed(e) {
        // console.log("up", e.keyCode);
        this.props.deactivateKey(e.keyCode)
    }

    async getBalance() {
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        let signer = provider.getSigner()

        let contract = new ethers.Contract(nftAddress, NFT.abi, signer)
        // console.log(this.props.account.address)
        let balance = await contract.balanceOf(this.props.account.address);
        // console.log("owned token: " + parseInt(balance, 16))

        let ethbalance = await provider.getBalance(this.props.account.address)
        // let ether = ethers.utils.formatUnits(ethbalance.toString(), "ether")
        let res = ethers.utils.formatEther(ethbalance);
        res = Math.round(res * 1e4) / 1e4;
        console.log("balance: ", res)

        this.props.updateAccount({
            balance: res,
            ownedTokens: parseInt(balance, 16),
        })
        
       
    }

    auth() {
        if(window && localStorage) {
            const token = localStorage.getItem('token');
            if (token) {
                this.props.authUser()
                this.loadUser()
            } else {
                this.showApp()
            }
        }
    }

    componentDidUpdate(prevprops) {
        if(!_.isEqual(prevprops.location.search, this.props.location.search)) {
            this.loadWeb3()
        }

        if(this.props.word && this.props.word.metadata) {
            if(!_.isEqual(prevprops.word, this.props.word)) {
                this.props.loadShape(this.props.word.metadata.shapeId)
            }
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
        let provider = window.ethereum;

        if (typeof provider !== 'undefined') {
            console.log('MetaMask is installed!');
            this.props.updateAccount({
                metamask: true,
            })
        }

        let accounts = await provider.request({ method: "eth_requestAccounts"});
        let account = accounts[0]
        console.log(account)

        this.props.updateAccount({
            address: account,
        })

        provider.on('chainChanged', async () => {
            this.getBalance()
    
            console.log("reload")
            // alert("chain changed")
        })

        

        provider.on('accountsChanged', async (data) => {
    
            this.props.updateAccount({
                address: data[0],
            })

            this.props.updateCollection(true)

            // if (typeof provider !== 'undefined') {
            //     console.log('MetaMask is installed!');
            //     this.props.updateAccount({
            //         metamask: true,
            //     })
            // } else{
            //     this.props.updateAccount({
            //         metamask: false,
            //     })
            // }

            // this.loadWeb3()
    
        })

        // provider.on('networkChanged', async(networkId) => {
        //     this.getBalance()
        //     this.setState({
        //         networkId: networkId
        //     })
        //     // alert("network chainged")
        // });

        provider.on('connect', async(networkId) => {
            console.log("CONNECT")
            location.reload();
            // alert("connect")
        });

        // provider.on('disconnect', async(networkId) => {
        //     alert("disconnect")
        //     console.log("DISCONNECT")
        // });

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

                <div className="main-section">
                    <div className="app-route-container">
                        {renderRoutes(this.props.route.routes)}
                    </div>
                </div>

                {/* 

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


                <Scroll/>
                <AudioPlayer/>
                
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
        blocks: state.blocks,
        account: state.app.account,
        app: state.app
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
        updateBlocks,
        updateAccount,
        updateMarketTokens,
        updateCollection,
        activateKey,
        deactivateKey,
        updateQueryString,
        pauseAnimation,
        setDraft,
        setApproved,
        setRejected,
        setSold
    })(App))
};