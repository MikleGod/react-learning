import * as React from "react";
import Article from "./Article";
import {loadArticles} from "../App";

class ArticlesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        loadArticles()
            .then(articles => this.setState({articles: articles}))
            .catch(reason => console.log(JSON.stringify(reason)))
    }


    render() {
        return this.state.articles && this.state.articles.length !== 0
            ? this.state.articles
                .filter(article => this.props.search ? article.title.includes(this.props.search) : true)
                .filter(
                    articles => this.props.tags
                        ? this.props.tags
                            .filter(tag => tag.enabled)
                            .every(tag => articles.tags.indexOf(tag.name) > -1)
                        : true
                )
                .map(article => <div className='row col-12 mb-3' key={article.id}><Article article={article}/></div>)
            : <p>There are no articles</p>;
    }

}

export default ArticlesList