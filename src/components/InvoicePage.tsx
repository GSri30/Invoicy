import React, { FC, useState, useEffect } from 'react'
import { Invoice, ProductLine } from '../data/types'
import { initialInvoice, initialProductLine } from '../data/initialData'
import EditableInput from './EditableInput'
import EditableSelect from './EditableSelect'
import EditableTextarea from './EditableTextarea'
import EditableCalendarInput from './EditableCalendarInput'
import EditableFileImage from './EditableFileImage'
import countryList from '../data/countryList'
import Document from './Document'
import Page from './Page'
import View from './View'
import Text from './Text'
import { Font } from '@react-pdf/renderer'
import Download from './DownloadPDF'
import format from 'date-fns/format'
import { Text as PdfText } from '@react-pdf/renderer'
import {loadAccount, getCompanyId, getAllClients, getCompanyById, getClientCompany} from "../services/web3";
import '../scss/main.scss'
Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf', fontWeight: 600 },
  ],
})

interface Props {
  data?: Invoice
  pdfMode?: boolean
}

const InvoicePage: FC<Props> = ({ data, pdfMode }) => {
  const [invoice, setInvoice] = useState<Invoice>(data ? { ...data } : { ...initialInvoice })
  const [subTotal, setSubTotal] = useState<number>()
  const [saleTax, setSaleTax] = useState<number>()
  const [advance, setAdvance] = useState<number>(0)
  
  const [myClients, setMyClients] = useState<any[]>();
  const dateFormat = 'MMM dd, yyyy'
  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date()
  const invoiceDueDate =
    invoice.dueDate !== ''
      ? new Date(invoice.dueDate)
      : new Date(invoiceDate.valueOf())

  if (invoice.dueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30)
  }

  let allClients: any[] = [];

  const myAsyncFunction = async (): Promise<any> => {
    const clients = await getAllClients();
    const companyId = await getCompanyId();
    const company = await getCompanyById(companyId);
    const account = await loadAccount();

    clients.forEach((element: any[]) => {
      allClients.push({value:element[1], text:element[1], id:element[0]});
    });

    const newInvoice = { ...invoice }
    newInvoice.companyName = company.name;
    newInvoice.email = company.email;
    newInvoice.companyID = companyId;
    try {
      newInvoice.clientAddr = allClients[0].value;
      newInvoice.clientID = allClients[0].id;
      const clientComany = await getClientCompany(companyId, newInvoice.clientID)
      newInvoice.clientName = clientComany.name;
      newInvoice.clientEmail = clientComany.email;
    }
    catch(e) {
      console.log(e);
      newInvoice.clientAddr = account;
      newInvoice.clientID = "0";
    }
    newInvoice.companyAddr = account;

    console.log(newInvoice)
    setMyClients(allClients)
    setInvoice(newInvoice)
  }

  const handleChange = async (name: keyof Invoice, value: string | number) => {
    if (name !== 'productLines') {

      const newInvoice = { ...invoice }

      // if (name === 'logoWidth' && typeof value === 'number') {
      //   newInvoice[name] = value
      // }
      // else if (name !== 'logoWidth' && typeof value === 'string') {
      //   if(name !== 'advancePercent')
      //     {newInvoice[name] = value}
      //   else {
      //     const match = value.match(/(\d+)%/)
      //     const taxRate = match ? parseFloat(match[1]) : 0
      //     console.log(match,taxRate)
      //     setAdvance(taxRate)
      //     newInvoice[name] = taxRate.toString() + '%';
      //   }
      // }

      if(name === "clientAddr" && typeof value === 'string') {
        newInvoice[name] = value;
        const clientCompanyId = await getCompanyId(value);
        const clientCompany = await getCompanyById(clientCompanyId)
        newInvoice["clientName"] = clientCompany.name;
        newInvoice["clientEmail"] = clientCompany.email;
      }
      if(typeof value === 'string') {
        newInvoice[name] = value;
      }
      else {
        newInvoice[name] = value.toString();
      }

      setInvoice(newInvoice)
    }
  }

  const handleProductLineChange = (index: number, name: keyof ProductLine, value: string) => {
    const productLines = invoice.productLines.map((productLine, i) => {
      if (i === index) {
        const newProductLine = { ...productLine }

        if (name === 'desc') {
          newProductLine[name] = value
        } else {
          if (
            value[value.length - 1] === '.' ||
            (value[value.length - 1] === '0' && value.includes('.'))
          ) {
            newProductLine[name] = value
          } else {
            const n = parseFloat(value)

            newProductLine[name] = (n ? n : 0).toString()
          }
        }

        return newProductLine
      }

      return { ...productLine }
    })

    setInvoice({ ...invoice, productLines })
  }

  const handleRemove = (i: number) => {
    const productLines = invoice.productLines.filter((productLine, index) => index !== i)

    setInvoice({ ...invoice, productLines })
  }

  const handleAdd = () => {
    const productLines = [...invoice.productLines, { ...initialProductLine }]

    setInvoice({ ...invoice, productLines })
  }

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }
  useEffect (() => {
    myAsyncFunction()
  },[])
  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine) => {
      const quantityNumber = parseFloat(productLine.qty)
      const rateNumber = parseFloat(productLine.price)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])

  // useEffect(() => {
  //   const match = invoice.taxLabel.match(/(\d+)%/)
  //   const taxRate = match ? parseFloat(match[1]) : 0
  //   const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0

  //   setSaleTax(saleTax)
  // }, [subTotal, invoice.taxLabel])


  const storeInvoiceData = (event: any) => {
    const invoiceData = {...invoice}
    // console.log(invoiceData)
    // Store this so that we can retrieve it later
  }

  const sendInvoice = (event: any) => {
    const invoiceData = {...invoice}
    // console.log(invoiceData)
    // Send invoice to client
  }

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} />}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            {/* <EditableFileImage
              className="logo"
              placeholder="Your Logo"
              value={invoice.logo}
              width={invoice.logoWidth}
              pdfMode={pdfMode}
              onChangeImage={(value) => handleChange('logo', value)}
              onChangeWidth={(value) => handleChange('logoWidth', value)}
            /> */}
            <EditableInput
              className="fs-20 bold"
              placeholder="Your Company"
              value={invoice.companyName}
              // onChange={(value) => handleChange('companyName', value)}
              pdfMode={pdfMode}
            />

            {pdfMode ? (
              <PdfText style={{fontSize:'10px'}}>{invoice.companyAddr}</PdfText>
            ) : (
              <input
              type="text"
              className={'input'}
              value={invoice.companyAddr}
              readOnly
              style={{textOverflow:'ellipsis',width:'110%'}}
            />
            )}    

            <EditableInput
              placeholder="Email Address"
              value={invoice.email}
              // onChange={(value) => handleChange('email', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-50" pdfMode={pdfMode}>        
            <EditableInput
              className="fs-45 right bold"
              placeholder="Invoice"
              value={"INVOICE"}
              // onChange={(value) => handleChange('title', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>




        <View className="flex mt-40" pdfMode={pdfMode}>
          
          <View className="w-55" pdfMode={pdfMode}>
            <EditableInput
              className="bold dark mb-1"
              value={"Bill To:"}
              // onChange={(value) => handleChange('billTo', value)}
              pdfMode={pdfMode}
            />
            {/* <div style={{fontSize:'14px',fontWeight:'600'}}>Client's Payment Address:</div> */}
            {pdfMode ? (
              <PdfText style={{fontSize:'10px'}}>{invoice.clientAddr}</PdfText>
            ) : (
                  <EditableSelect
                    options={myClients}
                    value={invoice.clientAddr}
                    onChange={(value) => handleChange('clientAddr', value)}
                    pdfMode={pdfMode}
                    />            
            )}

            <EditableInput
              placeholder="Your Client's Name"
              value={invoice.clientName}
              // onChange={(value) => handleChange('clientName', value)}
              pdfMode={pdfMode}
            />
            <EditableInput
              placeholder="Email Address"
              value={invoice.clientEmail}
              // onChange={(value) => handleChange('clientEmail', value)}
              pdfMode={pdfMode}
            />
          </View>
          
          <View className="w-45" pdfMode={pdfMode}>
            
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={"Invoice#"}
                  // onChange={(value) => handleChange('invoiceTitleLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableInput
                  placeholder="INV-12"
                  value={"INV-0"+ invoice.invoiceId}
                  onChange={(value) => handleChange('invoiceId', value)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={"Invoice Date"}
                  // onChange={(value) => handleChange('invoiceDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDate, dateFormat)}
                  selected={invoiceDate}
                  onChange={(date) =>
                    handleChange(
                      'invoiceDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={"Due Date"}
                  // onChange={(value) => handleChange('invoiceDueDateLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <EditableCalendarInput
                  value={format(invoiceDueDate, dateFormat)}
                  selected={invoiceDueDate}
                  onChange={(date) =>
                    handleChange(
                      'dueDate',
                      date && !Array.isArray(date) ? format(date, dateFormat) : ''
                    )
                  }
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            
            <View className="flex mb-1" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
              <EditableInput
                  className="bold"
                  value={"Advance Percent"}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <EditableInput
                  value={invoice.advancePercent + "%"}
                  onChange={(value) => handleChange('advancePercent', value)}
                  pdfMode={pdfMode}
                />
              </View>
              {/* <View className="w-60" pdfMode={pdfMode}>
              <Text className="dark w-auto" pdfMode={pdfMode}>
                {'$ ' + (typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined'
                  ? (subTotal + saleTax) * (advance/100)
                  : 0
                ).toFixed(2) + ' (' + invoice.advancePercent + ') '}
              </Text>
              </View> */}
            </View>
            
          </View>
        </View>




        <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
          <View className="w-48 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold"
              value={"Item Description"}
              // onChange={(value) => handleChange('productLineDescription', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={"Qty"}
              // onChange={(value) => handleChange('productLineQuantity', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={"Rate"}
              // onChange={(value) => handleChange('productLineQuantityRate', value)}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-18 p-4-8" pdfMode={pdfMode}>
            <EditableInput
              className="white bold right"
              value={"Amount"}
              // onChange={(value) => handleChange('productLineQuantityAmount', value)}
              pdfMode={pdfMode}
            />
          </View>
        </View>



        {invoice.productLines.map((productLine, i) => {
          return pdfMode && productLine.desc === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className="row flex ml-0 mr-0" pdfMode={pdfMode}>
              <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableTextarea
                  className="dark"
                  rows={2}
                  placeholder="Enter item name/description"
                  value={productLine.desc}
                  onChange={(value) => handleProductLineChange(i, 'desc', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={productLine.qty}
                  onChange={(value) => handleProductLineChange(i, 'qty', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <EditableInput
                  className="dark right"
                  value={productLine.price}
                  onChange={(value) => handleProductLineChange(i, 'price', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine.qty, productLine.price)}
                </Text>
              </View>
              {!pdfMode && (
                <button
                  className="link row__remove"
                  aria-label="Remove Row"
                  title="Remove Row"
                  onClick={() => handleRemove(i)}
                >
                  <span className="icon icon-remove bg-red"></span>
                </button>
              )}
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
            {!pdfMode && (
              <button className="link" onClick={handleAdd}>
                <span className="icon icon-add bg-green mr-10"></span>
                Add Line Item
              </button>
            )}
          </View>
          
          <View className="w-50 mt-20" pdfMode={pdfMode}>

            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <EditableInput
                  value={"Total Discount"}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {invoice.discount}
                </Text>
              </View>
            </View>

            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <EditableInput
                  value={"Sales Tax"}
                  // onChange={(value) => handleChange('taxLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {invoice.tax}
                </Text>
              </View>
            </View>
            
            <View className="flex bg-gray p-1" pdfMode={pdfMode}>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value={"TOTAL"}
                  // onChange={(value) => handleChange('totalLabel', value)}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-1 flex" pdfMode={pdfMode}>
                <EditableInput
                  className="dark bold right ml-30"
                  value={"ETH"}
                  // onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                  {invoice.totalAmount}
                </Text>
              </View>
            </View>

            <View className="flex bg-gray p-1" pdfMode={pdfMode}>
              <View className="w-50 p-1" pdfMode={pdfMode}>
                <EditableInput
                  className="bold"
                  value="TOTAL DUE"
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-1 flex" pdfMode={pdfMode}>
                <EditableInput
                  className="dark bold right ml-30"
                  value={"ETH"}
                  // onChange={(value) => handleChange('currency', value)}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                  {invoice.dueAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-20" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100"
            value={"Notes"}
            // onChange={(value) => handleChange('notesLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={invoice.note}
            onChange={(value) => handleChange('note', value)}
            pdfMode={pdfMode}
          />
        </View>
        <View className="mt-20" pdfMode={pdfMode}>
          <EditableInput
            className="bold w-100"
            value={"Terms & Conditions"}
            // onChange={(value) => handleChange('termLabel', value)}
            pdfMode={pdfMode}
          />
          <EditableTextarea
            className="w-100"
            rows={2}
            value={"Please make the payment by the due date."}
            // onChange={(value) => handleChange('term', value)}
            pdfMode={pdfMode}
          />
        </View>
        {!pdfMode && <button className='btn btn-secondary' onClick={(event:any) => {storeInvoiceData(event)}}>Save Draft</button>}
        {!pdfMode && <button className='btn btn-primary'  onClick={(event:any) => {sendInvoice(event)}}>Send</button>}
        
      </Page>
    </Document>
  )
}

export default InvoicePage
