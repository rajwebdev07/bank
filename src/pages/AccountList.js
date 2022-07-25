import React, { useContext, useEffect, useState } from 'react';
import List from '../components/List';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AccountContext from '../context/AccountContext';
import { Link } from "react-router-dom";
import Filter from '../components/Filter';
import { slice } from 'lodash';
import CustomPagination from '../components/CustomPagination';

function AccountList(props) {

    const {state,goToPage} = useContext(AccountContext);

    const [appliedAccountNameFilter,setAppliedAccountNameFilter] = useState([]);
    const [appliedTransactionFilter,setAppliedTransactionFilter] = useState([]);
    const [viewTransactions,setViewTransactions] = useState([]);
    const [processedTransactionsLength,setProcessedTransactionsLength] = useState(0);

    useEffect(()=>{
        if(state.allTransaction.length){
            let {recordPerPage,currentPage,allTransaction} = state;
            let processAllTransacationRecords = processAllTransacation(allTransaction);
            setProcessedTransactionsLength(processAllTransacationRecords.length)
            const processedViewTransactions = slice(processAllTransacation(allTransaction),currentPage - 1,recordPerPage);
            setViewTransactions(processedViewTransactions);
        }
    },[appliedTransactionFilter,appliedAccountNameFilter,state.allTransaction,state.currentPage])
    
    const processAllTransacation = (allTransaction) =>{
        let processedAllTransaction = allTransaction?.filter(item =>{
            const {accountName,transactionType} = item;
            let nameFilter = false;
            let typeFilter = false;
            if(appliedAccountNameFilter.length === 0){
                nameFilter = true;
            }else{
                nameFilter = appliedAccountNameFilter.includes(accountName);
            }
            if(appliedTransactionFilter.length === 0){
                typeFilter = true;
            }else{
                typeFilter = appliedTransactionFilter.includes(transactionType);
            }
            return nameFilter && typeFilter
        });
        console.log('Start Processing',processedAllTransaction);
        return processedAllTransaction;
    }

    const getMaxPage = () => {
        if(!!processedTransactionsLength){
            const value = Math.ceil(processedTransactionsLength / state.recordPerPage);
            return value;
        }
        return 0
    
    }


    const header = [{
        label:'Account No',
        key:'account',
        view : (item) => {
            return (<Link to={"/detail/"+item.account} state={{selectedAccount : item }}>{item.account}</Link>)
        }
    },{
        label:'Account Name',
        key:'accountName'
    },{
        label:'Currency',
        key:'currencyCode'
    },{
        label:'Amount',
        key:'amount'
    },{
        label:'Transaction Type',
        key:'transactionType'
    }];

    const accountNameFilter = [{
        label:'Savings Account',
        type:'checkbox',
        name:'accountType',
        key:'Savings Account'
    },{
        label:'Checking Account',
        type:'checkbox',
        name:'accountType',
        key:'Checking Account'
    },
    {
        label:'Auto Loan Account',
        type:'checkbox',
        name:'accountType',
        key:'Auto Loan Account'
    },{
        label:'Credit Card Account',
        type:'checkbox',
        name:'accountType',
        key:'Credit Card Account'
    }];

    const transactionTypeFilter = [{
        label:'Deposit',
        type:'checkbox',
        name:'transaction',
        key:'deposit'
    },{
        label:'Withdrawl',
        type:'checkbox',
        name:'transaction',
        key:'withdrawal'
    },
    {
        label:'Invoice',
        type:'checkbox',
        name:'transaction',
        key:'invoice'
    },{
        label:'Payment',
        type:'checkbox',
        name:'transaction',
        key:'payment'
    }];

    const handleOnSelectedItem = (slectedItem,filterName) =>{
        if(filterName === 'transactionType'){
            setAppliedTransactionFilter(slectedItem)
        }
        if(filterName === 'accountName'){
            setAppliedAccountNameFilter(slectedItem)
        }
        goToPage(1)
    }

    return (
        <Container>
            <Row className=''>
                <Col sm={12}>
                <div className='heading mb-3 border-bottom py-2 display-6'>
                        <b>Account List</b>
                    </div>
                </Col>
            </Row>
            <Row className="section-wrapper">
                <Col className="section" sm={4}>
                    <div className="mb-3">
                        <h4>Filter</h4>
                    </div>
                    <div className='filter-section filter-section-1 mb-3 border p-3'>
                        <div class="mb-2">
                            <h6>Account Name</h6>
                        </div>
                        <div class="">
                            <Filter data={accountNameFilter}  filterName='accountName' onSelectItem={handleOnSelectedItem} ></Filter> 
                        </div>
                    </div>
                    <div className='filter-section filter-section-1 border p-3'>
                         <div class="mb-2">
                            <h6>Transaction Type</h6>
                        </div>
                        <div className=''>
                            <Filter data={transactionTypeFilter} filterName='transactionType' onSelectItem={handleOnSelectedItem}></Filter>
                        </div>
                       
                    </div>
                </Col>
                <Col className='section' sm={8}>
                    <div className="mb-3">
                        <h4>Account List</h4>
                    </div>
                    <div className=''>
                        <CustomPagination currentPage={state.currentPage} maxPage={getMaxPage()} onPageGoTo={goToPage} ></CustomPagination>
                    </div>
                    <div className='mb-3'>
                        <List header={header} data={viewTransactions}></List>
                    </div>
                    <div className=''>
                        <CustomPagination currentPage={state.currentPage} maxPage={getMaxPage()} onPageGoTo={goToPage} ></CustomPagination>
                    </div>
                </Col>
            </Row>
        </Container>      
    );
}

export default AccountList;