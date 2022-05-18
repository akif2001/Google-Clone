import React, { useState } from 'react';

const [arrayValue, setArrayValue] = useState([]);
const [oldArrayValue, setOldArrayValue] = useState([]);

export const useUndo = (value: any) => {
    
}

export const getUndo = (value: any) => {
    let newText = arrayValue.slice(-1);
    return newText;
}
