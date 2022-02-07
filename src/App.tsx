import React, { useEffect } from "react";
import "./styles/reset.scss";
import "./styles/app.scss";
import { Route, useHistory } from "react-router-dom";
import { routes } from "./services/routes";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      {routes.map((e) => (
        <Route path={e.path} key={e.path} component={e.component} />
      ))}
    </div>
  );
}

export default App;
