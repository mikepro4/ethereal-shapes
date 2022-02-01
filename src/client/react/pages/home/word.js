import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { motion } from "framer-motion"
import keydown from "react-keydown";

import QuickPinchZoom, { make3dTransformValue, make2dTransformValue } from "react-quick-pinch-zoom";

import Block from "../../components/block"


class Word extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }

        this.innerRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visible: true,
            })
        }, 500)

    }

    onUpdate = ({ x, y, scale }) => {
        const { current: div } = this.innerRef;

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        const use3DTransform = !isSafari;

        const makeTransformValue = use3DTransform
        ? make3dTransformValue
        : make2dTransformValue;
    
        if (div) {
          const value = make3dTransformValue({ x, y, scale });
    
          div.style.setProperty("transform", value);
        }
      };

    render() {

        if(this.state.visible) {
            return (
                <div
                    className={classNames({
                        "word": true,
                        "visible": this.state.visible
                    })}
                >
                    <QuickPinchZoom   
                        ref={this.quickPinchZoomRef} 
                        onUpdate={this.onUpdate} 
                        horizontalPadding={10000}
                        maxZoom={20}
                    >
                        <div className="inner-container" ref={this.innerRef}>

                            <div className="word-container"  >
                        <svg  width="644" height="219" viewBox="0 0 644 219" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* <rect x="3" y="31" width="15" height="15" fill="white"/> */}
                            <foreignObject x="3" y="31" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={1} />
                                </div>
                            </foreignObject>
                            {/* <rect x="15" y="29" width="15" height="15" fill="white"/> */}
                            <foreignObject x="15" y="29" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={2} />
                                </div>
                            </foreignObject>
                            {/* <rect x="27" y="27" width="15" height="15" fill="white"/> */}
                            <foreignObject x="27" y="27" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={3} />
                                </div>
                            </foreignObject>
                            {/* <rect x="39" y="25" width="15" height="15" fill="white"/> */}
                            <foreignObject x="39" y="25" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={4} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="23" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="23" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={5} />
                                </div>
                            </foreignObject>
                            {/* <rect x="63" y="20" width="15" height="15" fill="white"/> */}
                            <foreignObject x="63" y="20" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={6} />
                                </div>
                            </foreignObject>
                            {/* <rect x="75" y="16" width="15" height="15" fill="white"/> */}
                            <foreignObject x="75" y="16" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={7} />
                                </div>
                            </foreignObject>
                            {/* <rect x="87" y="12" width="15" height="15" fill="white"/> */}
                            <foreignObject x="87" y="12" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={8} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="38" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="38" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={9} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="53" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="53" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={10} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="68" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="68" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={11} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="98" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="98" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={12} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="113" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="113" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={13} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="128" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="128" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={14} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="143" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="143" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={15} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="158" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="158" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={16} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="173" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="173" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={17} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="188" width="15" height="15" fill="white"/> */}
                            <foreignObject x="51" y="188" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={18} />
                                </div>
                            </foreignObject>
                            {/* <rect x="47" y="198" width="15" height="15" fill="white"/> */}
                            <foreignObject x="47" y="198" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={19} />
                                </div>
                            </foreignObject>
                            {/* <rect x="33" y="201" width="15" height="15" fill="white"/> */}
                            <foreignObject x="33" y="201" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={20} />
                                </div>
                            </foreignObject>
                            {/* <rect x="19" y="204" width="15" height="15" fill="white"/> */}
                            <foreignObject x="19" y="204" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={21} />
                                </div>
                            </foreignObject>
                            {/* <rect y="83" width="15" height="15" fill="white"/> */}
                            {/* <foreignObject x="83" y="15" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={22} />
                                </div>
                            </foreignObject> */}
                            {/* <rect x="15" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="15" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={23} />
                                </div>
                            </foreignObject>
                            {/* <rect x="30" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="30" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={24} />
                                </div>
                            </foreignObject>
                            {/* <rect x="45" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="45" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={25} />
                                </div>
                            </foreignObject>
                            {/* <rect x="51" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="60" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={26} />
                                </div>
                            </foreignObject>
                            {/* <rect x="60" y="83" width="15" height="15" fill="white"/> */}
                            {/* <foreignObject x="60" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={26} />
                                </div>
                            </foreignObject> */}
                            {/* <rect x="75" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="75" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={27} />
                                </div>
                            </foreignObject>
                            {/* <rect x="90" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="90" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={28} />
                                </div>
                            </foreignObject>
                            {/* <rect x="105" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="105" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={29} />
                                </div>
                            </foreignObject>
                            {/* <rect x="120" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="120" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={30} />
                                </div>
                            </foreignObject>
                            {/* <rect x="135" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="135" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={31} />
                                </div>
                            </foreignObject>
                            {/* <rect x="150" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="150" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={32} />
                                </div>
                            </foreignObject>
                            {/* <rect x="165" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="165" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={33} />
                                </div>
                            </foreignObject>
                            {/* <rect x="180" y="83" width="15" height="15" fill="white"/> */}
                            <foreignObject x="180" y="83" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={34} />
                                </div>
                            </foreignObject>
                            {/* <rect x="3" y="141" width="15" height="15" fill="white"/> */}
                            <foreignObject x="3" y="141" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={35} />
                                </div>
                            </foreignObject>
                            {/* <rect x="15" y="139" width="15" height="15" fill="white"/> */}
                            <foreignObject x="15" y="139" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={36} />
                                </div>
                            </foreignObject>
                            {/* <rect x="27" y="137" width="15" height="15" fill="white"/> */}
                            <foreignObject x="27" y="137" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={37} />
                                </div>
                            </foreignObject>
                            {/* <rect x="39" y="134" width="15" height="15" fill="white"/> */}
                            <foreignObject x="39" y="134" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={38} />
                                </div>
                            </foreignObject>
                            {/* <rect x="66" y="128" width="15" height="15" fill="white"/> */}
                            <foreignObject x="66" y="128" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={39} />
                                </div>
                            </foreignObject>
                            {/* <rect x="75" y="124" width="15" height="15" fill="white"/> */}
                            <foreignObject x="75" y="124" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={40} />
                                </div>
                            </foreignObject>
                            {/* <rect x="87" y="120" width="15" height="15" fill="white"/> */}
                            <foreignObject x="87" y="120" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={41} />
                                </div>
                            </foreignObject>
                            {/* <rect x="115" y="13" width="15" height="15" fill="white"/> */}
                            <foreignObject x="115" y="13" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={42} />
                                </div>
                            </foreignObject>
                            {/* <rect x="116" y="28" width="15" height="15" fill="white"/> */}
                            <foreignObject x="116" y="28" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={43} />
                                </div>
                            </foreignObject>
                            {/* <rect x="117" y="43" width="15" height="15" fill="white"/> */}
                            <foreignObject x="117" y="43" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={44} />
                                </div>
                            </foreignObject>
                            {/* <rect x="118" y="58" width="15" height="15" fill="white"/> */}
                            <foreignObject x="118" y="58" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={45} />
                                </div>
                            </foreignObject>
                            {/* <rect x="119" y="73" width="15" height="15" fill="white"/> */}
                            <foreignObject x="119" y="73" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={46} />
                                </div>
                            </foreignObject>
                            {/* <rect x="120" y="88" width="15" height="15" fill="white"/> */}
                            <foreignObject x="120" y="88" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={47} />
                                </div>
                            </foreignObject>
                            {/* <rect x="122" y="103" width="15" height="15" fill="white"/> */}
                            <foreignObject x="122" y="103" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={48} />
                                </div>
                            </foreignObject>
                            {/* <rect x="125" y="118" width="15" height="15" fill="white"/> */}
                            <foreignObject x="125" y="118" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={49} />
                                </div>
                            </foreignObject>
                            {/* <rect x="128" y="133" width="15" height="15" fill="white"/> */}
                            <foreignObject x="128" y="133" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={50} />
                                </div>
                            </foreignObject>
                            {/* <rect x="132" y="148" width="15" height="15" fill="white"/> */}
                            <foreignObject x="132" y="148" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={51} />
                                </div>
                            </foreignObject>
                            {/* <rect x="136" y="163" width="15" height="15" fill="white"/> */}
                            <foreignObject x="136" y="163" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={52} />
                                </div>
                            </foreignObject>
                            {/* <rect x="142" y="178" width="15" height="15" fill="white"/> */}
                            <foreignObject x="142" y="178" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={53} />
                                </div>
                            </foreignObject>
                            {/* <rect x="151" y="193" width="15" height="15" fill="white"/> */}
                            <foreignObject x="151" y="193" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={54} />
                                </div>
                            </foreignObject>
                            {/* <rect x="166" y="201" width="15" height="15" fill="white"/> */}
                            <foreignObject x="151" y="193" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={55} />
                                </div>
                            </foreignObject>
                            {/* <rect x="181" y="198" width="15" height="15" fill="white"/> */}
                            <foreignObject x="166" y="201" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={56} />
                                </div>
                            </foreignObject>
                            {/* <rect x="187" y="183" width="15" height="15" fill="white"/> */}
                            <foreignObject x="181" y="198" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={57} />
                                </div>
                            </foreignObject>

                            <foreignObject x="187" y="183" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={58} />
                                </div>
                            </foreignObject>
                            {/* <rect x="189" y="168" width="15" height="15" fill="white"/> */}
                            <foreignObject x="189" y="168" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={59} />
                                </div>
                            </foreignObject>
                            {/* <rect x="93" y="188" width="15" height="15" fill="white"/> */}
                            <foreignObject x="93" y="188" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={60} />
                                </div>
                            </foreignObject>
                            {/* <rect x="108" y="178" width="15" height="15" fill="white"/> */}
                            <foreignObject x="108" y="178" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={61} />
                                </div>
                            </foreignObject>
                            {/* <rect x="121" y="170" width="15" height="15" fill="white"/> */}
                            <foreignObject x="121" y="170" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={62} />
                                </div>
                            </foreignObject>
                            {/* <rect x="141" y="155" width="15" height="15" fill="white"/> */}
                            <foreignObject x="141" y="155" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={63} />
                                </div>
                            </foreignObject>
                            {/* <rect x="151" y="140" width="15" height="15" fill="white"/> */}
                            <foreignObject x="151" y="140" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={64} />
                                </div>
                            </foreignObject>
                            {/* <rect x="161" y="125" width="15" height="15" fill="white"/> */}
                            <foreignObject x="161" y="125" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={65} />
                                </div>
                            </foreignObject>
                            {/* <rect x="171" y="110" width="15" height="15" fill="white"/> */}
                            <foreignObject x="171" y="110" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={66} />
                                </div>
                            </foreignObject>
                            {/* <rect x="233" y="25" width="15" height="15" fill="white"/> */}
                            <foreignObject x="233" y="25" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={67} />
                                </div>
                            </foreignObject>
                            {/* <rect x="248" y="24" width="15" height="15" fill="white"/> */}
                            <foreignObject x="248" y="24" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={68} />
                                </div>
                            </foreignObject>
                            {/* <rect x="263" y="22" width="15" height="15" fill="white"/> */}
                            <foreignObject x="263" y="22" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={69} />
                                </div>
                            </foreignObject>
                            {/* <rect x="278" y="20" width="15" height="15" fill="white"/> */}
                            <foreignObject x="278" y="20" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={70} />
                                </div>
                            </foreignObject>
                            {/* <rect x="293" y="19" width="15" height="15" fill="white"/> */}
                            <foreignObject x="293" y="19" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={71} />
                                </div>
                            </foreignObject>
                            {/* <rect x="308" y="17" width="15" height="15" fill="white"/> */}
                            <foreignObject x="308" y="17" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={72} />
                                </div>
                            </foreignObject>
                            {/* <rect x="323" y="15" width="15" height="15" fill="white"/> */}
                            <foreignObject x="323" y="15" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={73} />
                                </div>
                            </foreignObject>
                            {/* <rect x="338" y="13" width="15" height="15" fill="white"/> */}
                            <foreignObject x="338" y="13" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={74} />
                                </div>
                            </foreignObject>
                            {/* <rect x="353" y="10" width="15" height="15" fill="white"/> */}
                            <foreignObject x="353" y="10" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={75} />
                                </div>
                            </foreignObject>
                            {/* <rect x="368" y="7" width="15" height="15" fill="white"/> */}
                            <foreignObject x="368" y="7" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={76} />
                                </div>
                            </foreignObject>
                            {/* <rect x="383" y="4" width="15" height="15" fill="white"/> */}
                            <foreignObject x="383" y="4" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={77} />
                                </div>
                            </foreignObject>
                            {/* <rect x="398" width="15" height="15" fill="white"/> */}
                            <foreignObject x="398" y="0" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={78} />
                                </div>
                            </foreignObject>
                            {/* <rect x="230" y="82" width="15" height="15" fill="white"/> */}
                            <foreignObject x="230" y="82" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={79} />
                                </div>
                            </foreignObject>
                            {/* <rect x="230" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="230" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={80} />
                                </div>
                            </foreignObject>
                            {/* <rect x="245" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="245" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={81} />
                                </div>
                            </foreignObject>
                            {/* <rect x="260" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="260" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={82} />
                                </div>
                            </foreignObject>
                            {/* <rect x="275" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="275" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={83} />
                                </div>
                            </foreignObject>
                            {/* <rect x="290" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="290" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={84} />
                                </div>
                            </foreignObject>
                            {/* <rect x="305" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="305" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={85} />
                                </div>
                            </foreignObject>
                            {/* <rect x="320" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="320" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={86} />
                                </div>
                            </foreignObject>
                            {/* <rect x="335" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="335" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={87} />
                                </div>
                            </foreignObject>
                            {/* <rect x="350" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="350" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={88} />
                                </div>
                            </foreignObject>
                            {/* <rect x="365" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="365" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={89} />
                                </div>
                            </foreignObject>
                            {/* <rect x="380" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="380" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={90} />
                                </div>
                            </foreignObject>
                            {/* <rect x="395" y="67" width="15" height="15" fill="white"/> */}
                            <foreignObject x="395" y="67" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={91} />
                                </div>
                            </foreignObject>
                            {/* <rect x="395" y="82" width="15" height="15" fill="white"/> */}
                            <foreignObject x="395" y="82" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={92} />
                                </div>
                            </foreignObject>
                            {/* <rect x="259" y="37" width="15" height="15" fill="white"/> */}
                            <foreignObject x="259" y="37" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={93} />
                                </div>
                            </foreignObject>
                            {/* <rect x="267" y="52" width="15" height="15" fill="white"/> */}
                            <foreignObject x="267" y="52" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={94} />
                                </div>
                            </foreignObject>
                            {/* <rect x="313" y="37" width="15" height="15" fill="white"/> */}
                            <foreignObject x="313" y="37" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={95} />
                                </div>
                            </foreignObject>
                            {/* <rect x="320" y="52" width="15" height="15" fill="white"/> */}
                            <foreignObject x="320" y="52" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={96} />
                                </div>
                            </foreignObject>
                            {/* <rect x="359" y="52" width="15" height="15" fill="white"/> */}
                            <foreignObject x="359" y="52" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={97} />
                                </div>
                            </foreignObject>
                            {/* <rect x="367" y="37" width="15" height="15" fill="white"/> */}
                            <foreignObject x="367" y="37" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={98} />
                                </div>
                            </foreignObject>
                            {/* <rect x="238" y="192" width="15" height="15" fill="white"/> */}
                            <foreignObject x="238" y="192" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={99} />
                                </div>
                            </foreignObject>
                            {/* <rect x="254" y="177" width="15" height="15" fill="white"/> */}
                            <foreignObject x="254" y="177" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={100} />
                                </div>
                            </foreignObject>
                            {/* <rect x="265" y="162" width="15" height="15" fill="white"/> */}
                            <foreignObject x="265" y="162" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={101} />
                                </div>
                            </foreignObject>
                            {/* <rect x="274" y="147" width="15" height="15" fill="white"/> */}
                            <foreignObject x="274" y="147" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={102} />
                                </div>
                            </foreignObject>
                            {/* <rect x="281" y="132" width="15" height="15" fill="white"/> */}
                            <foreignObject x="281" y="132" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={103} />
                                </div>
                            </foreignObject>
                            {/* <rect x="286" y="117" width="15" height="15" fill="white"/> */}
                            <foreignObject x="286" y="117" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={104} />
                                </div>
                            </foreignObject>
                            {/* <rect x="289" y="102" width="15" height="15" fill="white"/> */}
                            <foreignObject x="289" y="93" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={105} />
                                </div>
                            </foreignObject>
                            {/* <rect x="292" y="87" width="15" height="15" fill="white"/> */}
                            <foreignObject x="292" y="82" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={106} />
                                </div>
                            </foreignObject>
                            {/* <rect x="247" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="247" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={107} />
                                </div>
                            </foreignObject>
                            {/* <rect x="262" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="262" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={108} />
                                </div>
                            </foreignObject>
                            {/* <rect x="277" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="277" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={109} />
                                </div>
                            </foreignObject>
                            {/* <rect x="292" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="292" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={110} />
                                </div>
                            </foreignObject>
                            {/* <rect x="307" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="307" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={111} />
                                </div>
                            </foreignObject>
                            {/* <rect x="322" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="322" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={112} />
                                </div>
                            </foreignObject>
                            {/* <rect x="337" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="337" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={113} />
                                </div>
                            </foreignObject>
                            {/* <rect x="352" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="352" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={114} />
                                </div>
                            </foreignObject>
                            {/* <rect x="367" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="367" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={115} />
                                </div>
                            </foreignObject>
                            {/* <rect x="382" y="106" width="15" height="15" fill="white"/> */}
                            <foreignObject x="382" y="106" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={116} />
                                </div>
                            </foreignObject>
                            {/* <rect x="286" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="286" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={117} />
                                </div>
                            </foreignObject>
                            {/* <rect x="301" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="301" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={118} />
                                </div>
                            </foreignObject>
                            {/* <rect x="316" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="316" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={119} />
                                </div>
                            </foreignObject>
                            {/* <rect x="331" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="331" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={120} />
                                </div>
                            </foreignObject>
                            {/* <rect x="346" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="346" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={121} />
                                </div>
                            </foreignObject>
                            {/* <rect x="361" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="361" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={122} />
                                </div>
                            </foreignObject>
                            {/* <rect x="376" y="138" width="15" height="15" fill="white"/> */}
                            <foreignObject x="376" y="138" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={123} />
                                </div>
                            </foreignObject>
                            {/* <rect x="368" y="153" width="15" height="15" fill="white"/> */}
                            <foreignObject x="368" y="153" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={124} />
                                </div>
                            </foreignObject>
                            {/* <rect x="358" y="164" width="15" height="15" fill="white"/> */}
                            <foreignObject x="358" y="164" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={125} />
                                </div>
                            </foreignObject>
                            {/* <rect x="346" y="173" width="15" height="15" fill="white"/> */}
                            <foreignObject x="346" y="173" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={126} />
                                </div>
                            </foreignObject>
                            {/* <rect x="332" y="180" width="15" height="15" fill="white"/> */}
                            <foreignObject x="332" y="180" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={127} />
                                </div>
                            </foreignObject>
                            {/* <rect x="317" y="188" width="15" height="15" fill="white"/> */}
                            <foreignObject x="317" y="188" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={128} />
                                </div>
                            </foreignObject>
                            {/* <rect x="302" y="192" width="15" height="15" fill="white"/> */}
                            <foreignObject x="302" y="192" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={129} />
                                </div>
                            </foreignObject>
                            {/* <rect x="287" y="196" width="15" height="15" fill="white"/> */}
                            <foreignObject x="287" y="196" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={130} />
                                </div>
                            </foreignObject>
                            {/* <rect x="272" y="200" width="15" height="15" fill="white"/> */}
                            <foreignObject x="272" y="200" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={131} />
                                </div>
                            </foreignObject>
                            {/* <rect x="288" y="153" width="15" height="15" fill="white"/> */}
                            <foreignObject x="288" y="153" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={132} />
                                </div>
                            </foreignObject>
                            {/* <rect x="298" y="164" width="15" height="15" fill="white"/> */}
                            <foreignObject x="298" y="164" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={133} />
                                </div>
                            </foreignObject>
                            {/* <rect x="311" y="172" width="15" height="15" fill="white"/> */}
                            <foreignObject x="311" y="172" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={134} />
                                </div>
                            </foreignObject>
                            {/* <rect x="323" y="178" width="15" height="15" fill="white"/> */}
                            <foreignObject x="323" y="178" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={135} />
                                </div>
                            </foreignObject>
                            {/* <rect x="344" y="188" width="15" height="15" fill="white"/> */}
                            <foreignObject x="344" y="188" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={136} />
                                </div>
                            </foreignObject>
                            {/* <rect x="359" y="191" width="15" height="15" fill="white"/> */}
                            <foreignObject x="359" y="191" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={137} />
                                </div>
                            </foreignObject>
                            {/* <rect x="374" y="195" width="15" height="15" fill="white"/> */}
                            <foreignObject x="374" y="195" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={138} />
                                </div>
                            </foreignObject>
                            {/* <rect x="389" y="198" width="15" height="15" fill="white"/> */}
                            <foreignObject x="389" y="198" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={139} />
                                </div>
                            </foreignObject>
                            {/* <rect x="433" y="99" width="15" height="15" fill="white"/> */}
                            <foreignObject x="433" y="99" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={140} />
                                </div>
                            </foreignObject>
                            {/* <rect x="446" y="84" width="15" height="15" fill="white"/> */}
                            <foreignObject x="446" y="84" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={141} />
                                </div>
                            </foreignObject>
                            {/* <rect x="455" y="69" width="15" height="15" fill="white"/> */}
                            <foreignObject x="455" y="69" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={142} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="54" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="54" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={143} />
                                </div>
                            </foreignObject>
                            {/* <rect x="475" y="39" width="15" height="15" fill="white"/> */}
                            <foreignObject x="475" y="39" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={144} />
                                </div>
                            </foreignObject>
                            {/* <rect x="482" y="24" width="15" height="15" fill="white"/> */}
                            <foreignObject x="482" y="24" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={145} />
                                </div>
                            </foreignObject>
                            {/* <rect x="489" y="9" width="15" height="15" fill="white"/> */}
                            <foreignObject x="489" y="9" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={146} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="69" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="69" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={147} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="84" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="84" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={148} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="99" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="99" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={149} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="114" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="114" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={150} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="129" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="129" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={151} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="144" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="144" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={152} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="159" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="159" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={153} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="174" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="174" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={154} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="189" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="189" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={155} />
                                </div>
                            </foreignObject>
                            {/* <rect x="468" y="204" width="15" height="15" fill="white"/> */}
                            <foreignObject x="468" y="204" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={156} />
                                </div>
                            </foreignObject>
                            {/* <rect x="500" y="102" width="15" height="15" fill="white"/> */}
                            <foreignObject x="500" y="102" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={157} />
                                </div>
                            </foreignObject>
                            {/* <rect x="509" y="87" width="15" height="15" fill="white"/> */}
                            <foreignObject x="509" y="87" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={158} />
                                </div>
                            </foreignObject>
                            {/* <rect x="518" y="72" width="15" height="15" fill="white"/> */}
                            <foreignObject x="518" y="72" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={159} />
                                </div>
                            </foreignObject>
                            {/* <rect x="524" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="524" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={160} />
                                </div>
                            </foreignObject>
                            {/* <rect x="529" y="42" width="15" height="15" fill="white"/> */}
                            <foreignObject x="529" y="42" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={161} />
                                </div>
                            </foreignObject>
                            {/* <rect x="533" y="27" width="15" height="15" fill="white"/> */}
                            <foreignObject x="533" y="27" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={162} />
                                </div>
                            </foreignObject>
                            {/* <rect x="536" y="12" width="15" height="15" fill="white"/> */}
                            <foreignObject x="536" y="12" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={163} />
                                </div>
                            </foreignObject>
                            {/* <rect x="539" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="539" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={164} />
                                </div>
                            </foreignObject>
                            {/* <rect x="554" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="554" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={165} />
                                </div>
                            </foreignObject>
                            {/* <rect x="569" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="569" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={166} />
                                </div>
                            </foreignObject>
                            {/* <rect x="584" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="584" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={167} />
                                </div>
                            </foreignObject>
                            {/* <rect x="599" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="599" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={168} />
                                </div>
                            </foreignObject>
                            {/* <rect x="614" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="614" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={169} />
                                </div>
                            </foreignObject>
                            {/* <rect x="629" y="57" width="15" height="15" fill="white"/> */}
                            <foreignObject x="629" y="57" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={170} />
                                </div>
                            </foreignObject>
                            {/* <rect x="628" y="72" width="15" height="15" fill="white"/> */}
                            <foreignObject x="628" y="72" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={171} />
                                </div>
                            </foreignObject>
                            {/* <rect x="626" y="87" width="15" height="15" fill="white"/> */}
                            <foreignObject x="626" y="87" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={172} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="72" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="72" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={173} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="87" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="87" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={174} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="102" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="102" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={175} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="117" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="117" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={176} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="132" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="132" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={177} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="147" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="147" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={178} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="162" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="162" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={180} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="177" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="177" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={181} />
                                </div>
                            </foreignObject>
                            {/* <rect x="570" y="192" width="15" height="15" fill="white"/> */}
                            <foreignObject x="570" y="192" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={182} />
                                </div>
                            </foreignObject>
                            {/* <rect x="561" y="200" width="15" height="15" fill="white"/> */}
                            <foreignObject x="561" y="200" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={183} />
                                </div>
                            </foreignObject>
                            {/* <rect x="546" y="203" width="15" height="15" fill="white"/> */}
                            <foreignObject x="546" y="203" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={184} />
                                </div>
                            </foreignObject>
                            {/* <rect x="532" y="110" width="15" height="15" fill="white"/> */}
                            <foreignObject x="532" y="110" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={185} />
                                </div>
                            </foreignObject>
                            {/* <rect x="529" y="125" width="15" height="15" fill="white"/> */}
                            <foreignObject x="529" y="125" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={186} />
                                </div>
                            </foreignObject>
                            {/* <rect x="524" y="140" width="15" height="15" fill="white"/> */}
                            <foreignObject x="524" y="140" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={187} />
                                </div>
                            </foreignObject>
                            {/* <rect x="517" y="155" width="15" height="15" fill="white"/> */}
                            <foreignObject x="517" y="155" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={188} />
                                </div>
                            </foreignObject>
                            {/* <rect x="509" y="170" width="15" height="15" fill="white"/> */}
                            <foreignObject x="509" y="170" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={189} />
                                </div>
                            </foreignObject>
                            {/* <rect x="605" y="110" width="15" height="15" fill="white"/> */}
                            <foreignObject x="605" y="110" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={190} />
                                </div>
                            </foreignObject>
                            {/* <rect x="612" y="125" width="15" height="15" fill="white"/> */}
                            <foreignObject x="612" y="125" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={191} />
                                </div>
                            </foreignObject>
                            {/* <rect x="618" y="140" width="15" height="15" fill="white"/> */}
                            <foreignObject x="618" y="140" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={192} />
                                </div>
                            </foreignObject>
                            {/* <rect x="618" y="140" width="15" height="15" fill="white"/> */}
                            <foreignObject x="623" y="155" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={193} />
                                </div>
                            </foreignObject>
                            {/* <rect x="626" y="170" width="15" height="15" fill="white"/> */}
                            <foreignObject x="626" y="170" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={194} />
                                </div>
                            </foreignObject>
                            {/* <rect x="150" y="24" width="15" height="15" fill="white"/> */}
                            <foreignObject x="150" y="24" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={195} />
                                </div>
                            </foreignObject>
                            {/* <rect x="150" y="24" width="15" height="15" fill="white"/> */}
                            <foreignObject x="165" y="35" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={196} />
                                </div>
                            </foreignObject>
                            {/* <rect x="175" y="50" width="15" height="15" fill="white"/> */}
                            <foreignObject x="175" y="50" width="15" height="15">
                                <div className="word-block-container">
                                    <Block position={197} />
                                </div>
                            </foreignObject>
                        </svg>
                        </div>

                        </div>
    
                        </QuickPinchZoom>
    
                </div>
            );
        } else {
            return (<div></div>)
        }
        
    }
}

function mapStateToProps(state) {
    return {
        location: state.router.location,
        user: state.app.user
    };
}

export default connect(mapStateToProps, {
})(withRouter(Word));
