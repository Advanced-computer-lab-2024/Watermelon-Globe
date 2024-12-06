import { createContext, useReducer } from "react";
export const AdminContext = createContext();
export const adminReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADMIN":
      return {
        admin: action.payload,
      };
    case "CREATE_ADMIN":
      return {
        admin: [action.payload, ...state.admin],
      };
    case "DELETE_ADMIN":
      return {
        admin: state.admin.filter((a) => a._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    admin: null,
  });

  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};
