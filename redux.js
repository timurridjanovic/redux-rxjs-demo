const { createStore, combineReducers } = require('redux')

const ADD_VIDEO = 'ADD_VIDEO'
const ADD_IMAGE = 'ADD_IMAGE'
const DELETE_VIDEO = 'DELETE_VIDEO'

const initialState = []

function videos (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return state.concat(action.video)
    case DELETE_VIDEO:
      return state.filter(video => video.name !== action.video.name)
    default:
      return state
  }
}

function media (state = [], action) {
  switch (action.type) {
    case ADD_VIDEO:
      return state.concat(action.video)
    case ADD_IMAGE:
      return state.concat(action.image)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  videos,
  media
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
  type: ADD_IMAGE,
  image: {
    name: 'image1',
    url: 'http://www.images.com/image1'
  }
})
// store.dispatch({
//   type: ADD_VIDEO,
//   video: {
//     name: 'video2',
//     url: 'http://www.videos.com/video2'
//   }
// })
// store.dispatch({
//   type: DELETE_VIDEO,
//   video: {
//     name: 'video1'
//   }
// })

