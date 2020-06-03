import React from 'react';
import firebase from './firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import CreationModal from './CreationModal';
import Card from 'react-bootstrap/Card';

export const CreateProfile = () =>{
    const [modalShow, setModalShow] = React.useState(false);

    return(
        <div>
            <Button variant="light" onClick={() => setModalShow(true)} >
                <Card border="light" style={{ width: '18rem' }}>
                    <Card.Header>Create New Profile</Card.Header>
                    <Card.Body>
                    <Card.Title><h1>+</h1></Card.Title>
                    <Card.Text>
                        
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Button>

            <CreationModal
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </div>


    );
};