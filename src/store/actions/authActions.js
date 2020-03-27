export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        });
    }
}



export const userProfile = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            if (user) {
                dispatch({type:'USER_EMAIL',payload:user})
                
            } else {
                dispatch({type:'USER_EMAIL_ERROR'})
              
            }
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).then(dataBeforeEmail => {
            firebase.auth().onAuthStateChanged(function(user) {
              user.sendEmailVerification();
            });
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const emailVerification = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().onAuthStateChanged(function(user) {
            user.sendEmailVerification();
            dispatch({ type: 'VERIFY_SUCCESS' });
        }, err => {
            dispatch({ type: 'VERIFY_ERROR', err });
        })
    }
}