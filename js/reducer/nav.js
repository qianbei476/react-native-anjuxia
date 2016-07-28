import { handleActions } from 'redux-actions';

export var nav = handleActions({
  'focus': (state, action) => ({...state, focusName:action.scene.name}),
  'jump': (state, action) => ({...state, jumpName:action.key})
},{
  focusName:'',
  jumpName:''
})
