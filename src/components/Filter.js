import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function Filter(props) {
    const {data,onSelectItem,filterName} = props;
    const [selectedItem,setSelectedItem] = useState([]);

    useEffect(()=>{
        onSelectItem(selectedItem,filterName);
    },[selectedItem])

    const handleOnChange = (event) =>{
        // console.log('Event',event.target.checked);
        const value = event.target.value;
        const isSelected = event.target.checked;
        if(!selectedItem.includes(value) && isSelected){
            setSelectedItem([...selectedItem,value])
        }else if(selectedItem.includes(value) && !isSelected){
            const deSelecteItem = selectedItem.filter(item => item !== value);
            setSelectedItem(deSelecteItem)
        }
        // onSelectItem(selectedItem,filterName);
    } 
    return (
        <div>
            <Form>
                <div className=''>
                    {data?.map(item =>(
                        <Form.Check
                            type={item.type}
                            label={item.label}
                            name={item.name}
                            value={item.key}
                            onChange={handleOnChange}
                            key={item.key}
                        ></Form.Check>
                    ))}
                    {/* <Form.Check
                        type='checkbox'
                        label='Account 1'
                        name='account'
                    ></Form.Check> */}
                    {/* <Form.Check
                        type='checkbox'
                        label='Account 2'
                        name='account'
                    ></Form.Check>
                    <Form.Check
                        type='checkbox'
                        label='Account 3'
                        name='account'
                    ></Form.Check> */}
                </div>
            </Form>
        </div>
    );
}

export default Filter;