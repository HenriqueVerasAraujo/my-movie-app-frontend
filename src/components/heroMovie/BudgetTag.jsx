import React, { useState, useEffect } from 'react'


export default function BudgetTag({ cost, back }) {
  const [costValue, setCostValue] = useState('N/A');
  const [backValue, setBackValue] = useState('N/A');

  const formatValue = (value) => {
    const original = value;

    if (original.toString().length < 7) {
      const newValue = (original/1000).toFixed(0);
      return `${newValue} Thousand Dollars`
    }
    if (original.toString().length >= 10 ) {
    const newValue = (original/1000000000).toFixed(2);
    console.log(original);
    return `${newValue} Billion Dollars`
  }
    if (original.toString().length > 7 || original.toString().length < 9) {
      const newValue = (original/1000000).toFixed(0);
      return `${newValue} Million Dollars`
  }
}

  useEffect(() => {
    if (cost !== 0) {
      setCostValue(formatValue(cost));
    }
    if (back !== 0) {
      setBackValue(formatValue(back));
    }
  }, []);

  return (
    <div className='text-white text-lg flex flex-col items-center'>
      <div className='mb-7 flex flex-col items-center'>
        <h1 className='font-bold'>Production cost:</h1>
        <h1 className='opacity-80'>{costValue}</h1>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='font-bold'>Revenue:</h1>
        <h1 className='opacity-80'>{backValue}</h1>
      </div>
    </div>
  )
}
