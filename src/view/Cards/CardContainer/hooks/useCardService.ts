import {useState, useEffect} from 'react'
import {getCards} from '../../../../service/Cards'
import axios from 'axios'
import { CardModel } from '../../../../domain/card/entity'


export const useCardService = function(): [CardModel[], boolean, boolean]{
    const [cards, setCards] = useState<CardModel[]>([]);
    const [error, setError] = useState(false)
    const [loading, setIsLoading] = useState(true)
  
    useEffect(() => {
      let source = axios.CancelToken.source();
      try {
        setIsLoading(true)  
        getCards(source.token)
          .then(res => setCards(res.data))
  
      } catch(e) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
      
      return () => {
          source.cancel("unmount");
      };
    }, [])
  
    return [cards, error, loading]
  }