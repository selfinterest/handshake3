import React, { Component } from 'react';

import * as phony from "node-phony";

class Nato extends Component {
    //state = {code: null};

    render(){
        let nato = '';
        if(this.props.code) {
            nato = phony.to(this.props.code);
        }

        return (
            <div>{nato}</div>
        )
    }
}

export default Nato;