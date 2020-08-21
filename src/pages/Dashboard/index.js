import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [changes, setChanges] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getFoodList();
  }, [changes]);

  /**
   * Request food list from server and updates it.
   */
  async function getFoodList() {
    await api.get('foods').then(response => {
      setFoods(response.data);
    });
  }

  /**
   * Add a new food in the server's food list.
   * @param {Object} food Object that represents a food from the food list.
   */
  async function handleAddFood(food) {
    try {
      await api.post('foods', food).then(() => {
        setChanges(!changes);
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Changes informations about a food and stores the changes in the server.
   * @param {Object} food Object that represents a food from the food list.
   */
  async function handleUpdateFood(food) {
    await api
      .patch(`foods/${editingFood}`, food)
      .then(() => {
        setChanges(!changes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Delete a food from the server's food list.
   * @param {number} id Food's identification number.
   */
  async function handleDeleteFood(id) {
    await api.delete(`foods/${id}`).then(() => {
      setChanges(!changes);
    });
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  async function handleEditFood(food) {
    setEditingFood(food.id);
  }

  /**
   * Redirects the page to the FoodDetails page.
   * @param {number} id Food's identification number.
   */
  function handleRouting(id) {
    history.push(`/fooddetails/${id}`);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              openModal={toggleEditModal}
              routing={handleRouting}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
