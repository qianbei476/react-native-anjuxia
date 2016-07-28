import { handleActions } from 'redux-actions';

export var loginStatus = handleActions({
  loginRequest: (state, action) => ({msg:'登陆中...', isError: false, isFetching: true}),
  loginResult: (state, action) => ({msg:action.error?action.payload.msg:'登录成功', isError:action.error, isFetching:false})
},{
});

export var loginForm = handleActions({
  loginRequest: (state, action) => ({...state, newAccount:{...action.payload}}),
  loginResult: (state, action) => (action.error? state: state.newAccount)
}, {
});

export var loginUser = handleActions({
  loginResult: (state, action) => (action.error? state: { token: action.payload.token, ...action.payload.user}),
  codeLoginResult: (state, action) => (action.error? state: { token: action.payload.token, ...action.payload.user}),
  LOGOUT_RESULT: (state, action) => ({}),
  userUpdateResult: (state, action) => (action.error ? state: {...state, ...action.payload}),
  bindEmailResult: (state, action) => (action.error ? state: {...state, email:action.meta.email}),
  unbindEmailResult: (state, action) => (action.error ? state: {...state, email:''}),
  bindMobileResult: (state, action) => (action.error ? state: {...state, mobile:action.meta.mobile}),
  unbindMobileResult: (state, action) => (action.error ? state: {...state, mobile:''}),
  updateCodeResult: (state, action) => (action.error ? state: {...state, ...action.meta})
},{});
