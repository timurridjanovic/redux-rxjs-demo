
//redux
function createStore (rootReducer) {
  const store = {}
  let callback = () => {}
  const actions = []
  let currentAction = actions.length - 1
  const replay = () => {
    const newActions = actions.slice(0, currentAction + 1)
    store.store = newActions.reduce((state, action) => {
      return rootReducer(state, action)
    }, {})
  }
  store.store = {}
  store.dispatch = action => {
    actions.push(action)
    currentAction = Math.min(currentAction + 1, actions.length - 1)
    store.store = rootReducer(store.store, action)
    callback()
  }

  store.subscribe = func => {
    callback = func
  }

  store.getState = () => {
    return store.store
  }

  store.undo = () => {
    currentAction = Math.max(currentAction - 1, -1)
    replay()
    callback()
  }

  store.redo = () => {
    currentAction = Math.min(currentAction + 1, actions.length - 1)
    replay()
    callback()
  }

  return store
}

function combineReducers(reducers) {
  return (state = {}, action = {}) => {
    return Object.keys(reducers).reduce((state, key) => {
      state[key] = reducers[key](state[key], action)
      return state
    }, state)
  }
}

//actions
const ADD_VIDEO = 'ADD_VIDEO'
const ADD_IMAGE = 'ADD_IMAGE'

//reducers
function videos(state = [], action) {
  switch (action.type) {
    case ADD_VIDEO:
      return state.concat(action.video)
    default:
      return state
  }
}

function mediaCount (state = 0, action) {
  switch (action.type) {
    case ADD_VIDEO:
    case ADD_IMAGE:
      return state + 1
    default:
      return state
  }
}

//setup
const rootReducer = combineReducers({
  videos,
  mediaCount
})

const store = createStore(rootReducer)

store.subscribe(function() {
  console.log(store.getState())
})

store.dispatch({
  type: ADD_VIDEO,
  video: {
    name: 'video1',
    url: 'http://www.videos.com/video1'
  }
})

store.dispatch({
  type: ADD_VIDEO,
  video: {
    name: 'video1',
    url: 'http://www.videos.com/video1'
  }
})

store.dispatch({
  type: ADD_IMAGE,
  video: {
    name: 'image1',
    url: 'http://www.images.com/image1'
  }
})


store.undo()

store.redo()
