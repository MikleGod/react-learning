import React from 'react';
import './App.css';
import ArticlesList from "./component/ArticlesList";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ArticleInfo from "./component/ArticleInfo";
import Search from "./component/Search"
import Tags from "./component/Tags";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./component/Login";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {search: undefined, tags: []}
    }

    componentDidMount() {
        loadTags().then(
            tags => this.setState({tags: tags})
        )
    }


    changeSearchState(search) {
        this.setState({search: search})
    }

    changeTagsState(tagId) {
        console.log(tagId);
        let tag = this.state.tags.find(value => value.id === tagId);
        tag.enabled = !tag.enabled;
        this.setState({tags: this.state.tags})
    }

    render() {

        return (
            <BrowserRouter>
                <div className='App container'>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/">
                            <div className='row align-items-start'>
                                <div className='col-12'>
                                    <Search callback={this.changeSearchState.bind(this)} search={this.state.search}/>
                                </div>
                            </div>
                            <div className='row align-items-start'>
                                <div className='col-12'>
                                    <h1>Articles</h1>
                                </div>
                            </div>
                            <div className='row align-items-start'>
                                <div className='col-12'>
                                    <Tags callback={this.changeTagsState.bind(this)} tags={this.state.tags}/>
                                </div>
                            </div>
                            <ArticlesList search={this.state.search} tags={this.state.tags}/>
                        </Route>
                        <Route path="/about">
                            <ArticleInfo/>
                        </Route>
                    </Switch>
                </div>
                {!localStorage.getItem('user') && window.location.pathname !== '/login' ? <Redirect to="/login"/> : ''}
            </BrowserRouter>
        );
    }


}

function loadTags() {
    return fetch('/tags.json')
        .then(value => {
            console.log(JSON.stringify(value));
            return value.json()
        })
}

export function loadArticles() {
    return fetch('/articles.json')
        .then(value => {
            console.log(JSON.stringify(value));
            return value.json()
        });
}

export function findArticleById(articleId) {
    articleId = Number.parseInt(articleId);
    return loadArticles()
        .then(articles => articles.find(value => value.id === articleId));
}

export default App;
