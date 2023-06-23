import { addUser, clearUser } from "@redux/reducers/user/user.reducer";
import { addNotification, clearNotification } from "@redux/reducers/notifications/notifications.reducer";

export class Utils {
  static dispatchUser(result, pageReload, dispatch, setUser) {
    pageReload(true);
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));
    setUser(result.data.user);
  }

  static clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn }) {
    dispatch(clearUser());
    dispatch(clearNotification());
    deleteStorageUsername();
    deleteSessionPageReload();
    setLoggedIn(false);
  }

  static dispatchNotification(message, type, dispatch) {
    dispatch(addNotification({ message, type }));
  }

  static dispatchClearNotification(dispatch) {
    dispatch(clearNotification());
  }

  static appEnvironment() {
    const env = process.env.REACT_APP_ENVIRONMENT;
    if (env === "development") {
      return "DEV";
    } else if (env === "staging") {
      return "STG";
    }
  }

  static appImageUrl(version, id) {
    if (typeof version === "string" && typeof id === "string") {
      version = version.replace(/['"]+/g, "");
      id = id.replace(/['"]+/g, "");
    }
    return `https://res.cloudinary.com/dandawid/image/upload/v${version}/${id}`;
  }

  static generateString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static checkIfUserIsOnline(username, onlineUsers) {
    return onlineUsers.some((user) => user === username?.toLowerCase());
  }

  static firstLetterUpperCase(word) {
    if (!word) return "";
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }

  static getImage(imageId, imageVersion) {
    return imageId && imageVersion ? this.appImageUrl(imageVersion, imageId) : "";
  }
}
