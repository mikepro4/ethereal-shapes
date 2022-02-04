import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import * as _ from "lodash"
import update from "immutability-helper";
import ContentEditable from 'react-contenteditable'

class EditorEditableField extends Component {

    constructor(props) {
        super(props)
        this.contentEditable = this.contentEditable = React.createRef();
        this.state = {
            value: this.props.value,
            focused: false
        };
    };

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    handleChange =(event) => {
        this.setState({
            value: event.target.value
        }, () => {
           
        })
        this.props.updateField(event.target.value)
    }

    handleKeydown = evt => {
        let value = evt.target.innerHTML

        if(value) {
            this.props.updateField(evt.target.innerHTML)
        }

        // if(evt.key === "Enter" ) {
        //     window.getSelection().removeAllRanges()
        //     evt.preventDefault()
        // }
    };

    componentDidUpdate = (prevprops) => {
        if(this.props.value !== prevprops.value) {

            if(!this.state.focused) {
                this.setState({
                    value: this.props.value
                })
            }
        }
    }

    render() {
        return (
            <ContentEditable
                ref={this.contentEditable}
                className="title-editable"
                html={this.state.value} 
                disabled={false} 
                onChange={(event) => this.handleChange(event)} 
                onKeyDown={this.handleKeydown}
                onBlur={()=> {
                    this.setState({
                        focused: false
                    })
                }}
                onFocus={()=> {
                    this.setState({
                        focused: true
                    })
                }}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        app: state.app,
        location: state.router.location,
        edit: state.app.edit
    };
}

export default connect(mapStateToProps, {
})(withRouter(EditorEditableField));
