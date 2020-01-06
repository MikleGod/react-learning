import * as React from "react";
import {Redirect} from "react-router-dom";
import Preloader from "./Preloader";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEmailValid: false,
            isPasswordValid: false,
            invalidEmailMessage: '',
            invalidPasswordMessage: '',
            email: '',
            password: ''
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isEmailValid = this.isEmailValid.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
    }

    handleEmailChange(event) {
        let email = event.target.value;
        this.setState({
            email: email,
            isEmailValid: this.isEmailValid(email),
            invalidEmailMessage: 'Email does not correspond to our policy'
        });
    }

    isEmailValid(email) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }

    handlePasswordChange(event) {
        let password = event.target.value;
        this.setState({
            password: password,
            isPasswordValid: this.isPasswordValid(password),
            invalidPasswordMessage: 'Password must contain ' +
                'minimum 8 symbols of digits, lowercase letters, uppercase letters and a special ' +
                'character(s).'
        });
    }

    isPasswordValid(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/.test(password)
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.isEmailValid || !this.state.isPasswordValid) {
            return;
        }
        this.setState({loading: true});
        fetch('/users.json').then(value => value.json())
            .then(users => {
                let usersWithCorrectEmail = users.filter(user => user.email === this.state.email);
                let isEmailValid = usersWithCorrectEmail.length > 0;
                let isPasswordValid = usersWithCorrectEmail[0].password === this.state.password;
                if (!isEmailValid || !isPasswordValid) {
                    this.setState({
                        isEmailValid: isEmailValid,
                        isPasswordValid: isPasswordValid,
                        invalidEmailMessage: 'Wrong email!',
                        invalidPasswordMessage: 'Wrong password!'
                    })
                } else {
                    localStorage.setItem('user', usersWithCorrectEmail[0]);
                    this.setState({loading: false, success: true});
                }
            })
            .catch(reason => this.setState({loading: false, success: false}));
    }

    render() {

        if (localStorage.getItem('user')) {
            return (
                <Redirect to="/"/>
            )
        }

        return (
            <div className="row align-self-center">
                <div className="col-4"/>
                <form className="col-4 card-body" onSubmit={this.handleSubmit} noValidate>
                    <h3 className="card-title text-center">Authorization</h3>
                    <div className="form-check form-row mb-2">
                        <input type="text"
                               className={"form-control" + (this.state.isEmailValid ? " is-valid" : " is-invalid")}
                               placeholder="Email *" name="email" onChange={this.handleEmailChange}
                               value={this.state.email} required/>
                        <div className="invalid-feedback">{this.state.invalidEmailMessage}</div>
                    </div>
                    <div className="form-check form-row mb-2">
                        <input type="password"
                               className={"form-control" + (this.state.isPasswordValid ? " is-valid" : " is-invalid")}
                               placeholder="Password *"
                               name="password"
                               onChange={this.handlePasswordChange}
                               value={this.state.password} required/>
                        <div className="invalid-feedback">{this.state.invalidPasswordMessage}</div>
                    </div>
                    <div className="form-check form-row mb-2">
                        <input type="submit" disabled={this.state.loading} className="form-control btn btn-primary" value="Confirm"/>

                        {
                            this.state.loading
                                ? <div className="form-row mb-3 d-flex justify-content-center align-items-center"><Preloader/></div>
                                : ''
                        }
                    </div>
                </form>
                <div className="col-4"/>
            </div>
        );
    }
}

export default Login