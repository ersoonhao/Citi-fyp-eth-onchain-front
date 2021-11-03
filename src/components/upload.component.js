import xlsxParser from 'xls-parser';
import axios from 'axios';
import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button} from 'react-bootstrap';
import { Dropdown} from 'react-bootstrap';
export default class Upload extends Component {
    constructor(props) {
        super(props);
        //added for dropdown title
        this.state = {
          selectedFile: null,
          open: false,
          dropDownValue: "File type"
        }
    }

    
    toggle = () => {
        this.setState({ open: !this.state.open });
    }
    onToggle = (isOpen, e, source) => {
        //This closes the menu on toggling the dropdown or hitting esc.
        if (source.source === 'click' || source.source === 'rootClose') {
            this.toggle();
        }
    }
    state = {
 
        // Initially, no file is selected
        selectedFile: null,
      };
      
      //On selecting dropdown option
      changeValue(text) {
        this.setState({dropDownValue: text})
      }

      // On file select (from the pop up)
      onFileChange = event => {
      
        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
      
      };
      
      // On file upload (click the upload button)
      onFileUpload = () => {
      
        // Create an object of formData
        const formData = new FormData();        
      
        // Update the formData object
        //Form validation for when user doesnt choose any file before clicking upload
          if (this.state.dropDownValue == "File type") {
            alert("Please select the file type before clicking Upload!")
            console.log(`this is the input ${this.state.dropDownValue.toLowerCase()}`)
          }
          else if (this.state.selectedFile ==  null) {
            alert("Please choose a file before clicking Upload!")
            console.log(`this is the input ${this.state.dropDownValue.toLowerCase()}`)
          }
          else {
            formData.append(
              "myFile",
              this.state.selectedFile,
              this.state.selectedFile.name
            );
            // Details of the uploaded file
            // console.log(this.state.selectedFile);
            console.log(`this is the input ${this.state.dropDownValue.toLowerCase()}`)
            // console.log(formData)
            xlsxParser.onFileSelection(this.state.selectedFile).then(data => {
            var parsedData = data;
            // console.log(parsedData) 
            for(var i=0; i<parsedData['Sheet1'].length; i++){
              // console.log(this.state.dropDownValue);
              if (this.state.dropDownValue == "SGX") {
                // console.log(parsedData['Sheet1'][i])
                parsedData['Sheet1'][i]["StructIndex"] = 0
                parsedData['Sheet1'][i]["PRICE"] = parseInt(parsedData['Sheet1'][i]["PRICE"])
                parsedData['Sheet1'][i]["QTY"] = parseInt(parsedData['Sheet1'][i]["QTY"])

                // using method 1 to test setSgxRow and async
                // data = {
                //   SgxStructIndex: parsedData['Sheet1'][i]["StructIndex"], 
                //   SgxQuantity: parsedData['Sheet1'][i]["QTY"], 
                //   SgxExecutionDate: parsedData['Sheet1'][i]["TRADE_DATE"], 
                //   SgxISIN: parsedData['Sheet1'][i]["ISIN"], 
                //   SgxRT: parsedData['Sheet1'][i]["RT"], 
                //   SgxCLINO: parsedData['Sheet1'][i]["CLINO"], 
                //   SgxSettlementPrice: parsedData['Sheet1'][i]["PRICE"],
                //   SgxSettlement: 2 
                // }
                // axios({
                //   method: 'post',
                //   url: 'http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/setSgxRow',
                //   headers: {}, 
                //   data: {data}
                // }).then(function (response) {
                //   console.log(response.data)});


                  data = {
                    SgxStructIndex: parsedData['Sheet1'][i]["StructIndex"], 
                    SgxQuantity: parsedData['Sheet1'][i]["QTY"], 
                    SgxExecutionDate: parsedData['Sheet1'][i]["TRADE_DATE"], 
                    SgxISIN: parsedData['Sheet1'][i]["ISIN"], 
                    SgxRT: parsedData['Sheet1'][i]["RT"], 
                    SgxCLINO: parsedData['Sheet1'][i]["CLINO"], 
                    SgxSettlementPrice: parsedData['Sheet1'][i]["PRICE"]
                  }
                  axios({
                    method: 'post',
                    // url: 'http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/testasync',
                    url: 'http://52.220.82.196/setSgxRow',
                    headers: {}, 
                    data: {data}
                  }).then(function (response) {
                    console.log(response.data)});

                    // data = {
                    //   SgxStructIndex: parsedData['Sheet1'][i]["StructIndex"], 
                    //   SgxQuantity: parsedData['Sheet1'][i]["QTY"], 
                    //   SgxExecutionDate: parsedData['Sheet1'][i]["TRADE_DATE"], 
                    //   SgxISIN: parsedData['Sheet1'][i]["ISIN"], 
                    //   SgxRT: parsedData['Sheet1'][i]["RT"], 
                    //   SgxCLINO: parsedData['Sheet1'][i]["CLINO"], 
                    //   SgxSettlementPrice: parsedData['Sheet1'][i]["PRICE"]
                    // }
                    // axios({
                    //   method: 'get',
                    //   url: 'http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/',
                    //   headers: {}, 
                    //   data: {data}
                    // }).then(function (response) {
                    //   console.log(response.data)});

                // Using method 2 to test setSgxRow and testasync
                  // var params = new URLSearchParams();
                  // params.append('SgxStructIndex', 0);
                  // params.append(' SgxQuantity', 100);
                  // params.append(' SgxExecutionDate', "121212");
                  // params.append(' SgxISIN',"G1U27933225");
                  // params.append(' SgxRT',"B");
                  // params.append(' SgxCLINO',"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09");
                  // params.append(' SgxSettlementPrice', 256);
                  // axios.post('http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/SetsgxRow', params)
                  // .then((response) => {
                  //   console.log(response);
                  // }, (error) => {
                  //   console.log(error);
                  // }); 

                  // var params = new URLSearchParams();
                  // params.append('SgxStructIndex', 0);
                  // params.append(' SgxQuantity', 100);
                  // params.append(' SgxExecutionDate', "121212");
                  // params.append(' SgxISIN',"G1U27933225");
                  // params.append(' SgxRT',"B");
                  // params.append(' SgxCLINO',"765aa1a943a5aa1d0cae8b5c97b68a17785179e6ef13aaaf1b99b78c2387dd09");
                  // params.append(' SgxSettlementPrice', 256);
                  // axios.post('http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/testasync', params)
                  // .then((response) => {
                  //   console.log(response);
                  // }, (error) => {
                  //   console.log(error);
                  // });
              }
              // if its a primo dataset
              else {
                  parsedData['Sheet1'][i]["StructIndex"] = 1
                  parsedData['Sheet1'][i]["SETTLEMENT_PRICE"] = parseInt(parsedData['Sheet1'][i]["SETTLEMENT_PRICE"])
                  parsedData['Sheet1'][i]["QUANTITY"] = parseInt(parsedData['Sheet1'][i]["QUANTITY"])
                  // console.log(parsedData['Sheet1'][i])
                  parsedData['Sheet1'][i]["EXECUTION_DATE"]= parsedData['Sheet1'][i]["EXECUTION_DATE"].slice(4) + parsedData['Sheet1'][i]["EXECUTION_DATE"].slice(2,4) + parsedData['Sheet1'][i]["EXECUTION_DATE"].slice(0,2)
                  // method 1 of sending axios calls
                  data = {
                    PrimoStructIndex: parsedData['Sheet1'][i]["StructIndex"], 
                    PrimoQuantity: parsedData['Sheet1'][i]["QUANTITY"], 
                    PrimoExecutionDate: parsedData['Sheet1'][i]["EXECUTION_DATE"], 
                    PrimoREUT: parsedData['Sheet1'][i]["REUT"], 
                    PrimoBuySell: parsedData['Sheet1'][i]["BUY_SELL"], 
                    PrimoAccount: parsedData['Sheet1'][i]["ACCOUNT"], 
                    PrimoSettlementPrice: parsedData['Sheet1'][i]["SETTLEMENT_PRICE"],
                    PrimoPrincipal: parsedData['Sheet1'][i]["PRINCIPAL"], 
                    TRADE_ID: parsedData['Sheet1'][i]["TRADE_ID"] 
                      }
                  axios({
                  method: 'post',
                  url: 'http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/SetPrimoRow',
                  headers: {}, 
                  data: {data}
                  }).then(function (response) {
                    console.log(response.data)});
                  // method 2 of sending axios calls
                  
              }
            }
            });
            // // Request made to the backend api
            // // Send formData object
            // axios.post(`http://3.229.199.112:3002/upload_${this.state.dropDownValue.toLowerCase()}_dict_complex`, formData)
            //   .then(function (response) {
            //   console.log(response.data)});
          }  
      };

      onReconcile = () => {
        axios.get('http://3.229.199.112:3002/reconcile_orchestrate').then(
          function(response){
            console.log(response.data)
          }
        )
        // console.log("Creating reconcile blocks ...")
        // axios.get('http://localhost:3002/create_reconcile_complex')
        //   .then(function (response) {
        //     console.log(response.data);
            
        //     console.log("Updating reconcile status ...")
        //     axios.get('http://localhost:3002/update_status_complex')
        //       .then(function (response) {
        //         console.log(response.data);
                
        //         console.log("Updating Block ID for each individual transaction")
        //         axios.get('http://localhost:3002/update_block_id_complex').then(
        //           function(response){
        //             console.log(response.data)
        //           }
        //         )
        //   })
        //   })    
      };
      
      // File content to be displayed after
      // file upload is complete
      fileData = () => {
      
        if (this.state.selectedFile) {
           
          return (
            <div>
              <h2>File Details:</h2>
               
              <p>File Name: {this.state.selectedFile.name}</p>
            
                        
              <p>File Type: {this.state.selectedFile.type}</p>
            
                        
              <p>
                Last Modified:{" "}
                {this.state.selectedFile.lastModifiedDate.toDateString()}
              </p>
   
            </div>
          );
        } else {
          return (
            <div>
              <br />
            </div>
            
          );
        }
      };
      
      render() {
      
        return (
          <div>
              <h4>Please choose a file before Pressing the Upload button</h4>
              <DropdownButton id="dropdown-item-button" variant="success" title={this.state.dropDownValue} className="format"> 
              <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>SGX</div></Dropdown.Item>
              <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>PRIMO</div></Dropdown.Item>
              </DropdownButton>
              <p></p>
              <div>
                  <input type="file" onChange={this.onFileChange} />
                  {/* <button class="btn-danger" onClick={this.onFileUpload}>
                    Upload!
                  </button> */}
                  <Button variant="outline-danger" onClick={this.onFileUpload}>Upload!</Button>{' '}
              </div>
              <div>
                  <Button variant="warning" onClick={this.onReconcile}>Reconcile!</Button>{' '}
              </div>
            {this.fileData()}
          </div>
        );
      }
    }