import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const ProductPerformance = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/recl');
        setProducts(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits', error);
      }
    };

    fetchProducts();
  }, []);
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/api/recl/${productId}`);
      loadProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };
  const [show, setShow] = useState(false);

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/recl');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };
  const [answer, setAnswer] = useState();
  const [selected, setSelected] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addAnswer = async (productId) => {
    try {
      const response = await axios.put(`http://localhost:8800/api/recl/${selected}`, {
        answer: answer,
      });
      loadProducts();
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };
  return (
    <DashboardCard title="Réclamations">
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitre">
              <Form.Control
                type="text"
                placeholder="Entrez le titre"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={addAnswer}>
              Répondre
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Client
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Titre
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Reponse
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.userProfil?.firstname}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {product.title}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="body2">{product.Description}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {product.answer != null ? product.answer : 'vide'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                    Supprimer
                  </Button>
                  <Button
                    style={{ marginLeft: '5px' }}
                    onClick={() => {
                      handleShow();
                      setSelected(product._id);
                    }}
                  >
                    Repondre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
