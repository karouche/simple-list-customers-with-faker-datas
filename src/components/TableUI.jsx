import React, { Component } from 'react' 
import './TableUI.css'
import { Table } from 'react-bootstrap'
import ModalUI from './ModalUI'
import Button from 'react-bootstrap/Button'
 

class TableUI extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            show : false,
            product : ''
        }         
        this.openModal = this.openModal.bind(this) ;        
    }    

    openModal = (product) => {       
      const show= true; 
      //this will refresh the image url.                    
      product.imageUrl =   `https://placeimg.com/640/480/business/${product.id}`;                       
      this.setState({show, product});                              
   };

  hideModal = () => {
        this.setState({show: false})
  }
 

    render() {       
 
      const products = this.props.products; 

      return (
        <>
          {products && 
          <Table striped bordered hover size="sm"  width="60%" className="table-shadow">
                <thead>
                   <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                   </tr>
                </thead>
                <tbody>
                  { products.map(row=> (                                 
                         <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>                                                        
                             <td>           
                                <Button variant="info"  size="sm"  onClick={()=>this.openModal(row)}>Info</Button> 
                              </td>
                          </tr>   
                    ))}                    
                  </tbody>             
             </Table>  
            }   
 
                {
                   this.state.show &&                 
                    <ModalUI                     
                        show={this.state.show}  
                        product= {this.state.product} 
                        hideModal={this.hideModal}
                        > 
                    </ModalUI>            
                }     
            </>
      );
    }
  }

  export default TableUI;