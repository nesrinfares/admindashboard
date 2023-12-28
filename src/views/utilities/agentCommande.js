import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const TypographyPage = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    loadCommandes();
  }, []);

  const updateCommandes = async (id, statut) => {
    let today = new Date();

    let date = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getFullYear();
    try {
      await axios.put('http://localhost:8800/api/basket/' + id, {
        statut: statut,
        date: date,
      });
      loadCommandes();
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  const deleteCommandes = async (id) => {
    try {
      await axios.delete('http://localhost:8800/api/basket/' + id);
      loadCommandes();
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  const loadCommandes = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/basket');
      setCommandes(response.data.reverse());
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs', error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client Nom</th>
            <th>Client Prénom</th>

            <th>Produit</th>
            <th>Statut</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((item) => (
            <tr key={item._id}>
              <td>{item.userProfil?.firstname}</td>
              <td>{item.userProfil?.lastname}</td>

              <td>{item.productSelected?.productName}</td>
              <td>{item.statut}</td>

              <td>
                <Button
                  onClick={() => {
                    updateCommandes(item._id, 'acceptee');
                  }}
                  style={{ marginRight: 8 }}
                  variant="info"
                >
                  Accepter
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteCommandes(item._id);
                  }}
                >
                  Annuler
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
