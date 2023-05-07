import { addUser, clearUser } from "@redux/reducers/user/user.reducer";

export class Utils {
  static dispatchUser(result, pageReload, dispatch, setUser) {
    pageReload(true);
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));
    setUser(result.data.user);
  }

  static clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn }) {
    dispatch(clearUser());
    deleteStorageUsername();
    deleteSessionPageReload();
    setLoggedIn(false);
  }
}
