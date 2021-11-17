import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";
import axios from 'axios';

var returnData=[];  


const sgx_transactions = [
    {
        recon_id:1,
        reconcile_status: "success",
        quantity: 100,
        execution_date: "210719",
        isin: "SG2F48989824",
        rt: "B",
        clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        settlement_price:0.265,
    },
    {
      recon_id:3,
        reconcile_status: "fail",
        quantity: 80,
        execution_date: "210719",
        isin: "SG2F48989824",
        rt: "B",
        clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
        settlement_price:0.265,
    },
    {
      recon_id:4,
      reconcile_status: "success",
      quantity: 100,
      execution_date: "210719",
      isin: "SG2F48989824",
      rt: "B",
      clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      settlement_price:0.265,
  }
]


export default class SgxTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      transactions: [],
      transaction: {}
    };
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveRecords() {

    //sol 
    // this.setState({transactions: sgx_transactions});

    //AXIOS 
    var data={
        index: 0
    };
    axios({
        method: 'post',
        url: 'http://localhost:3000/getresults',
        headers: {}, 
        data: data
        }).then(function (response) {
          console.log(response.data)
          this.setState({
            transaction:response.data
          });  


        });
          


    // TransactionDataService.getAllSgx()
    //   .then(response => {
    //     this.setState({
    //       transactions: response.data
    //     });
   
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });



    // eol 
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
    const { searchTitle, transactions, transaction} = this.state;

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
        <h1>SGX Transactions</h1>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">ID</th>
                <th class="col">Status</th>
 
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">ISIN</th>
                <th class="col">RT</th>
                <th class="col">ClINO</th>
                <th class="col">Settlement Price</th>
                <th class="col">Corresponding PrimoID</th>
                </tr>
            </thead>
            <tbody>
                
                      <tr class="transaction-row ">
                       
                      transaction                            <div>
                           
                            {this.transaction.reconciled == 'false' ?  <button type="button" class="btn btn-danger btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            {this.transaction.reconciled == 'true' ? <button type="button" class="btn btn-success btn-sm" id="status">{transaction.Record.Status}</button> : null}
                            </div>
                            <td class="col">{this.transaction.SgxStructIndex}</td>
                            <td class="col">{this.transaction.reconciled}</td>
                            <td class="col">{this.transaction.SgxQuantity}</td>
                            <td class="col">{this.transaction.SgxExecutionDate}</td>
                            <td class="col">{this.transaction.SgxISIN}</td>
                            <td class="col">{this.transaction.SgxRT}</td>
                            <td class="col">{this.transaction.SgxCLINO.substring(0,8) + "..."}</td>
                            <td class="col">{this.transaction.SgxSettlementPrice}</td>
                            <td class="col">{this.transaction.PrimoIds}</td>
                        </tr> 
                    
            </tbody>
        </table>
      </div>
    );
  }
}
