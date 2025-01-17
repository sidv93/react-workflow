import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { getCards } from '../common/utils';

const ListComponent = styled.div`
    box-shadow: -1px 0px 5px 1px rgba(179,179,179,1);
    min-width: 300px;
    margin: 20px;
`;

const ListHeader = styled.div`
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
`;

const HeaderOptionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const HeaderOptions = styled.div`
    margin: 0 10px;
    cursor: pointer;
`

const HorizontalLine = styled.hr`
    border: 1px solid #1a1a1a;
    width: 70%;
    text-align: center;
`;

const CardListContainer = styled.div`
    border: 1px solid #e9e9e7;
    border-radius: 4px;
    height: 25vh;
    margin: 20px;
`;

const OrderedList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0;
`;

const List = ({list, deleteList}) => {
    const [cards, setCards] = useState([]);
    useEffect(() => {
        const fetchCards = async () => {
            if(!list) {
                return;
            }
            const response = await getCards({listId: list.id});
            console.log('cards', response);
            if(response.status === 'success') {
                setCards(response.data);
            }
        }
        fetchCards();
    }, [list])
    return (
        <ListComponent>
            <ListHeader>
                <h3>{list.name}</h3>
                <HeaderOptionsContainer>
                    <HeaderOptions><i className="fa fa-plus-square" /></HeaderOptions>
                    <HeaderOptions onClick={() => deleteList({listId: list.id})}><i className="fa fa-trash" /></HeaderOptions>
                </HeaderOptionsContainer>
            </ListHeader>
            <HorizontalLine />
            <CardListContainer>
                <OrderedList>
                    {
                        cards.map(card => <Card card={card} key={card.id} />)
                    }
                </OrderedList>
            </CardListContainer>
        </ListComponent>
    )
};

export default List;

