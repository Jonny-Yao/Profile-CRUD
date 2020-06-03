import React from 'react';
import firebase from './firebase';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

function CreationModal(props) {
    const [newProfile, setNewProfile] = React.useState();
    const [newProfileAbout, setNewProfileAbout] = React.useState();

    const onCreate = () =>{
        const db = firebase.firestore();
        db.collection('profiles').add({Name: newProfile, About: newProfileAbout});
        props.onHide(); //this closes the modal when you create a profile
    }

    return (
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
        {/*button to create new profile */}
        <Button onClick={onCreate} variant="primary" >Create</Button>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default CreationModal;