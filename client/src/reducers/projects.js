import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, projects: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        projects: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, projects: action.payload.data };
    case FETCH_POST:
      return { ...state, project: action.payload.project };
    case LIKE:
      return { ...state, projects: state.projects.map((project) => (project._id === action.payload._id ? action.payload : project)) };
    case COMMENT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project._id == +action.payload._id) {
            return action.payload;
          }
          return project;
        }),
      };
    case CREATE:
      return { ...state, projects: [...state.projects, action.payload] };
    case UPDATE:
      return { ...state, projects: state.projects.map((project) => (project._id === action.payload._id ? action.payload : project)) };
    case DELETE:
      return { ...state, projects: state.projects.filter((project) => project._id !== action.payload) };
    default:
      return state;
  }
};

