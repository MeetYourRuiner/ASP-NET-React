import React, { Component } from 'react';

export class PageSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numArray: [],
        }

    }

    makeArray() {
        let pages = Math.ceil(this.props.pages);
        let array = [];
        for (let i = 1; i <= pages; i++) {
            array.push(i);
        }
        return array;
    }

    updateState() {
        if (this.state.numArray.length != Math.ceil(this.props.pages)) {
            this.setState({ numArray: this.makeArray() });
        }
    }

    render() {
        this.updateState();
        return (
            <div >
                {
                    this.state.numArray.map(page =>
                        <button className="page-selector" onClick={() => this.props.handle(page)}> {page} </button>
                    )
                }
            </div>
        );
    }
}