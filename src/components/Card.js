import React from 'react';
import styled from 'styled-components';

const CardComponent = styled.li`
    border-bottom: 1px solid #e9e9e7;
    border-radius: 4px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardInput = styled.input`
    border: none;
    font-size: 1rem;
    flex: 4;
`;

const CardOptionsContainer = styled.div`
    display: none;
    justify-content: flex-end;
    flex: 1;
`;

const CardOptions = styled.div`
    margin: 5px;
    cursor: pointer;
`;

const Card = ({card}) => {
    return (
        <CardComponent>
            <CardInput type="text" value={card.data} />
            <CardOptionsContainer>
                <CardOptions><i className="fa fa-check" /></CardOptions>
                <CardOptions><i className="fa fa-times" /></CardOptions>
            </CardOptionsContainer>
        </CardComponent>
    )
};

export default Card;
