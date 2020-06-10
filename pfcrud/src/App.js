import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase';
import {ProfileInput} from './ProfileInput'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {CreateProfile} from './CreateProfile';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const ProfileBox = styled.div`
  margin:1%;
 `;

 const Layout = styled.div`
 display: flex;
flex-wrap: wrap;
justify-content: center;
 `;

 const Frame = styled.div`
text-align:center;
 `;

function App() {
  const [profiles, setProfiles] = React.useState([]);
  const [search, setSearchCriteria] = React.useState(''); //set it as empty to begin with
  const [endComponent, setEndComponent] =React.useState(5);
  {/*loads in all of the profiles into profile state */}
  React.useEffect(() => {

    const unsubscribe = firebase.firestore()
    .collection('profiles')
    .orderBy("Name")
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

  //this filters the profiles to include only what's in the search bar
  const filteredProfiles = profiles.filter(p=>{
    return p.Name.toLowerCase().indexOf(search) > -1; 
  });


  return (
    <Frame>
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
        {/*search bar to filter desired components*/}
        <Form inline >
          <FormControl type="text" placeholder="Search" onChange ={(e)=> setSearchCriteria(e.target.value.toLowerCase())} />
        </Form>

      </Navbar>

      <Layout>
        {/*create profile is used to create new profiles, designed to look like the rest of components */}
        <ProfileBox key={'add'}>
          <CreateProfile pf={'add'}/>
        </ProfileBox>
        {/*were mapping from filtered profiles which has the search filter applied */}
        {/* slicing allows us to have a load more feature*/}
        {filteredProfiles.slice(0,endComponent).map(pf =>  (
          
          <ProfileBox key={pf.Name}> 
            <ProfileInput pf={pf}/>
          </ProfileBox>

        ))}

      </Layout>
      {/*load more function that allows 5 more profiles to be shown */}
      <Button size="lg" variant="light" onClick={()=> setEndComponent(endComponent+5)}> Load More </Button> 
      
      
    </Frame>
  );
}

export default App;
