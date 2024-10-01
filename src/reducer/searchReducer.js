const initialState = {
  city: null,
  language: [],
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_SEARCH":
      return {
        ...state,
        ...action.inputData,
      };
    case "TAG_SEARCH":
      return {
        ...state,
        city: null,
        language: [action.language],
      };
    default:
      return state;
  }
};
