import React, { useState, useEffect } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { Add, Delete,Edit } from '@mui/icons-material';

// API endpoint for categories
// ... (import statements)




const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const [newCategory, setNewCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogM, setOpenDialogM] = useState(false);
  const [productId, setProductId] = useState();
  const categoriesEndpoint = 'http://localhost:8800/api/categorie';
  const categoriesEndpointEdit = 'http://localhost:8800/api/categorie/'+productId;

  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch(categoriesEndpoint);
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const addCategory = async () => {
    try {
      const response = await fetch(categoriesEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newCategory }),
      });
      if (response.ok) {
        fetchCategories(); // Refresh categories after adding a new one
        setNewCategory('');
        handleCloseDialog();
      } else {
        // Handle error response, e.g., display an error message to the user
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };



  const editCategory = async () => {
    try {
      const response = await fetch(categoriesEndpointEdit, {
        method: 'PuT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newCategory }),
      });
      if (response.ok) {
        window.location.reload(false)

        fetchCategories(); // Refresh categories after adding a new one
        setNewCategory('');
        handleCloseDialog();
      } else {
        // Handle error response, e.g., display an error message to the user
        console.error('Failed to add category:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };
  // ... (rest of the code remains unchanged)

// ... (rest of the code remains unchanged)

  const deleteCategory = async (categoryId) => {
    try {
      await fetch(`${categoriesEndpoint}/${categoryId}`, {
        method: 'DELETE',
      });
      fetchCategories(); // Refresh categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClickOpenDialogM = () => {
    setOpenDialogM(true);
  };

  const handleCloseDialogM = () => {
    setOpenDialogM(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories on component mount

  return (       
    <>
      <Button variant="outlined" startIcon={<Add />} onClick={handleClickOpenDialog}>
        Ajouter Categorie
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une nouvelle</DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={addCategory} variant="contained" color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDialogM} onClose={handleCloseDialogM}>
        <DialogTitle>Modifier une nouvelle</DialogTitle>
        <DialogContent>
          <TextField
            label={categoriesSelected[0]?.title}
            variant="outlined"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogM}>Annuler</Button>
          <Button onClick={editCategory} variant="contained" color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {categories.map((category) => (
          <ListItem key={category._id}>
            <ListItemText primary={category.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => deleteCategory(category._id)}>
                <Delete />
              </IconButton>
              <IconButton edge="end"  onClick={()=>{setProductId(category._id);handleClickOpenDialogM();setCategoriesSelected(categories.filter((item) => item._id==category._id)) }}>
                <Edit />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const RecentTransactions = () => {
  return (
    <DashboardCard title="Gestion des catégories">
      <CategoryManagement />
      {/* Add your timeline component here */}
    </DashboardCard>
  );
};

export default RecentTransactions;
