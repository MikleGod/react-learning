import * as React from "react";
import {Link} from "react-router-dom";
import {findArticleById} from "../App";

class ArticleInfo extends React.Component {

    componentDidMount() {
        findArticleById(this.getArticleIdFromUrl())
            .then(article => this.setState(article));
    }

    getArticleIdFromUrl() {
        let urlParts = window.location.href.split("/");
        console.log(urlParts);
        return urlParts[urlParts.length - 1];
    }

    render() {
        return <div className='container row'>
            <div className='card-body'>
                <h4 className='card-title'>{this.state ? this.state.title : ''}</h4>
                <p className='card-text'>{this.state ? this.state.text : "Empty"}</p>
                <Link to={"/"}>Back</Link>
            </div>
        </div>
    }
}

export default ArticleInfo
