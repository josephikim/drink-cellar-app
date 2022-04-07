import React from 'react';
import { Space, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { addDrink } from '../../store/userSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';

import './SearchResults.css';

const { Meta } = Card;

const SearchResults: React.FC = () => {
  const dispatch = useAppDispatch();

  const searchResults = useAppSelector((state) => state.user.searchResults);

  const handleAdd = (event): void => {
    const drinkId = event.currentTarget.id;
    if (!drinkId) return;

    dispatch(addDrink(drinkId));
  };

  return (
    <div className="SearchResults">
      <Space wrap align="start" size="middle" style={{ display: 'flex' }}>
        {searchResults
          ? searchResults.map((result) => {
              return (
                <Card
                  key={result.idDrink}
                  id={result.idDrink}
                  style={{ width: 300 }}
                  cover={<img alt="example" src={result.strDrinkThumb} />}
                  actions={[<PlusOutlined key="add" id={result.idDrink} onClick={(event) => handleAdd(event)} />]}
                >
                  <Meta key={result.idDrink} title={result.strDrink} description={result.strInstructions} />
                </Card>
              );
            })
          : null}
      </Space>
    </div>
  );
};

export default SearchResults;