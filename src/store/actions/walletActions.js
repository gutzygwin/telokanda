export const newStake = (stake) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make a sync call to database
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        firestore.collection('stake').add({
            stake: stake,
            userId: userId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_STAKE', stake });
        }).catch((err) => {
            dispatch({ type: 'ERROR', err });
        })
        
    }
};

export const unstake = (stake) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make a sync call to database
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        firestore.collection('stake').add({
            stake: stake,
            userId: userId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'ADD_STAKE', stake });
        }).catch((err) => {
            dispatch({ type: 'ERROR', err });
        })
        
    }
};