const authFunctions = {
    isAuthenticated: false,
    async authenticate(loginData) {
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(loginData)
            });        
            const response = await res.json();
            console.log('login res', response);
            if(response.status === 'success') {
                this.isAuthenticated = true;
                this.userDetails.username = loginData.username;
                return Promise.resolve(response);
            }
            return Promise.reject(new Error('Wrong credentails'));
        } catch(e) {
            console.log('login error', e);
            return Promise.reject(e);
        }
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    },
    userDetails: {username: ''}
}

export default authFunctions;

