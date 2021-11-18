import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";
import axios from 'axios';
 
const dummy_data = [
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
  },
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
  },
  {}
]



export default class SgxTransactions extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.retrieveRecords = this.retrieveRecords.bind(this);

    this.state = {
      transactions: [],
      transaction: [dummy_data[0]],
      test_arr: ["testing"],
      testing: "",
      stop_retreving : false,
    };
  }

  addDate() {
    dummy_data.map((transaction) =>
      transaction.SgxStructIndex ? this.setState(previousState => ({
        transactions: [...previousState.transactions, transaction]})) : null )
    
  }

  componentDidMount() {
    // this.retrieveRecords(5);
    // this.addDate();
    this.createRecordArr()
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  createRecordArr() {
    for (var i = 0; i < 2; i++) {
      if (this.stop_retreving){
        console.log("stop");
        break;
      }
      else{
        this.retrieveRecords(i);
        console.log("show existing rows",i);
        console.log(this.state.stop_retreving)
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
        url: 'http://localhost:3000/getSGXRow',
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

          

        // console.log("show output");
        // console.log(test_arr); 
        // // this.setState(previousState => ({
        // //   test_arr: [...previousState.test_arr, "testing2"]}))
        // this.setState(state => ({...state, test_arr: [state.test_arr,"Testing2"]}));
        
        // console.log("add to dict");
        // console.log(test_arr); 
         

        // if (response_stop_status){ 
        //   this.setState({stop_retreving : true})};
  // }


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
                {/* <th class="col">Status</th> */}
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">ISIN</th>
                <th class="col">RT</th>
                <th class="col">ClINO</th>
                <th class="col">Settlement Price</th>
                {/* <th class="col">Corresponding PrimoID</th> */}
                </tr>
            </thead>
            <tbody>
            {transactions && 
                    transactions.map((transaction) => (
                        <tr class="transaction-row ">  
                            <td class="col">
                              <Link to={"/transaction/" + transaction.SgxStructIndex} className="link">
                              {transaction.SgxStructIndex}
                              </Link>
                            </td>
                            {/* <td class="col">{transaction.SgxStructIndex}</td> */}

                            {/* <td><div>
                            {transaction.reconciled === true ? <button type="button" class="btn btn-success btn-sm" id="status">Success</button> : null}
                            {transaction.reconciled === false ? <button type="button" class="btn btn-danger btn-sm" id="status">Fail</button> : null}
                            </div></td> */}
                                
                            <td class="col">{transaction.SgxQuantity}</td>
                            <td class="col">{transaction.SgxISIN}</td>
                            <td class="col">{transaction.SgxExecutionDate}</td>

                            {transaction.SgxRT === "B" ? null :<td class="col">Buy</td>}
                            {transaction.SgxRT === "S" ? null :<td class="col">Sell</td>}
                            
                            <td class="col">{transaction.SgxCLINO.substring(0,8) + "..."}</td>
                            <td class="col">{transaction.SgxSettlementPrice}</td>
                            
                            
                            {/* <td class="col">{transaction.PrimoIds.substring(1)}</td> */}
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}
