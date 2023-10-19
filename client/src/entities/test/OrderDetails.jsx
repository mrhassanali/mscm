import React,{useEffect} from 'react'
import "../../css/Form.css"

export default function OrderDetails(props) {
    useEffect(() => {
        document.title = props.title;
      }, []);

    return (
        <div className="form-container">
            <h2>{props.title}</h2>
            <form action='#'>
                
            <div className="column">
                <div className='input-box'>
                    <label>Order ID</label>
                    <input type="text" placeholder="Enter Medicine Name" required />
                </div>
                <div className='input-box'>
                    <label>Medicine ID</label>
                    <input type="text" placeholder="Enter Medicine Formula" required />
                </div>
            </div>
                
            <div className="column">
                <div className='input-box'>
                    <label>Price</label>
                    <input type="text" placeholder="Enter Description Description" required />
                </div>
                <div className='input-box'>
                    <label>Quantity</label>
                    <input type="text" placeholder="Enter Medicine Quantity" required />
                </div>
            </div>
                <div className='input-box'>
                    <label>Discount</label>
                    <input type="text" placeholder="Enter Medicine Quantity" required />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
