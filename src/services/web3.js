import Web3 from "web3";
import { InvoiceManagement_ABI } from "../abi/InvoiceManagment_abi";

require('dotenv').config();

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

// export const web3 = window.web3;
export const web3 = new Web3(Web3.givenProvider);

export const loadAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  return account;
};

const InvoiceManagement_addr = process.env.REACT_APP_INVOICEMANAGEMENT_ADDR;
export const InvoiceManagement_Contract = new web3.eth.Contract(
  InvoiceManagement_ABI,
  InvoiceManagement_addr
);

//#################################################################
//# Company
//#################################################################

export const createCompany = async (name, email) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .createCompany(name, email)
    .send({
      from: account,
    });

  // console.log(result);
  if (result) return true;
  else return false;
};

export const getCompanyId = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const companyId = await InvoiceManagement_Contract.methods
    .getCompanyId(account)
    .call();

  // console.log(companyId);
  return companyId;
};

export const getCompanyById = async (companyId) => {
  const company = await InvoiceManagement_Contract.methods
    .idToCompany(companyId)
    .call();

  return company;
};


//#################################################################
//# Client
//#################################################################

export const addClient = async (clientAddr, discount) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const result = await InvoiceManagement_Contract.methods
    .addClient(clientAddr)
    .send({
      from: account,
    });

  // console.log(result);
  if (result) return true;
  else return false;
};


export const getAllClients = async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const clients = await InvoiceManagement_Contract.methods
    .getAllClients()
    .call({
      from: account,
    });
  console.log(clients); // Check this
  return clients;
};

//#################################################################
//# Invoice
//#################################################################

export const getAllBillsByCompany = async (companyId) => {
  const invoiceIds = await InvoiceManagement_Contract.methods
    .getAllBills(companyId)
    .call();
  return invoiceIds;
};

export const getInvoiceDetails = async (invoiceId) => {
  const invoice = await InvoiceManagement_Contract.methods
    .invoices(invoiceId)
    .call();

  const items = await getItemsbyInvoice(invoiceId);
  invoice['items'] = items;

  const company = await getCompanyById(invoice.companyId);
  invoice['company'] = company;

  return invoice;
};

export const getItemsbyInvoice = async (invoiceId) => {
  const items = await InvoiceManagement_Contract.methods
    .getItemsbyInvoice(invoiceId)
    .call();

  const itemArr = []
  for(var i = 0; i < items[0].length; i++) {
    const item = {
      'desc': items[0][i],
      'qty': items[1][i],
      'price': items[2][i],
      'discount': items[3][i],
      'tax': items[4][i]
    }
    itemArr.push(item);
  }

  return itemArr;
};


export const payBill = async (invoiceId, amount) => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const result = await InvoiceManagement_Contract.methods
    .payBill(invoiceId)
    .send({
      from: account,
      value: amount,
    })
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", function (confirmationNumber, receipt) {
      window.alert("Money has been transferred successfully!");
    })
    .on("error", function (error, receipt) {
      console.log(error);
      window.alert("An error has occured!");
    });

  window.location.reload();
  console.log(result);
};