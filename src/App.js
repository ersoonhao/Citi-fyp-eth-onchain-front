import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ReconcileTransactions from "./components/reconcile-transactions.component";
import PrimoTransactions from "./components/primo-transactions.component";
import SgxTransactions from "./components/sgx-transactions.component";
import Transaction from "./components/transaction.component";
import Upload from "./components/upload.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            HYPERGETH
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/primo"} className="nav-link">
                PRIMO
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/sgx"} className="nav-link">
                SGX
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/reconciliation"} className="nav-link">
                ETH RECONCILIATION
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={ReconcileTransactions} />
            <Route exact path="/primo" component={PrimoTransactions} />
            <Route exact path="/sgx" component={SgxTransactions} />
            <Route exact path="/reconciliation" component={Upload} />
            <Route path="/transaction/:id" component={Transaction} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;