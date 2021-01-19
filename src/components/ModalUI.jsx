import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const ModalUI  = (props) =>  {
        
        
        const handleClose = () => {
            props.hideModal();           
        }                                    
        const show = props.show;
        const product = props.product;                 
         
        return (
            <>
 
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{product.name}</Modal.Title>
                        </Modal.Header>
                                <Modal.Body>
                              { product !==null && 
                                <Card style={{ width: '18rem' }}>
                                       <Card.Img  loading="lazy"  variant="top" src={product.imageUrl} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>
                                                    {product.description}
                                            </Card.Text>                                             
                                        </Card.Body>
                              </Card> }
                                </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>                       
                        </Modal.Footer>
                </Modal>
            </>
        ); 
}

export default ModalUI; 