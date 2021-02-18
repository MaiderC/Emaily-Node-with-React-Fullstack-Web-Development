import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent()
    {
        switch(this.props.auth){
            case null:
                // Still deciding
                return;
                
            case false:
                // Not logged
                return (<li><a href="/auth/google">Log in with Google</a></li>);

            default:
                // logged
                return [
                    <li key="1"  style={{margin: '0 15px'}}><Payments/></li>,
                    <li key="4" style={{margin: '0 5px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2" style={{margin: '0 5px'}}><a href="/api/logout">Log out</a></li>,
                    <li key="3" style={{margin: '0 10px'}}>{this.props.auth.name}</li>,                    
            ];
        }
    }

    render(){
        console.log(this.props);
        return (
            <nav>
            <div className="nav-wrapper">
                <Link to={this.props.auth? '/surveys' : '/'} className="left brand-logo">Emaily</Link>
                <ul id="nav-mobile" className="right ">
                    { this.renderContent() }
                </ul>
            </div>
            </nav> );
              
    }
}

function mapStateToProps({auth})
{
    return { auth };
}

export default connect(mapStateToProps)(Header);