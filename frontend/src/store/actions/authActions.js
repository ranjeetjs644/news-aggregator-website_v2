import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';

export const loginUser = (credentials) => async (dispatch) => {

    try {
        dispatch(loginStart());
        const response = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log('Login Response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // store in local storage

        const user = data.data?.user || data.user || data
        localStorage.setItem("user", JSON.stringify(user));


        // const userData = data.data?.user || data.user || data;
        // console.log('User Data:', userData);

        // Set accessToken and refreshToken as cookies
        if (data.data?.accessToken && data.data?.refreshToken) {
            document.cookie = `accessToken=${data.data.accessToken}; path=/; SameSite=Strict; Secure`;
            document.cookie = `refreshToken=${data.data.refreshToken}; path=/; SameSite=Strict; Secure`;
        }

        dispatch(loginSuccess(user))
    } catch (error) {
        console.error('Login Error:', error);
        dispatch(loginFailure(error.message));
    }
}; 