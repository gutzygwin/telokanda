const initState = {
    adverts: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah', url: ''},
        {id: '2', title: 'collect all the stars', content: 'blah blah blah', url: ''},
        {id: '1', title: 'egg hunt with yoshi', content: 'blah blah blah', url: ''},
    ]
}

const advertReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_ADVERT':
            return state;
        case 'CREATE_ADVERT_ERROR':
            return state;
        default:
            return state;
    }
}

export default advertReducer