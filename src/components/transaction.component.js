import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";

const reconcile_transaction = {
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

}

const primo_transaction = {
  recon_id:1,
  reconcile_status: "success",
  transactions: [
  {
      primo_id:1,
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
      primo_id:2,
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
    primo_id:3,
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
    primo_id:4,
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
    primo_id:5,
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

  }]
}

const sgx_transaction = {
  recon_id:1,
  reconcile_status: "success",
  transactions:[
  {
      recon_id:1,
      reconcile_status: "success",
      quantity: 100,
      execution_date: "210719",
      isin: "SG2F48989824",
      rt: "B",
      clino:"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09",
      settlement_price:0.265,
  }]
}

export default class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        Block_ID: "",
        Recon_ID: "",
        Quantity: "",
        sgx_list: "",
        Primo_list: ""
      },
    };
  }

  componentDidMount() {
    this.getTransaction(this.props.match.params.id);
  }

  getTransaction(id) {
    // this.setState({transactions: reconcile_transaction});
    TransactionDataService.getReconcile(id)
      .then(response => {
        this.setState({
          transaction: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { transaction } = this.state;

    return (
      <div className="list row">
        <h1>Reconcile ID: {this.props.match.params.id}</h1>
        <table >
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
              <tr>
                    <th scope="row">Account (CLINO):</th>
                    <td class="col" colspan="3">{transaction.Recon_ID.split("_")[2]}</td>
                </tr> 
                <tr>
                    <th scope="row">Cumulative Quantity:</th>
                    <td class="col">{transaction.Quantity}</td>
                    <th scope="row">Reconcile Status:</th>
                    <td class="col">Successful</td>
                </tr> 
                <tr>
                    <th scope="row">ISIN (REUT):</th>
                    <td class="col">{transaction.Recon_ID.split("_")[0]}</td>
                    <th scope="row">Buy/Sell (RT):</th>
                    <td class="col">{transaction.Recon_ID.split("_")[1]}</td>
                </tr> 
                <tr>
                    <th scope="row">Execution Date:</th>
                    <td class="col">{transaction.Recon_ID.split("_")[4]}</td>
                    <th scope="row">Counter Party:</th>
                    <td class="col">{transaction.Primo_list.split(',')[0].split('_')[9]}</td>
                </tr> 
                <tr>
                    <th scope="row">Settlement Date:</th>
                    <td class="col">{transaction.Primo_list.split(',')[0].split('_')[10]}</td>
                    <th scope="row">Status:</th>
                    <td class="col"> {transaction.Primo_list.split(',')[0].split('_')[11]} </td>
                </tr> 
                <tr>
                    <th scope="row">Source System:</th>
                    <td class="col">{transaction.Primo_list.split(',')[0].split('_')[6]}</td>
                    <th scope="row">Price:</th>
                    <td class="col">{transaction.Recon_ID.split("_")[3]}</td>
                </tr> 
                <tr>
                    <th scope="row">Principal:</th>
                    <td class="col">{transaction.Primo_list.split(',')[0].split('_')[13]}</td>
                    <th scope="row">Pricing Currency:</th>
                    <td class="col">{transaction.Primo_list.split(',')[0].split('_')[12]}</td>
                </tr> 
            </tbody>
        </table>
        <h2 class="h2 text-center">PRIMO Transactions</h2>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">ID</th>
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">ISIN within REUT</th>
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
                {transaction.Primo_list.split(',') && 
                    transaction.Primo_list.split(',').map((t) => (
                        <tr class="transaction-row ">
                          <td class="col">{t.split('_')[0]}</td>
                            <td class="col">{t.split('_')[1]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[4]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[0]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[1]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[2]}</td>
                            <td class="col">{t.split(',')[0].split('_')[9]}</td>
                            <td class="col">{t.split(',')[0].split('_')[10]}</td>
                            <td class="col">{t.split(',')[0].split('_')[11]}</td>
                            <td class="col">{t.split(',')[0].split('_')[3]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[3]}</td>
                            <td class="col">{t.split(',')[0].split('_')[13]}</td>
                            <td class="col">{t.split(',')[0].split('_')[12]}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
        <h2 class="h2 text-center">SGX Transactions</h2>
        <table class="table table text-center table-image">
            <thead>
                <tr>
                <th class="col">ID</th>
                <th class="col">Quantity</th>
                <th class="col">Execution Date</th>
                <th class="col">ISIN</th>
                <th class="col">RT</th>
                <th class="col">ClINO</th>
                <th class="col">Settlement Price</th>
                </tr>
            </thead>
            <tbody>
                {transaction.sgx_list.split(',') && 
                    transaction.sgx_list.split(',').map((t) => (
                        <tr class="transaction-row ">
                            {/* <td class="col">{transaction.quantity}</td>
                            <td class="col">{transaction.execution_date}</td>
                            <td class="col">{transaction.isin}</td>
                            <td class="col">{transaction.rt}</td>
                            <td class="col">{transaction.clino.substring(0,8) + "..."}</td>
                            <td class="col">{transaction.settlement_price}</td> */}
                            <td class="col">{t.split('_')[0]}</td>
                            <td class="col">{t.split('_')[1]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[4]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[0]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[1]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[2]}</td>
                            <td class="col">{transaction.Recon_ID.split("_")[3]}</td>
                        </tr> 
                    ))} 
            </tbody>
        </table>
      </div>
    );
  }
}