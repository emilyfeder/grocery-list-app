import React, {useCallback, useEffect,useMemo, useState} from 'react';
import styled from '@emotion/styled';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import { Flex } from '../components';
import { useRootStoreContext } from '../data';


export function NewItemForm() {
    const store = useRootStoreContext();
    const [categoryId, setCategoryId] = useState('default');
    const [item, setItem] = useState('');

    const handleSubmit = useCallback(() => {
        if (!item) return;
        store.addItem(item, categoryId);
    }, [item, categoryId, store]);

    const categories = useMemo(() => {
        return store.categories;
    }, [store.categories]);

    useEffect(() => {
        if (store.defaultCategory) {
            setCategoryId(store.defaultCategory.id);
        }
    }, [store.defaultCategory]);

    return (
        <FormRow>
                <ItemInput
                    onChange={(event) => {
                        setItem(event.target.value);
                    }}
                    label="Item Quanty/Name (Ex. 2 Bell Peppers)"
                    value={item}
                />
                <CategoryInput
                    disabled={!store.initialized}
                    label="Category"
                    value={categoryId}
                    onChange={(event) => {
                       setCategoryId(event.target.value);
                    }}
                    >
                        {categories.map((cat) => {
                            return (
                                <MenuItem key={cat.name} value={cat.id}>{cat.name}</MenuItem>
                            );
                        })}
                    </CategoryInput>
                    <SubmitButton variant="contained" startIcon={<AddIcon/>} onClick={handleSubmit}>Add</SubmitButton>
        </FormRow>
    )
}

const FormRow = styled(Flex)`
    flex-direction: 'row';
    margin: 10px;
`;

const ItemInput = styled(TextField)`
    flex-basis: 50%;
    margin: 10px;
`;

const CategoryInput = styled(Select)`
    flex-basis: 40%;
    margin: 10px;
`;

const SubmitButton = styled(Button)`
    flex-basis: 10%;
    margin: 10px;
`;

