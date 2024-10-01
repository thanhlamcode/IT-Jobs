export const reloadReducer = (state = false, action) => {
  switch (action.type) {
    case "RELOAD":
      return !state;
    default:
      return state;
  }
};
