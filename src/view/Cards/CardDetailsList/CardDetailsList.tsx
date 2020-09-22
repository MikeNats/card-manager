import React from 'react';
import CardDetails from '../CardDetails/CardDetails'
import {CardDetailsListProps} from './types'

const CardDetailsList = ({cardCollection}: CardDetailsListProps) =>
  (<section className="comp-card-details-list">      
      {cardCollection.map(card => 
        <li key={card.id} >
          <CardDetails
          cardData={card}/></li>)}
  </section>)
 
export default React.memo(CardDetailsList)