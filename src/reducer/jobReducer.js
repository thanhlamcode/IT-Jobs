const initialState = {
  //   city: null,
  //   language: [],
  //   company: {
  //     id: null,
  //     city: [],
  //     company: {},
  //     createAt: "",
  //     description: "",
  //     // các thuộc tính khác của job
  //   },
};

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOB":
      return {
        ...state,
        dataJob: action.dataJob,
      };

    default:
      break;
  }
  return state;
};
