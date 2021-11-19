import xlsxParser from 'xls-parser';
import axios from 'axios';
import React, { Component } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button} from 'react-bootstrap';
import { Dropdown} from 'react-bootstrap';
// import http from "../http-common";



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
          if (this.state.dropDownValue === "File type") {
            alert("Please select the file type before clicking Upload!")
            console.log(`this is the input ${this.state.dropDownValue.toLowerCase()}`)
          }
          else if (this.state.selectedFile ===  null) {
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
            for(var i=0; i<parsedData['Sheet1'].length-1; i++){
              // console.log(this.state.dropDownValue);
              //setTimeout(function callAPI(i=index,self=exchange){
              this.delay(parsedData,i)
              
            //},(index)*5000);
            };
          }  
            );}}

      delay(parsedData,i) {
        setTimeout(() => {
          if (this.state.dropDownValue === "SGX") {
            console.log(parsedData['Sheet1'][i])
            console.log(i)
            parsedData['Sheet1'][i]["StructIndex"] = 0
            parsedData['Sheet1'][i]["PRICE"] = parseInt(parsedData['Sheet1'][i]["PRICE"])
            parsedData['Sheet1'][i]["QTY"] = parseInt(parsedData['Sheet1'][i]["QTY"])
  
            var data = {
              SgxStructIndex: parsedData['Sheet1'][i]["StructIndex"], 
              SgxQuantity: parsedData['Sheet1'][i]["QTY"], 
              SgxExecutionDate: parsedData['Sheet1'][i]["TRADE_DATE"], 
              SgxISIN: parsedData['Sheet1'][i]["ISIN"], 
              SgxRT: parsedData['Sheet1'][i]["RT"], 
              SgxCLINO: parsedData['Sheet1'][i]["CLINO"], 
              SgxSettlementPrice: parsedData['Sheet1'][i]["PRICE"]
            }
            
            console.log(data)
            axios({
              method: 'post',
              // url: 'http://ec2-52-220-82-196.ap-southeast-1.compute.amazonaws.com/testasync',
              url: 'http://localhost:3000/setSgxRow',
              headers: {}, 
              data: data
            }).then(function (response) {
              var startTime = performance.now();
              console.log(response.data);
              var endTime = performance.now();
              console.log(`Call one row of transaction took ${endTime - startTime} milliseconds`);
              });
          }
          // if its a primo dataset
          else {
              // console.log(i);
              // console.log(parsedData)
              var transaction = parsedData.Sheet1.[i];
              console.log(transaction);
              // console.log(parsedData.Sheet1.[0]);
              console.log(i);
  
              transaction.StructIndex = i;
              transaction.SETTLEMENT_PRICE = parseInt(transaction.SETTLEMENT_PRICE);
              transaction.QUANTITY = transaction.QUANTITY
              // console.log(parsedData['Sheet1'][i])
              transaction.EXECUTION_DATE = transaction.EXECUTION_DATE.slice(4) + transaction.EXECUTION_DATE.slice(2,4) + transaction.EXECUTION_DATE.slice(0,2)
              // method 1 of sending axios calls
              var data = {
                PrimoStructIndex: transaction.StructIndex, 
                PrimoQuantity: transaction.QUANTITY, 
                PrimoExecutionDate: transaction.EXECUTION_DATE, 
                PrimoREUT: transaction.REUT, 
                PrimoBuySell: transaction.BUY_SELL, 
                PrimoAccount: transaction.ACCOUNT, 
                PrimoSettlementPrice: transaction.SETTLEMENT_PRICE,
                PrimoPrinciple: transaction.PRINCIPAL, 
                PrimoTradeId: transaction.TRADE_ID 
                  }
              console.log(`Itrations ${i}`,data)
  
              axios({
              method: 'post',
              url: 'http://localhost:3000/setPrimoRow',
              headers: {}, 
              data: data
              }).then(function (response) {
                console.log(response.data)});
  
              // method 2 of sending axios calls
              
              // setTimeout(function callAPI(){
              //   console.log(`Itrations ${i}`,data);
                // axios({
                //   method: 'get',
                //   url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
                //   headers: {}, 
                //   }).then(function (response) {
                //     console.log(response.data)});
              // },(i+1)*10000);
              // setTimeout(function(){ console.log("Hello"); }, (i+1)*10000);
              
          }
        }, i*5000);
        
      };
      
          
      onReconcile = () => {
        axios.get('http://localhost:3000/reconcile').then(
          function(response){
            console.log(response.data)
          }
        )  
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