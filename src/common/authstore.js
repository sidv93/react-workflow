import { compareAsc } from 'date-fns';

const authFunctions = {
    isAuthenticated: false,
    async authenticate(loginData) {
        if(this.isAuthenticated && this.userDetails) {
            return Promise.resolve({status: 'success', ...this.userDetails});
        }
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
                this.userDetails= response.data;
                localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
                return Promise.resolve(response);
            }
            return Promise.reject(new Error('Wrong credentails'));
        } catch(e) {
            console.log('login error', e);
            return Promise.reject(e);
        }
    },
    checkExistingLogins() {
        const userDetails = this.fetchLocalStorageData();
        if(!userDetails) return;
        if(compareAsc(new Date(userDetails.validTill), new Date())) {
            this.userDetails = userDetails;
            this.isAuthenticated = true;
        }
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    },
    userDetails: {username: '', authToken: '', validTill: ''},
    fetchLocalStorageData() {
        return JSON.parse(localStorage.getItem('userDetails'));
    }
}

export default authFunctions;

