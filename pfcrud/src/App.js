import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import {ProfileInput} from './ProfileInput'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {CreateProfile} from './CreateProfile';
import Navbar from 'react-bootstrap/Navbar';

const ProfileBox = styled.div`
  margin:1%;
 `;

 const Layout = styled.div`
 display: flex;
flex-wrap: wrap;
justify-content: center;
 `;

function App() {
  const [profiles, setProfiles] = React.useState([]);

  {/*loads in all of the profiles into profile state */}
  React.useEffect(() => {
    const unsubscribe = firebase.firestore()
    .collection('profiles')
    .onSnapshot((snapshot) => {
      const newpf = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data()
      }));

      setProfiles(newpf);
    });
    {/*deletes the web socket for firebase when we unmount */}
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar bg="dark">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Navbar>

      <Layout>
        {/*create profile is used to create new profiles, designed to look like the rest of components */}
        <ProfileBox key={'add'}>
          <CreateProfile pf={'add'}/>
        </ProfileBox>

        {profiles.map(pf =>  (
          
          <ProfileBox key={pf.Name}> 
            <ProfileInput pf={pf}/>
          </ProfileBox>

        ))}
      </Layout>

    </div>
  );
}

export default App;
