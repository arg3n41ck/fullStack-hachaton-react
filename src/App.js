import React from "react";
import Routes from "./Routes";
import StoreContextProvider from "./contexts/StoreContext";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import CommentContextProvider from "./contexts/CommentContext";

toast.configure();

const defaultConfirmOptions = {
  title: "Вы уверены?",
  confirmationText: "Да",
  cancellationText: "Отмена",
};

function App() {
  return (
    <ConfirmProvider defaultOptions={defaultConfirmOptions}>
      <StoreContextProvider>
        <CommentContextProvider>
          <Routes />
        </CommentContextProvider>
      </StoreContextProvider>
    </ConfirmProvider>
  );
}

export default App;
