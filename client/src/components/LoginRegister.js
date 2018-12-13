import React from 'react';
import axios from 'axios';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            validUsername: false,
            confirmedPassword: false,
            canSubmit: false,
            username: '',
            password: '',
            confirmPassword: ''
        };
    }

    // write input text to state when change in field
    changeHandler = async (event) => {
        event.persist();
        await this.setState({ [event.target.name]: event.target.value });
        if (!this.state.isLogin) {
            this.validateRegister(event);
        }
    }

    // checks to see if username is already in database, returns true if available for new account
    availableUsername = async (username) => {
        try {
            const valid = await axios.post('https://tennis-notes.herokuapp.com/api/users/availableUsername', { username: username });
            return valid.data;
        } catch (err) {
            console.log(err);
        }
    }

    // if on register view, checks to see if input is acceptable
    validateRegister = async (event) => {
        if (event.target.name === 'username') {
            if (await this.availableUsername(event.target.value)) {
                if (!this.state.validUsername) {
                    await this.setState({ validUsername: true });
                }
            } else {
                console.log(this.state.validUsername);
                if (this.state.validUsername) {
                    await this.setState({ validUsername: false });
                }
                console.log(this.state.validUsername);
            }
        };

        if (event.target.name === 'password' || event.target.name === 'confirmPassword') {
            if (this.state.password === this.state.confirmPassword) {
                if (!this.state.confirmedPassword) {
                    await this.setState({ confirmedPassword: true });
                }
                alert('same password');
            } else {
                if (!this.state.confirmedPassword) {
                    await this.setState({ confirmedPassword: false });
                }
            }
        };

        if (this.state.confirmedPassword && this.state.validUsername && this.state.username) {
            if (!this.state.canSubmit) {
                await this.setState({ canSubmit: true });
            }
        } else {
            if (this.state.canSubmit) {
                await this.setState({ canSubmit: false });
            }
        }
    }

    // toggles view between register and login
    toggleLoginRegister = () => {
        this.setState(previousState => { 
            return { 
                isLogin: !previousState.isLogin,
                username: '',
                password: '',
                confirmPassword: ''
            }});
    }

    // sumbit handler for register view, new username and password to db
    registerSubmit = event => {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };

        axios.post('https://tennis-notes.herokuapp.com/api/users/register', newUser)
            .then(response => {
                if(response.rowCount){
                    console.log('YAYAYAYAYAYAYA!');
                } else {
                    console.log('Error registering');
                }
            })
            .catch(err => {
                console.log('Error registering');
            });
    }

    render() {
        return (
            <div className="login-register-wrapper">
                <form onSumbit={this.state.isLogin ? null : this.registerSubmit} className={this.state.isLogin ? "login-form" : "register-form"}>
                    <input
                        type="text"
                        name="username"
                        className="username-input"
                        onChange={this.changeHandler}
                        placeholder="Username"
                        value={this.state.username}
                    />
                    <input
                        type="password"
                        name="password"
                        className="password-input"
                        onChange={this.changeHandler}
                        placeholder="Password"
                        value={this.state.password}
                    />
                    {this.state.isLogin ? null : <input
                        type="password"
                        name="confirmPassword"
                        className="password-input"
                        onChange={this.changeHandler}
                        placeholder="Confirm Password"
                        value={this.state.confirmPassword}
                    />
                    }
                    <button type="button" onClick={this.state.isLogin ? null : this.registerSubmit} className={this.state.isLogin ? "login-button" : "register-button"} disabled={this.state.isLogin ? false : (this.state.canSubmit ? false : true)}>Submit</button>
                </form>
                <span onClick={this.toggleLoginRegister}>Toggle!</span>
            </div >
        )
    }
}

export default LoginRegister;