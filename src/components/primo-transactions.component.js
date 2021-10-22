import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";

const primo_transactions = [
    {
        recon_id:1,
        reconcile_status: "success",
        quantity: 20,
        execution_date: "210719",
        reut: "SG2F48989824",
        buy_sell: "B",
        account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        counter_party: "Q7SGX",
        settlement_date:"20210722",
        status:"A",
        trade_id:"106",
        settlement_price:0.265,
        principle:26.5,
        price_currency:"SGD"

    },
    {
        recon_id:1,
        reconcile_status: "success",
        quantity: 20,
        execution_date: "210719",
        reut: "SG2F48989824",
        buy_sell: "B",
        account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        counter_party: "Q7SGX",
        settlement_date:"20210722",
        status:"A",
        trade_id:"106",
        settlement_price:0.265,
        principle:26.5,
        price_currency:"SGD"

    },
    {
      recon_id:1,
      reconcile_status: "success",
      quantity: 20,
      execution_date: "210719",
      reut: "SG2F48989824",
      buy_sell: "B",
      account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      counter_party: "Q7SGX",
      settlement_date:"20210722",
      status:"A",
      trade_id:"106",
      settlement_price:0.265,
      principle:26.5,
      price_currency:"SGD"

  },
  {
    recon_id:1,
    reconcile_status: "success",
    quantity: 20,
    execution_date: "210719",
    reut: "SG2F48989824",
    buy_sell: "B",
    account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
    counter_party: "Q7SGX",
    settlement_date:"20210722",
    status:"A",
    trade_id:"106",
    settlement_price:0.265,
    principle:26.5,
    price_currency:"SGD"

},
{
    recon_id:1,
    reconcile_status: "success",
    quantity: 20,
    execution_date: "210719",
    reut: "SG2F48989824",
    buy_sell: "B",
    account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
    counter_party: "Q7SGX",
    settlement_date:"20210722",
    status:"A",
    trade_id:"106",
    settlement_price:0.265,
    principle:26.5,
    price_currency:"SGD"

},
{
  recon_id:2,
  reconcile_status: "fail",
  quantity: 60,
  execution_date: "210719",
  reut: "SG2F48989824",
  buy_sell: "B",
  account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
  counter_party: "Q7SGX",
  settlement_date:"20210722",
  status:"A",
  trade_id:"106",
  settlement_price:0.265,
  principle:26.5,
  price_currency:"SGD"

},
{
  recon_id:3,
  reconcile_status: "success",
  quantity: 100,
  execution_date: "210719",
  reut: "SG2F48989824",
  buy_sell: "B",
  account:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
  counter_party: "Q7SGX",
  settlement_date:"20210722",
  status:"A",
  trade_id:"106",
  settlement_price:0.265,
  principle:26.5,
  price_currency:"SGD"

}
]


export default class PrimoTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);

    this.state = {
      transactions: [],
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

  retrieveTransactions() {
    //this.setState({transactions: primo_transactions});
    TransactionDataService.getAllPrimo()
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
    const { searchTitle, transactions } = this.state;

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
        <h1>PRIMO Transactions</h1>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">ID</th>
                <th class="col">Status</th>
                <th class="col">Recon ID</th>
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">REUT</th>
                <th class="col">Buy / Sell</th>
                <th class="col">Account</th>
                <th class="col">Counter Party</th>
                <th class="col">Settlement Date</th>
                <th class="col">Status</th>
                <th class="col">Trade_ID</th>
                <th class="col">Settlement Price</th>
                <th class="col">Principal</th>
                <th class="col">Price Currency</th>
                </tr>
            </thead>
            <tbody>
                {transactions && 
                    transactions.map((transaction) => (
                        <tr class="transaction-row ">
                          <td class="col">{transaction.Record.ID}</td>
                            <div>
                            {transaction.Record.Status == 'pending' ? <button type="button" class="btn btn-warning btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            {transaction.Record.Status == 'fail' ?  <button type="button" class="btn btn-danger btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            {transaction.Record.Status == 'success' ? <button type="button" class="btn btn-success btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            </div>
                            <td class="col">
                              <Link to={"/transaction/" + transaction.Record.Block_ID} className="link">
                              {transaction.Record.Block_ID}
                              </Link>
                            </td>
                            <td class="col">{transaction.Record.Quantity}</td>
                            <td class="col">{transaction.Record.Execution_date}</td>
                            <td class="col">{transaction.Record.ISIN}</td>
                            <td class="col">{transaction.Record.RT}</td>
                            <td class="col">{transaction.Record.CLINO.substring(0,8) + "..."}</td>
                            <td class="col">{transaction.Record.Counterparty}</td>
                            <td class="col">{transaction.Record.Settlement_Date}</td>
                            <td class="col">{transaction.Record.Alpha_status}</td>
                            <td class="col">{transaction.Record.Trade_ID}</td>
                            <td class="col">{transaction.Record.Settlement_price}</td>
                            <td class="col">{transaction.Record.Principal}</td>
                            <td class="col">{transaction.Record.Pricing_Currency}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}