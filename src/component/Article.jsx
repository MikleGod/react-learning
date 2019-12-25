import * as React from "react";
import {
    Link
} from "react-router-dom";

class Article extends React.Component {
    render() {
        return <div className='card card-body'>
            <h4 className='card-title'>{this.props.article.title}</h4>
            <p className='card-text'>{this.props.article.abstract}</p>
            <Link to={"/about/" + this.props.article.id}>Learn more</Link>
        </div>
    }
}

export default Article