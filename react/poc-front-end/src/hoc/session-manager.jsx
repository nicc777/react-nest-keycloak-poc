import React from 'react';

function sessionManager(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleSetAny = this.handleSetAny.bind(this);
            this.handleRequestAny = this.handleRequestAny.bind(this);
            this.handleRemoveAny = this.handleRemoveAny.bind(this);
            this.handleLocalSetAny = this.handleLocalSetAny.bind(this);
            this.handleLocalRequestAny = this.handleLocalRequestAny.bind(this);
            this.handleLocalRemoveAny = this.handleLocalRemoveAny.bind(this);
        }

        componentDidMount() { }

        componentWillUnmount() { }

        handleSetAny(sessionKey, sessionValue, callback) {
            if ( sessionKey != null ){
                try {
                    sessionStorage.setItem(sessionKey, sessionValue);
                    if (callback != null){
                        callback();
                    }
                } catch (e) {
                    console.log('Exception: cannot save data');
                }
            }
        }

        handleRequestAny(key) {
            try {
                return sessionStorage.getItem(key);
            } catch (e) {
                this.setState({ sessionStorageAvailable: false });
                console.log('sessionStorage NOT available!!')
            }
            return null;
        }

        handleRemoveAny(key, callback) {
            try {
                sessionStorage.removeItem(key);
                if (callback != null){
                    callback();
                }
            } catch (e) {
                console.log('Exception: cannot remove data');
            }
        }

        handleLocalSetAny(sessionKey, sessionValue, callback) {
            if ( sessionKey != null ){
                try {
                    localStorage.setItem(sessionKey, sessionValue);
                    if (callback != null){
                        callback();
                    }
                } catch (e) {
                    console.log('Exception: cannot save data');
                }
            }
        }

        handleLocalRequestAny(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {
                this.setState({ localStorageAvailable: false });
                console.log('localStorage NOT available!!')
            }
            return null;
        }

        handleLocalRemoveAny(key, callback) {
            try {
                localStorage.removeItem(key);
                if (callback != null){
                    callback();
                }
            } catch (e) {
                console.log('Exception: cannot remove data');
            }
        }

        render() {
            return <WrappedComponent 
                sessionRemove={this.handleRemoveAny} 
                sessionGet={this.handleRequestAny} 
                sessionSet={this.handleSetAny} 
                localSet={this.handleLocalSetAny} 
                localGet={this.handleLocalRequestAny} 
                localRemove={this.handleLocalRemoveAny} 
                {...this.props} />;
        }
    };
}

export default sessionManager;
