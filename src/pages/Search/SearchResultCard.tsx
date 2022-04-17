import React from 'react';
import { Col, Card } from 'react-bootstrap';

import { addDrink } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISearchResult } from '../../types';

import './SearchResultCard.css';

interface SearchResultCardProps {
  data: ISearchResult;
}

const SearchResultCard: React.FC<SearchResultCardProps> = (props) => {
  const dispatch = useAppDispatch();
  const drinks = useAppSelector((state) => state.user.drinks);

  const handleAdd = (event: React.MouseEvent<HTMLElement>): void => {
    const idDrink = event.currentTarget.id;
    if (!idDrink) return;

    dispatch(addDrink(idDrink));
  };

  const matchesSavedDrink = drinks.some((savedDrink) => savedDrink.idDrinkApi === props.data.idDrink);

  return (
    <Col className="SearchResultCard">
      <Card>
        <Card.Img variant="top" src={props.data.strDrinkThumb} />
        <Card.Body id="description">
          <Card.Title>{props.data.strDrink}</Card.Title>
          <Card.Text>{props.data.strInstructions}</Card.Text>
        </Card.Body>
        <Card.Body id="actions">
          {matchesSavedDrink ? (
            <Card.Text>Added</Card.Text>
          ) : (
            <Card.Link id={props.data.idDrink} onClick={(e: React.MouseEvent<HTMLElement>) => handleAdd(e)}>
              Add to collection
            </Card.Link>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SearchResultCard;
