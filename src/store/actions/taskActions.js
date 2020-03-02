export const createTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make a sync call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('tasks').add({
            ...task,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_TASK', task });
        }).catch((err) => {
            dispatch({ type: 'CREATE_TASK_ERROR', err });
        })
        
    }
};