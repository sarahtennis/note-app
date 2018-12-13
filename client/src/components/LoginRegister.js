import React from 'react';
import axios from 'axios';

import logo from '../logo.png';

class LoginRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            validUsername: false,
            confirmedPassword: false,
            canSubmit: false,
            username: '',
            usernameChecked: false,
            password: '',
            confirmPassword: '',
            passwordChecked: false,
            modalMessage: '',
            modalVisible: false
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
        if (username === '') {
            this.setState({ usernameChecked: false });
            return;
        }
        try {
            const valid = await axios.post('https://tennis-notes.herokuapp.com/api/users/availableUsername', { username: username });
            if (!this.state.usernameChecked) {
                this.setState({ usernameChecked: true });
            }
            return valid.data;
        } catch (err) {
            console.log(err);
        }
    }

    matchingPasswords = async () => {
        if (this.state.password !== '' || this.state.confirmPassword !== '') {
            if (!this.state.passwordChecked) {
                await this.setState({ passwordChecked: true });
            }
        } else {
            if (this.state.passwordChecked) {
                await this.setState({ passwordChecked: false });
            }
        }

        if (this.state.passwordChecked) {
            if (this.state.password === this.state.confirmPassword) {
                if (!this.state.confirmedPassword) {
                    await this.setState({ confirmedPassword: true });
                }
            } else {
                if (this.state.confirmedPassword) {
                    await this.setState({ confirmedPassword: false });
                }
            }
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
                if (this.state.validUsername) {
                    await this.setState({ validUsername: false });
                }
            }
        };

        if (event.target.name === 'password' || event.target.name === 'confirmPassword') {
            this.matchingPasswords();
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
                confirmPassword: '',
                usernameChecked: false,
                validUsername: false,
                confirmedPassword: false,
                canSubmit: false,
                passwordChecked: false
            }
        });
    }

    // sumbit handler for register view, new username and password to db
    registerSubmit = async (event) => {
        event.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password
        };

        const response = await axios.post('https://tennis-notes.herokuapp.com/api/users/register', newUser);

        if (response.data.rowCount) {
            await this.setState({
                modalMessage: 'Success!',
                modalVisible: true
            });
            setTimeout(async () => {
                //await this.toggleLoginRegister();
                await this.setState({
                    modalMessage: '',
                    modalVisible: false,
                    username: '',
                    password: '',
                    confirmPassword: '',
                    usernameChecked: false,
                    validUsername: false,
                    confirmedPassword: false,
                    canSubmit: false,
                    passwordChecked: false
                })
            }, 2500);
        } else {
            await this.setState({
                modalMessage: 'Error registering, please try again.',
                modalVisible: true
            });
            setTimeout(async () => {
                await this.setState({
                    modalMessage: '',
                    modalVisible: false
                })
            }, 2500);
        }
    }

    render() {
        return (
            <div className="centered-page">
                <div className={`login-register-modal ${this.state.modalVisible ? '' : 'modal-hidden'}`}>{this.state.modalMessage}</div>
                <div className="login-register-wrapper">
                    <img src={logo} alt="logo" className="login-register-logo" />
                    <form onSubmit={this.state.isLogin ? null : this.registerSubmit} className={this.state.isLogin ? "login-form" : "register-form"}>
                        <label className={`login-register-form-label ${this.state.usernameChecked && this.state.validUsername ? 'valid' : (this.state.usernameChecked ? 'invalid' : '')}`}>
                            USERNAME
                        <input
                                type="text"
                                name="username"
                                className="username-input"
                                onChange={this.changeHandler}
                                placeholder="Username"
                                value={this.state.username}
                                autoComplete="off"
                            />
                        </label>
                        <label className="login-register-form-label">
                            PASSWORD
                        <input
                                type="password"
                                name="password"
                                className="password-input"
                                onChange={this.changeHandler}
                                placeholder="Password"
                                value={this.state.password}
                                autoComplete="off"
                            />
                        </label>
                        <label className={`login-register-form-label ${this.state.isLogin ? 'display-none' : ''} ${this.state.passwordChecked && this.state.confirmedPassword ? 'password-match' : (this.state.passwordChecked ? 'password-no-match' : '')}`}>
                            CONFIRM PASSWORD
                        <input
                                type="password"
                                name="confirmPassword"
                                className={`password-input ${this.state.isLogin ? 'display-none' : ''}`}
                                onChange={this.changeHandler}
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                autoComplete="off"
                            />
                        </label>

                        <button type="button" onClick={this.state.isLogin ? null : this.registerSubmit} className={this.state.isLogin ? "login-button" : (this.state.canSubmit ? "register-button" : "register-button-disabled")} disabled={this.state.isLogin ? false : (this.state.canSubmit ? false : true)}>{this.state.isLogin ? 'Login' : 'Register'}</button>
                    </form>
                    <span onClick={this.toggleLoginRegister}>{this.state.isLogin ? 'REGISTER NEW USER' : 'LOGIN TO ACCOUNT'}</span>
                </div>
            </div>
        )
    }
}

export default LoginRegister;