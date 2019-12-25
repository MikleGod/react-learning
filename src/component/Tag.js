import * as React from "react";

class Tag extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.callback(this.props.tag.id)
    }

    render() {
        return (
                <span onClick={this.handleClick} style={{color: this.props.tag.enabled ? '#123456' : '#812354'}}>
                    {this.props.tag.name}
                </span>
        );
    }
}

export default Tag