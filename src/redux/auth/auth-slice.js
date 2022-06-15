import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { signIn, signUp, logOut } from './auth-operation';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  //реєстрація нового юзера
  extraReducers: {
    [signUp.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [signUp.fulfilled]: (store, { payload }) => ({
      ...store,
      loading: false,
      ...payload,
    }),
    [signUp.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),

    //логін юзера
    [signIn.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [signIn.fulfilled]: (store, { payload }) => {
      const { accessToken, userData } = payload;
      return {
        ...store,
        loading: false,
        isLogin: true,
        accessToken,
        userData,
      };
    },
    [signIn.rejected]: (store, { payload }) => ({
      ...store,
      loading: false,
      error: payload,
    }),
    [logOut.pending]: (store, _) => ({ ...store, loading: true, error: null }),
    [logOut.fulfilled]: () => ({ ...initialState, loading: false }),
    [logOut.rejected]: () => ({ ...initialState, loading: false }),
  },
});
export default authSlice.reducer;
