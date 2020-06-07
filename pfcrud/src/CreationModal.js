import React from 'react';
import firebase from './firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

function CreationModal(props) {
    const [newProfile, setNewProfile] = React.useState();
    const [newProfileAbout, setNewProfileAbout] = React.useState();
    const [update, showUpdate] = React.useState(false);

    const onCreate = () =>{
        const db = firebase.firestore();
        db.collection('profiles').add({Name: newProfile, About: newProfileAbout});
        showUpdate(true); //shows a notification that you created successfully
        props.onHide(); //this closes the modal when you create a profile
    }

    return (
        <>
        {/*this is the hidden alert for when a profile is created */}
        <Toast onClose={() => showUpdate(false)} show={update} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'green'
          }}>
            <Toast.Header>
                <strong >New Profile Added</strong>
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
              Create a New Profile
          </Modal.Title>
      </Modal.Header>
        <Modal.Body>

        <Form>
            <Form.Group value={newProfile} onChange ={(e)=> setNewProfile(e.target.value)}>
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter name" />
            </Form.Group>

            <Form.Group value={newProfileAbout} onChange ={(e)=> setNewProfileAbout(e.target.value)}>
                <Form.Label>Transcript</Form.Label>
                <Form.Control as="textarea" rows="3" />
                <Form.Text className="text-muted">
                Be sure to be detailed in transcript
                </Form.Text>
            </Form.Group>

            
        </Form>

        </Modal.Body>
        <Modal.Footer >
        {/*button to create new profile */}
          <Button onClick={onCreate} variant="primary" >Create</Button>
          <Button onClick={props.onHide} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }

  export default CreationModal;