import React from 'react';
import firebase from './firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function MyVerticallyCenteredModal(props) {
    const [editText, setEditText] = React.useState(true);
    const [profileAbout, setProfileAbout] = React.useState(props.about);
    const [update, showUpdate] = React.useState(false);

    const onUpdate = () =>{
        const db = firebase.firestore();
        db.collection('profiles').doc(props.pfid).update({About: profileAbout});
        setEditText(true);
        showUpdate(true); //shows a notification that you updated successfully
        props.onHide(); //this closes the modal when you create a profile
        
    }

    const closeWindow = ()=>{
        setEditText(true); //this makes the text area read only for the sake of consistency
        props.onHide(); //this closes the modal when you create a profile

    }

    return (
        <>
        {/*this is the hidden alert for when a profile is updated */}
         <Toast onClose={() => showUpdate(false)} show={update} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'green'
          }}>
            <Toast.Header>
                <strong >Update Successful</strong>
          </Toast.Header>
        </Toast>

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <h4>{props.name}</h4>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
                <Form.Group value={profileAbout} onChange ={(e)=> setProfileAbout(e.target.value)} >
                    <Form.Control style={{backgroundColor:'#F8F8F8'}}onClick={()=> setEditText(false)} defaultValue={profileAbout} readOnly={editText} as="textarea" rows="3" />
                    <Form.Text className="text-muted">
                    Click on the text to edit
                    </Form.Text>
                </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
            {/*button to update transcript */}
            <Button onClick={onUpdate} variant="primary" >Update</Button>
            <Button onClick={closeWindow} variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
        
        </>
    );
  }

  export default MyVerticallyCenteredModal;