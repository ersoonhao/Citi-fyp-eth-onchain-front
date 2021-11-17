import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";

const reconcile_transactions = [
    {
      0: "0",
      1: "100",
      2: "190721",
      3: "G2F48989824",
      4: "B",
      5: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      6: "200",
      7: true,
      8: ",,",
      SgxStructIndex: "0",
      SgxQuantity: "100",
      SgxExecutionDate: "190721",
      SgxISIN: "G2F48989824",
      SgxRT: "B",
      SgxCLINO: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      SgxSettlementPrice: "200",
      reconciled: true,
      PrimoIds: ",1M001T3KH0,2M001B0OLJ"
    }
]


export default class ReconcileTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);
    this.onUpdateTransactionArray = this.onUpdateTransactionArray.bind(this);

    this.state = {
      transactions: [],
      transactionArray: []
    };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  onUpdateTransactionArray(array) {
    this.setState({
      transactionArray: array
    });
  }

  retrieveTransactions() {
    //this.setState({transactions: reconcile_transactions});
    TransactionDataService.getAllReconcile()
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  searchTitle() {
    TransactionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, transactions, transactionArray } = this.state;
    let transactionArr;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <h1>Reconciled Transactions</h1>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">Status</th>
                <th class="col">Recon ID</th>
                <th class="col">buy / Sell</th>
                <th class="col">Client ID</th>
                <th class="col">ISIN</th>
                <th class="col">Price</th>
                <th class="col">Cumulative Quanty</th>
                <th class="col">Reconcile Date</th>
                <th class="col">Primo IDs</th>
                </tr>
            </thead>
            <tbody>
                {reconcile_transactions && 
                    reconcile_transactions.map((transaction) => (
                        <tr class="transaction-row ">
                            {/* {transactionArr = transaction.Record.Recon_ID.split("_")} */}
                            {/* <th scope="row"><button type="button" class="btn btn-success btn-sm" id="status">Success</button></th> */}
                            <td><div>
                            {transaction.reconciled == true ? <button type="button" class="btn btn-success btn-sm" id="status">Successful</button> : null}
                            {transaction.reconciled == false ? <button type="button" class="btn btn-danger btn-sm" id="status">Fail</button> : null}
                            </div></td>
                            {/* <td class="col">
                              <Link to={"/transaction/" + transaction.Record.Block_ID} className="link">
                              {transaction.Record.Block_ID}
                              </Link>
                            </td> */}
                            <td class="col">{transaction.SgxStructIndex}</td>
                            
                            {transaction.SgxRT == "B" ? null :<td class="col">Buy</td>}
                            {transaction.SgxRT == "S" ? null :<td class="col">Sell</td>}
                            
                            <td class="col">{transaction.SgxCLINO.substring(0,8) + "..."}</td>
                            {/* <td class="col">{transaction.Record.Recon_ID.split("_")[2].substring(0,8) + "..."}</td> */}
                            <td class="col">{transaction.SgxISIN}</td>
                            <td class="col">{transaction.SgxSettlementPrice}</td>
                            <td class="col">{transaction.SgxQuantity}</td>
                            <td class="col">{transaction.SgxExecutionDate}</td>
                            <td class="col">{transaction.PrimoIds.substring(1)}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}