import * as React from "react";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: props.search ? props.search : ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(event.target.value);
        this.props.callback(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form className='form-inline no-gutters' onSubmit={this.handleSubmit}>
                    <label className='sr-only' for='searchInput'>Search by title...</label>
                    <div className='input-group col-12'>
                        <div className="input-group-prepend">
                            <div className="input-group-text align-items-start">@</div>
                        </div>
                        <input id='searchInput' className='form-control' placeholder='Search by title...' type="text" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <input type='submit' className='invisible' onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

export default Search