const initState = {
    authError: null,
    verifyEmail: {
        verifyError: null
    },
    email:null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login failed'
            }
        case 'LOGIN_SUCCESS':
            console.log('login success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout_success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message
            }
        case 'VERIFY_SUCCESS':
            console.log('verify success')
            return {
                ...state, verifyEmail: { ...state.verifyEmail, verifyError: null },
            }
        case 'VERIFY_ERROR':
            console.log('verify error')
            return {
                ...state, verifyEmail: { ...state.verifyEmail, verifyError: action.err.message },
            }
        case 'USER_EMAIL':
            return{
                ...state, email: action.payload.email
            }
        
        default:
            return state;
    }
}

export default authReducer