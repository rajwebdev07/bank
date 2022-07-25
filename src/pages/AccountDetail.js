import React, { useContext, useEffect, useState } from 'react';
import AccountContext from '../context/AccountContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useLocation} from "react-router-dom"

function AccountDetail(props) {

    const location = useLocation();
    const {selectedAccount} = location.state;

    return (
        <Container>
            <Row>
                <Col sm={'12'}>
                    <div className='heading mb-3 border-bottom py-2 display-6'>
                        <b>Transaction {selectedAccount.account}</b>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm={'12'}>
                    <div className='account-detail-wrapper'>
                        <div className='account-name mb-1'>
                            <span className='label mx-2 font-weight-bold'><b>Account No:</b></span>
                            <span className='value'>{selectedAccount.account}</span>
                        </div>
                        <div className='account-name mb-1'>
                            <span className='label mx-2 font-weight-bold'><b>Account Name:</b></span>
                            <span className='value'>{selectedAccount.accountName}</span>
                        </div>
                        <div className='account-name mb-1'>
                            <span className='label mx-2 font-weight-bold'><b>Currency Code:</b></span>
                            <span className='value'>{selectedAccount.currencyCode}</span>
                        </div>
                        <div className='account-name mb-1'>
                            <span className='label mx-2 font-weight-bold'><b>Ammount:</b></span>
                            <span className='value'>{selectedAccount.amount} {selectedAccount.currencySymbol}</span>
                        </div>
                        <div className='account-name mb-1'>
                            <span className='label mx-2 font-weight-bold'><b>Transaction Type:</b></span>
                            <span className='value'>{selectedAccount.transactionType}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountDetail;