import * as React from "react";
import Tag from "./Tag";

class Tags extends React.Component {

    render() {
        return (
            <div className='btn-group'>
                {this.props.tags.map(tag => <span className='btn btn-light' key={tag.id}><Tag tag={tag} callback={this.props.callback}/></span>)}
            </div>
        )
    }

}

export default Tags