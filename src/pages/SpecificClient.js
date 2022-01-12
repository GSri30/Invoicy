import React from 'react';
import {Row, Col, Card, Table, Button} from 'react-bootstrap';

import Aux from "../hoc/_Aux";
import DEMO from "../store/constant";

import avatar1 from '../assets/images/user/avatar-1.jpg';
import avatar2 from '../assets/images/user/avatar-2.jpg';

import {web3, loadWeb3, loadAccount, getCompanyId, getCompanyById, updateClientBlockStatus,
    getAllInvoicesByClient, getInvoiceDetails, getClientbyId} from "../services/web3";
import Dialog from 'react-bootstrap-dialog';

// For Reference
    // client = {
    // clientAddr: "0xA4DD021Df55c4b746cf6Be71b9b639f8A3099F39"
    // clientId: "0"
    // companyAddr: "0xA4DD021Df55c4b746cf6Be71b9b639f8A3099F39"
    // companyId: "2"
    // discount: "35"
    // email: "adidas@gmail.com"
    // isBlocked: false
    // name: "Adidas"
    // }


class ClientDashboard extends React.Component {

    constructor (props) {
        super(props);      
        this.clientId = this.props.match.params.id;
        this.state = {wallet: '', companyId: 0, client:{}, invoices: []};
        this.fetchAccount();
    }

    async fetchAccount(){
        await loadWeb3();
        const account = await loadAccount();
        this.setState({wallet: account});
        const companyId = await getCompanyId();
        if(companyId > 0) {
            this.setState({companyId: companyId});
        }
        else{
            this.props.history.push('/');
        }
    }

    async getInvoices(){
        try{
            await this.fetchAccount();
            const ids = await getAllInvoicesByClient(this.state.companyId, this.clientId);
            ids.forEach(async id => {
                const data = await getInvoiceDetails(id);
                const invoice = {'id': id, 'data': data}
                this.setState({
                    invoices: [...this.state.invoices, invoice]
                });
            })
        }catch(e){
                console.log(e);
            }
    }

    async getClientDetails(){
        try{
            await this.fetchAccount();
            const client = await getClientbyId(this.state.companyId, this.clientId);
            const companyId = await getCompanyId(client.clientAddr);
            const company = await getCompanyById(companyId);
            const data = {...client, ...company}
            this.setState({
                client: data
            })
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getClientDetails();
        this.getInvoices();
    }  

    async blockClient() {
        const result = await updateClientBlockStatus(this.state.companyId, this.clientId);
        if(result) {
            alert('Success!');
        }
        else {
            alert('Something went wrong!');
        }
    }

    render() {       
        let invoices = [];
        let completedInvoices = [];

        this.state.invoices.forEach(invoice => {
            if(invoice.data.isSettled){
                completedInvoices.push(
                    <tr className="unread" key = {invoice.id}>
                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                        <td>
                            <h6 className="mb-1">{invoice.data.company.name}</h6>
                            {/* <p className="m-0">{invoice.data.note}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>
    
                        <td>
                            <h6 className="text-muted">{web3.utils.fromWei(invoice.data.payment.totalAmount)} ETH</h6>
                        </td>
                        <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12">View Details</a></td>
                    </tr>
                )
            }
            else{
                invoices.push(
                    <tr className="unread" key = {invoice.id}>
                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                        <td>
                            <h6 className="mb-1">{invoice.data.company.name}</h6>
                            {/* <p className="m-0">{invoice.data.note}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>{invoice.data.invoiceDate}</h6>
                        </td>
                        <td>
                            <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>{invoice.data.dueDate}</h6>
                        </td>

                        <td>
                            <h6 className="text-muted">{web3.utils.fromWei(invoice.data.payment.dueAmount)} ETH</h6>
                        </td>
                        <td>
                            <a href={DEMO.BLANK_LINK} className="label theme-bg2 text-white f-12">View Details</a>
                            <button style={{border: 0}} onClick={() => this.dialog.showAlert('Reminder sent!')} className="label theme-bg text-white f-12">Remind</button>
                            <Dialog ref={(component) => { this.dialog = component }} />
                        </td>
                    </tr>
                )
            }
        })


        return (
            <Aux>
                <Row>
                    <Col md={12} xl={12}>
                        <h3>Name: {this.state.client.name}</h3>
                        <h5>Email: {this.state.client.email}</h5>
                        <h5>Discount: {this.state.client.discount}</h5>
                        <h5>Wallet Address: {this.state.client.clientAddr}</h5>
                    </Col>

                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Pending Invoices</Card.Title>
                            </Card.Header>
                            
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {invoices}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Settled Invoices</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                            <tbody>
                                {completedInvoices}
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    {
                        !this.state.client.isBlocked &&
                        <Col md={12} xl={12}>
                            <Button variant='danger' onClick={() => this.blockClient()}>Block Client</Button>
                        </Col>
                    }
                    {
                        this.state.client.isBlocked &&
                        <Col md={12} xl={12}>
                            <Button variant='primary' onClick={() => this.blockClient()}>Unblock Client</Button>
                        </Col>
                    }
                </Row>
            </Aux>
        );
    }
}

export default ClientDashboard;