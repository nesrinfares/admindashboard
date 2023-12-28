import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const TypographyPage = () => {
  const [users, setUsers] = useState([]);
  const [usersSelected, setUsersSelected] = useState([]);
  const [show, setShow] = useState(false);
  const [showM, setShowM] = useState(false);
  const [selectedId, setSelectedId] = useState();


  const [newUser, setNewUser] = useState({
    nom: undefined,
    prenom: undefined,
    mobile: undefined,
    adresse: undefined,
    photo: null,
    email: undefined,
    motDePasse: undefined,
    role:undefined
  });
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setNewUser({ ...newUser, photo: reader.result })
       
    };
    reader.onerror=error =>{
        console.log("Erroe: ",error);
    }

}
  useEffect(() => {
    loadUsers();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);


  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/users');
      setUsers(response.data.filter((item) => item.role=="user" || item.role=="agent"));
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const formData = new FormData();
      Object.keys(newUser).forEach((key) => {
        formData.append(key, newUser[key]);
      });

      await axios.post('http://localhost:8800/api/auth/register', {
        "firstname":newUser.nom,
        'lastname': newUser.prenom,
        'email': newUser.email,
        'adresse': newUser.adresse,
        'tel': newUser.mobile,
        'role':newUser.role,
        'image': newUser.photo,
        'password':newUser.motDePasse
      });

      setNewUser({
        nom: '',
        prenom: '',
        mobile: '',
        adresse: '',
        photo: null,
        email: '',
        motDePasse: ''
      });

      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
  };

  const handleModifierUser = async (e) => {
    try {
      
      const formData = new FormData();
      Object.keys(newUser).forEach((key) => {
        formData.append(key, newUser[key]);
      });

      await axios.put('http://localhost:8800/api/users/'+selectedId, {
        "firstname":newUser.nom,
        'lastname': newUser.prenom,
        'email': newUser.email,
        'adresse': newUser.adresse,
        'tel': newUser.mobile,
        'role':newUser.role,
        'image': newUser.photo,
        'password':newUser.motDePasse
      });

      setNewUser({
        nom: '',
        prenom: '',
        mobile: '',
        adresse: '',
        photo: null,
        email: '',
        motDePasse: ''
      });
      window.location.reload(false)

      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${userId}`);
      loadUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un utilisateur
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le nom"
                value={newUser.nom}
                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le prénom"
                value={newUser.prenom}
                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le numéro de mobile"
                value={newUser.mobile}
                onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez l'adresse"
                value={newUser.adresse}
                onChange={(e) => setNewUser({ ...newUser, adresse: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept='image/*'
                onChange={convertToBase64} 
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrez l'email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formMotDePasse">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Entrez le mot de passe"
                value={newUser.motDePasse}
                onChange={(e) => setNewUser({ ...newUser, motDePasse: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option >Sélectionnez une catégorie</option>
                
                  <option  value="agent">
                    agent
                  </option>
                  <option  value="user">
                    client
                  </option>
               
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleCreateUser}>
              Créer un utilisateur
            </Button>
          </Form>
        </Modal.Body>   
      </Modal>


      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNom">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                placeholder={usersSelected[0]?.firstname}
                value={newUser.nom}
                onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPrenom">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                placeholder={usersSelected[0]?.lastname}
                value={newUser.prenom}
                onChange={(e) => setNewUser({ ...newUser, prenom: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="number"
                placeholder={usersSelected[0]?.tel}
                value={newUser.mobile}
                onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formAdresse">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                placeholder={usersSelected[0]?.adresse}
                value={newUser.adresse}
                onChange={(e) => setNewUser({ ...newUser, adresse: e.target.value })}
              />
            </Form.Group>
           
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={usersSelected[0]?.email}
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </Form.Group>
            
           
            <Button style={{marginTop:4,marginBottom:2}} variant="primary" onClick={handleModifierUser}>
              Modifier utilisateur
            </Button>
          </Form>
        </Modal.Body>   
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Adresse</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.tel}</td>
              <td>{user.adresse}</td>
              <td>{user.role}</td>
              
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                  Supprimer
                </Button>
                <Button onClick={()=>{setSelectedId(user._id);handleShowM();setUsersSelected(users.filter((item) => item._id==user._id)) }} style={{marginLeft:8}} variant="info" >
                  Modifier
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TypographyPage;
