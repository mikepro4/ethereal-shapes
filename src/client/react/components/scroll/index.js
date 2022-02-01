import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import classNames from "classnames"
import { Link } from "react-router-dom";

import { 
    updateTotalPixels, 
    updateTotalScrolledPixels, 
    setScrollTo,
    resetScrollTo
} 
from "../../../redux/actions/appActions";


class Scroll extends Component {
	state = {
        clientHeight: 0,
        newScrollTo: 0
    };

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            if(!this.props.location.search) {
                this.props.updateTotalScrolledPixels(0)
                this.props.setScrollTo(0)
            }

            let node = document.getElementById("menu-container")

            if(this.props.totalPixels !== node.scrollHeight) {
                this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
            }
        }

       
        if(prevProps.scrollTo !== this.props.scrollTo) {
            document.getElementById("menu-container").scrollTop = this.props.scrollTo
            this.props.resetScrollTo()
        }

    }

    handleScroll = (event) => {
        console.log("Scroll")

        this.props.updateTotalScrolledPixels(document.getElementById("menu-container").scrollTop)
    }

    componentDidMount() {
        setTimeout(() => {
            let node = document.getElementById("menu-container")
            window.addEventListener('scroll', this.handleScroll);
            this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)

            this.setState({
                clientHeight: node.clientHeight
            })

            window.addEventListener("resize", this.handleResize);
            console.log(node)
        }, 1000)
        

        
    }

    handleResize = () => {
        let node = document.getElementById("menu-container")
        this.props.updateTotalPixels(node.scrollHeight, node.clientWidth, node.clientHeight)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

	render() {
		return (
            <div className="scroll">
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        totalPixels: state.app.totalPixels,
        totalScrolledPixels: state.app.totalScrolledPixels,
        location: state.router.location,
        scrollTo: state.app.scrollTo,
	};
}

export default connect(mapStateToProps, {
    updateTotalPixels, 
    updateTotalScrolledPixels, 
    setScrollTo,
    resetScrollTo
})(Scroll);
