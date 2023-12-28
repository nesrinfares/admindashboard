import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import axios from 'axios';

const Shadow = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [productsSelected, setProductsSelected] = useState([]);
  const [showM, setShowM] = useState(false);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);

  const [newProduct, setNewProduct] = useState({
    titre: undefined,
    image: undefined,
    prix: undefined,
    description: undefined,
    quantite: undefined,
    color: undefined,
    category: undefined,
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setNewProduct({ ...newProduct, image: reader.result });
    };
    reader.onerror = (error) => {
      console.log('Erroe: ', error);
    };
  }

  const loadProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/categorie');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();

      formData.append('productName', newProduct.titre);
      formData.append('price', newProduct.prix);
      formData.append('description', newProduct.description);
      formData.append('quantite', newProduct.quantite);
      formData.append('color', newProduct.color);

      if (newProduct.category) {
        formData.append('productCategory', newProduct.category);
      }

      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      await axios.post('http://localhost:8800/api/product', {
        productName: newProduct.titre,
        price: newProduct.prix,
        description: newProduct.description,
        quantite: newProduct.quantite,
        color: newProduct.color,

        productCategory: newProduct.category,
        image: newProduct.image,
      });

      setNewProduct({
        productName: '',
        image: null,
        price: 0,
        description: '',
        quantite: 0,
        color: '',
        productCategory: '',
      });

      loadProducts();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);
    }
  };

  const handleModifierProduct = async () => {
    try {
      const formData = new FormData();

      formData.append('productName', newProduct.titre);
      formData.append('price', newProduct.prix);
      formData.append('description', newProduct.description);
      formData.append('quantite', newProduct.quantite);
      formData.append('color', newProduct.color);

      if (newProduct.category) {
        formData.append('productCategory', newProduct.category);
      }

      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }

      await axios.put('http://localhost:8800/api/product/' + selectedId, {
        productName: newProduct.titre,
        price: newProduct.prix,
        description: newProduct.description,
        quantite: newProduct.quantite,
        color: newProduct.color,
        productCategory: newProduct.category,
        image: newProduct.image,
      });

      setNewProduct({
        productName: '',
        image: null,
        price: 0,
        description: '',
        quantite: 0,
        color: '',
        productCategory: '',
      });
      window.location.reload(false);
      loadProducts();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création du produit', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/api/product/${productId}`);
      loadProducts();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitre">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrez le titre"
                value={newProduct.titre}
                onChange={(e) => setNewProduct({ ...newProduct, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={convertToBase64} />
            </Form.Group>
            <Form.Group controlId="formPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez le prix"
                value={newProduct.prix}
                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Entrez la description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formQuantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                placeholder="Entrez la quantité"
                value={newProduct.quantite}
                onChange={(e) => setNewProduct({ ...newProduct, quantite: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formQuantite">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="string"
                placeholder="Entrez la color"
                value={newProduct.color}
                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleCreateProduct}>
              Créer un produit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitre">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                placeholder={productsSelected[0]?.productName}
                value={newProduct.titre}
                onChange={(e) => setNewProduct({ ...newProduct, titre: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={convertToBase64} />
            </Form.Group>
            <Form.Group controlId="formPrix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder={productsSelected[0]?.price}
                value={newProduct.prix}
                onChange={(e) => setNewProduct({ ...newProduct, prix: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={productsSelected[0]?.description}
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formQuantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                placeholder={productsSelected[0]?.quantite}
                value={newProduct.quantite}
                onChange={(e) => setNewProduct({ ...newProduct, quantite: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formcolor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="string"
                placeholder={productsSelected[0]?.color}
                value={newProduct.color}
                onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleModifierProduct}>
              Modifier un produit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Image</th>
            <th>Prix</th>
            <th>Description</th>
            <th>Quantité</th>
            <th>Color</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productName}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.titre}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.quantite}</td>
              <td>{product.color}</td>
              <td>{product.productCategory ? product.productCategory.title : 'N/A'}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                  Supprimer
                </Button>
                <Button
                  onClick={() => {
                    setSelectedId(product._id);
                    handleShowM();
                    setProductsSelected(products.filter((item) => item._id == product._id));
                  }}
                  style={{ marginLeft: 8 }}
                  variant="info"
                >
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

export default Shadow;
