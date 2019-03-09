import React from 'react';

import logo from '../logo.png';

class Navigation extends React.Component {
    render() {
        return (
            <div className="page-header-container">
                Hello there everyone!
            </div>
        )
    }
}

export default Navigation;

// USERS
// id - increments
// username - required, unique,128
// password - required, 128 (hashed)

// NOTES
// id
// title
// textBody
// tags
// user_id
// created_at
// updated_at

// LOGOUT TOKEN
// id
// invalidToken
// logged_out_at 

