export const createAdvert = (advert) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make a sync call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('adverts').add({
            ...advert,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_ADVERT', advert });
        }).catch((err) => {
            dispatch({ type: 'CREATE_ADVERT_ERROR', err });
        })
        
    }
};