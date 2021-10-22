import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";

const reconcile_transactions = [
    {
        recon_id:1,
        reconcile_status: "success",
        quantity: 100,
        trade_date: "210719",
        isin: "SG2F48989824",
        buy_sell: "B",
        account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        counter_party: "Q7SGX",
        settlement_date:"20210722",
        status:"A",
        trade_id:"106",
        price:0.265,
        net_amount:26.5,
        price_currency:"SGD"

    },
    {
      recon_id:2,
        reconcile_status: "fail",
        quantity: 60,
        trade_date: "210719",
        isin: "SG2F48989824",
        buy_sell: "B",
        account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        counter_party: "Q7SGX",
        settlement_date:"20210722",
        status:"A",
        trade_id:"106",
        price:0.265,
        net_amount:26.5,
        price_currency:"SGD"

    },
    {
      recon_id:3,
        reconcile_status: "fail",
        quantity: 80,
        trade_date: "210719",
        isin: "SG2F48989824",
        buy_sell: "B",
        account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        counter_party: "Q7SGX",
        settlement_date:"20210722",
        status:"A",
        trade_id:"106",
        price:0.265,
        net_amount:26.5,
        price_currency:"SGD"

    },
    {
      recon_id:4,
      reconcile_status: "success",
      quantity: 100,
      trade_date: "210719",
      isin: "SG2F48989824",
      buy_sell: "B",
      account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      counter_party: "Q7SGX",
      settlement_date:"20210722",
      status:"A",
      trade_id:"106",
      price:0.265,
      net_amount:26.5,
      price_currency:"SGD"

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
                </tr>
            </thead>
            <tbody>
                {transactions && 
                    transactions.map((transaction) => (
                        <tr class="transaction-row ">
                            {/* {transactionArr = transaction.Record.Recon_ID.split("_")} */}
                            <th scope="row"><button type="button" class="btn btn-success btn-sm" id="status">Success</button></th>
                            {/* <div>
                            {transaction.reconcile_status == 'fail' ? null : <button type="button" class="btn btn-success btn-sm" id="status">{transaction.reconcile_status}</button>}
                            {transaction.reconcile_status == 'success' ? null : <button type="button" class="btn btn-danger btn-sm" id="status">{transaction.reconcile_status}</button>}
                            </div>  */}
                            <td class="col">
                              <Link to={"/transaction/" + transaction.Record.Block_ID} className="link">
                              {transaction.Record.Block_ID}
                              </Link>
                            </td>
                            <td class="col">{transaction.Record.Recon_ID.split("_")[1]}</td>
                            {/* <td class="col">{transaction.Record.Recon_ID.split("_")[2].substring(0,8) + "..."}</td> */}
                            <td class="col">{transaction.Record.Recon_ID.split("_")[2]}</td>
                            <td class="col">{transaction.Record.Recon_ID.split("_")[0]}</td>
                            <td class="col">{transaction.Record.Recon_ID.split("_")[3]}</td>
                            <td class="col">{transaction.Record.Quantity}</td>
                            <td class="col">{transaction.Record.Recon_ID.split("_")[4]}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}