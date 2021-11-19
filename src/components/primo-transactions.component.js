import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";
import axios from 'axios';

const dummy_data = [
  {
      0: "0",
      1: "50",
      2: "210719",
      3: "G2F48989824",
      4: "B",
      5: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      6: "100",
      7: "200",
      8: "1M001T3KH0",
      PrimoStructIndex: "0",
      PrimoQuantity: "50",
      PrimoExecutionDate: "210719",
      PrimoREUT: "G2F48989824",
      PrimoBuySell: "B",
      PrimoAccount: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      PrimoSettlementPrice: "100",
      PrimoPrinciple: "200",
      PrimoTradeId: "1M001T3KH0"
  },
  {
    0: "0",
    1: "50",
    2: "210719",
    3: "G2F48989824",
    4: "B",
    5: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
    6: "100",
    7: "200",
    8: "1M001T3KH0",
    PrimoStructIndex: "0",
    PrimoQuantity: "50",
    PrimoExecutionDate: "210719",
    PrimoREUT: "G2F48989824",
    PrimoBuySell: "B",
    PrimoAccount: "765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
    PrimoSettlementPrice: "100",
    PrimoPrinciple: "200",
    PrimoTradeId: "1M001T3KH0"
},
  {}
]

export default class PrimoTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);
    this.createRecordArr = this.createRecordArr.bind(this);

    this.state = {
      transactions: [],
      stop_retreving : false,
    };
  }

  addDate() {
    dummy_data.map((transaction) =>
      transaction.PrimoStructIndex ? this.setState(previousState => ({
        transactions: [...previousState.transactions, transaction]})) : null )
  }

  componentDidMount() {
    // this.retrieveTransactions();
    this.addDate();
    // this.retrieveRecords(0);
    // this.createRecordArr();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  // function SendRequests() {
  //   requestsToSend.forEach((request, index) => { 
  //     setTimeout(()=> { request.Send(); }, 500 * (index + 1))
  //   });
  // }
  
  createRecordArr() {
    for (var i = 0; i < 2; i++) {
      if (this.stop_retreving){
        console.log("stop");
        break;
      }
      else{
        console.log("show existing rows",i);
        this.retrieveRecords(i);
        console.log(this.state.stop_retreving);
      }
    } 
  }

  retrieveRecords(index) {
    //AXIOS 
    var data={
        index: index
    };
    var self = this;
    axios({
        method: 'post',
        url: 'http://localhost:3000/getPrimoRow',
        headers: {}, 
        data: data
        }).then(function (response) {
          console.log(response.data);
          var startTime = performance.now();
          self.setState(state => ({transactions: [...state.transactions, response.data]}));
          var endTime = performance.now();
          console.log(`Call one row of transaction took ${endTime - startTime} milliseconds`);
        })
        .catch(e => {
          console.log(e);
          console.log("nothing found");
          self.setState(state => ({...state, stop_retreving: !state.stop_retreving}));
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
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">REUT</th>
                <th class="col">RT</th>
                <th class="col">Account</th>
                <th class="col">Settlement Price</th>
                <th class="col">Principle</th>
                <th class="col">Trade ID</th>
                {/* <th class="col">Corresponding PrimoID</th> */}
                </tr>
            </thead>
            <tbody>
                {transactions && 
                    transactions.map((transaction) => (
                      <tr class="transaction-row ">  
                        <td class="col">
                          <Link to={"/transaction/" + transaction.PrimoStructIndex} className="link">
                          {transaction.PrimoStructIndex}
                          </Link>
                        </td>
                        {/* <td class="col">{transaction.SgxStructIndex}</td> */}

                        {/* <td><div>
                        {transaction.reconciled === true ? <button type="button" class="btn btn-success btn-sm" id="status">Success</button> : null}
                        {transaction.reconciled === false ? <button type="button" class="btn btn-danger btn-sm" id="status">Fail</button> : null}
                        </div></td> */}
                            
                        <td class="col">{transaction.PrimoQuantity}</td>
                        <td class="col">{transaction.PrimoREUT}</td>
                        <td class="col">{transaction.PrimoExecutionDate}</td>

                        {transaction.PrimoBuySell === "B" ? null :<td class="col">Buy</td>}
                        {transaction.PrimoBuySell === "S" ? null :<td class="col">Sell</td>}
                        
                        <td class="col">{transaction.PrimoAccount.substring(0,8) + "..."}</td>
                        <td class="col">{transaction.PrimoSettlementPrice}</td>
                        <td class="col">{transaction.PrimoPrinciple}</td>
                        <td class="col">{transaction.PrimoTradeId}</td>
                        
                        
                        {/* <td class="col">{transaction.PrimoIds.substring(1)}</td> */}
                    </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}