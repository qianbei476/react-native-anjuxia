import { handleActions } from 'redux-actions';

import _find from 'lodash/find';

export var bbs = handleActions({
  bbsPageResult: (state, action) => ({...state, list:action.payload.list}),
  bbsAddReplyResult: (state, action) => {
    if(action.error) return state;

    let list = [...state.list];
    let o = _find(list, {id:action.meta.id});
    if(o){
      o.replyList = [{createName:'我',content:action.meta.content},...(o.replyList||[])]
    }
    return {...state, list};
  },
}, {list:[]});


export var adviceList = handleActions({
  adviceListRequest: (state, action) => ({...state, refreshing:true}),
  adviceListResult: (state, action) => ({...state, list:action.error?state.list:action.payload, refreshing:false})
}, {list:[],refreshing:false});
