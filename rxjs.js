const Rx = require('rxjs')

const dispatcher = new Rx.Subject()

function combineReducers (reducers) {
	return (state = {}, action = {}) => {
		return Object.keys(reducers).reduce((state, key) => {
			state[key] = reducers[key](state[key], action)
			return state
		}, state)
	}
}

const ADD_VIDEO = 'ADD_VIDEO'
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

const rootReducer = combineReducers({
	videos
})

const store = dispatcher
	.startWith({})
	.scan(rootReducer)

store.subscribe((state) => {
	console.log(state)
})

dispatcher.next({ type: ADD_VIDEO, video: { name: 'video1', url: 'http://www.videos.com/video1' } })
dispatcher.next({ type: ADD_VIDEO, video: { name: 'video2', url: 'http://www.videos.com/video2' } })
dispatcher.next({ type: DELETE_VIDEO, video: { name: 'video1' } })
