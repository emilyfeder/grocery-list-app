import { useEffect, useState } from 'react';
import { listCategories, listItems, postItem, postMarkItemComplete, postMarkItemUncomplete } from './serverActions';

async function getInitialData() {
    const [categories_result, list_items_result] = await Promise.all([
        listCategories(),
        listItems()
    ]);
    return {
        categories: categories_result.categories,
        listItems: list_items_result.items
    };
}

export function useRootStore() {
    const [initialized, setInitialized] = useState(false);
    const [categories, setCategories] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState(null);

    useEffect(() => {
        getInitialData().then(result => {
            setCategories(result.categories);
            setDefaultCategory(result.categories.find((cat) => cat.name === 'other'));
            setListItems(result.listItems);
            setInitialized(true);
        });
    }, []);

    const replaceItem = (replacementItem) => {
        setListItems(listItems.map((item) => {
            if (replacementItem.id === item.id) {
                return replacementItem;
            } else {
                return item;
            }
        }));
    }

    const addItem = async (text, categoryId) => {
        let quantity;
        const quantityMatch = text.match(/^([\d]{1,5})\s*\b(.*)/);
        if (quantityMatch) {
            quantity = parseInt(quantityMatch[1]);
            text = quantityMatch[2]
        }
        const name = text.trim();
        const result = await postItem({name, categoryId, quantity});
        if (result.newItem) {
            setListItems([...listItems, result.newItem]);
        } else if (result.existingItem) {
            replaceItem(result.existingItem)
        }
    }

    const getCategoryById = (categoryId) => {
        return categories.find((cat) => cat.id === categoryId);
    }

    const markItemComplete = async (itemId) => {
        const result = await postMarkItemComplete(itemId);
        if (result.item) {
            replaceItem(result.item);
        }
    }

    const markItemUncomplete = async (itemId) => {
        const result = await postMarkItemUncomplete(itemId);
        if (result.item) {
            replaceItem(result.item);
        }
    }

    return {
        initialized,
        categories,
        listItems,
        defaultCategory,
        addItem,
        getCategoryById,
        markItemComplete,
        markItemUncomplete
    }
}