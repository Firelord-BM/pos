import React from "react"
export const ComponentToPrint = React.forwardRef((props,ref)=>{
    const {cart,totalAmount} = props;
    return(
        <div className="p-5" ref={ref}>
            <table >
              <thead>
              <tr>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Price</th>
                <th className='px-4 py-2'>Quantity</th>
                <th className='px-4 py-2'>Total</th>
                
                
              </tr>
              </thead>
              <tbody>
              {cart ? cart.map((cardItem,i)=>{return(
                
                  <tr key={i}>
                    <td className='px-4 py-2'>{cardItem.id}</td>
                    <td className='px-4 py-2'>{cardItem.name}</td>
                    <td className='px-4 py-2'>{cardItem.price}</td>
                    <td className='px-4 py-2'>{cardItem.quantity}</td>
                    <td className='px-4 py-2'>{cardItem.totalAmount}</td>
                   

                  </tr>
               
              )}): <p> </p>}
               </tbody>
            </table>

            <h2>Total Amount: KSH.{totalAmount}</h2>
        </div>
    )
})