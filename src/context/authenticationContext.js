import React from 'react';

const authenticationContext = React.createContext(window.localStorage.getItem('token'));

export default authenticationContext;
