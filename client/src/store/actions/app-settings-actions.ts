export const SET_APP_IS_LOADING = "SET_APP_IS_LOADING";

export const setAppIsLoading = (payload: boolean) => ({
  type: SET_APP_IS_LOADING,
  payload,
});
