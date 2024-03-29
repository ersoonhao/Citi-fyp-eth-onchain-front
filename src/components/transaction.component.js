import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
// import { Link } from "react-router-dom";

const reconcile_transaction = {
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
        {/* <h1>Reconcile ID: {this.props.match.params.id}</h1> */}
        <h1>Reconcile ID: {reconcile_transaction.SgxStructIndex}</h1>
        <table >
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
              <tr>
                    <th scope="row">Account (CLINO):</th>
                    <td class="col" colspan="3">{reconcile_transaction.SgxCLINO}</td>
                </tr> 
                <tr>
                    <th scope="row">Cumulative Quantity:</th>
                    <td class="col">{reconcile_transaction.SgxQuantity}</td>
                    <th scope="row">Reconcile Status:</th>
                    <td><div>
                    {reconcile_transaction.reconciled === true ? <td class="col">Success</td> : null}
                    {reconcile_transaction.reconciled === false ? <td class="col">Fail</td>: null}
                    </div></td>
                </tr> 
                <tr>
                    <th scope="row">ISIN (REUT):</th>
                    <td class="col">{reconcile_transaction.SgxISIN}</td>
                    <th scope="row">Buy/Sell (RT):</th>
                    {reconcile_transaction.SgxRT === "B" ? null :<td class="col">Buy</td>}
                    {reconcile_transaction.SgxRT === "S" ? null :<td class="col">Sell</td>}
                </tr> 
                <tr>
                    <th scope="row">Execution Date:</th>
                    <td class="col">{reconcile_transaction.SgxExecutionDate}</td>
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