import React from 'react';
import { Row, Col, Badge, Image, Button } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../hooks';
import { getRandomDrink } from '../store/baseSlice';
import DrinkTags from './DrinkTags';
import DrinkIngredients from './DrinkIngredients';
import DrinkInstructions from './DrinkInstructions';

import '../styles/RandomDrink.css';

const RandomDrink: React.FC = () => {
  const dispatch = useAppDispatch();
  const drink = useAppSelector((state) => state.base.randomDrink);

  const isDrinkLoaded = drink && drink.idDrink;

  const drinkIncludesCategory = drink.strCategory && drink.strCategory.length > 0;
  const drinkIncludesTags = drink.strTags && drink.strTags.length > 0;

  const handleClick = () => {
    dispatch(getRandomDrink());
  };

  const renderContent = () => {
    if (isDrinkLoaded) {
      return (
        <>
          <Row>
            <Col>
              <h4>{drink.strDrink}</h4>
            </Col>
          </Row>

          <Row>
            <Col>
              <Image src={drink.strDrinkThumb} rounded />
            </Col>
          </Row>

          {drinkIncludesCategory ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h5>Category</h5>
                </Col>
                <Col md={5}>{drink.strCategory ? <Badge bg="success">{drink.strCategory}</Badge> : null}</Col>
              </div>
            </Row>
          ) : null}

          <Row>
            <div className="flex-container">
              <Col md={7}>
                <h5>Alcohol Content</h5>
              </Col>
              <Col md={5}>{drink.strAlcoholic ? <Badge bg="success">{drink.strAlcoholic}</Badge> : null}</Col>
            </div>
          </Row>

          {drinkIncludesTags ? (
            <Row>
              <div className="flex-container">
                <Col md={7}>
                  <h5>IBA Tags</h5>
                </Col>
                <Col md={5}>
                  <DrinkTags tags={drink.strTags as string} />
                </Col>
              </div>
            </Row>
          ) : null}

          <Row>
            <div className="flex-container">
              <Col md={7}>
                <h5>Serving Glass</h5>
              </Col>
              <Col md={5}>{drink.strGlass}</Col>
            </div>
          </Row>

          <h5>Ingredients</h5>

          <Row>
            <Col>
              <DrinkIngredients data={drink} />
            </Col>
          </Row>

          <h5>Instructions</h5>

          <Row>
            <Col>
              <DrinkInstructions text={drink.strInstructions as string} />
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <Row>
          <Col>
            <h5>Loading drink...</h5>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div className="RandomDrink">
      <Row>
        <div className="flex-container">
          <Col>
            <h5>Random Drink</h5>
          </Col>
          <Col>
            <Button onClick={handleClick} className="flex-container-btn" variant="primary">
              Randomize
            </Button>
          </Col>
        </div>
      </Row>
      {renderContent()}
    </div>
  );
};

export default RandomDrink;
