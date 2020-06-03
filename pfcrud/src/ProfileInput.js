import React from 'react';
import firebase from './firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import MyVerticallyCenteredModal from './MyVerticallyCenteredModal';
import Card from 'react-bootstrap/Card';

export const ProfileInput = ({pf}) =>{
    const[Name, setName] = React.useState(pf.Name);
    const[About, setAbout] = React.useState(pf.About);
    const [modalShow, setModalShow] = React.useState(false);

    const onUpdate = () =>{
        const db = firebase.firestore();
        db.collection('profiles').doc(pf.id).set({...pf, Name});
    }
    const onDelete = () =>{
        const db = firebase.firestore();
        db.collection('profiles').doc(pf.id).delete();
    }
    
    return(
        <div>
            <Button variant="light" onClick={() => setModalShow(true)} >
                <Card border="light" style={{ width: '18rem' }}>
                    <Card.Header>{Name}</Card.Header>
                    <Card.Body>
                    <Card.Title>Dark Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                name = {Name}
                about = {About}
            />
        </div>
    );
};