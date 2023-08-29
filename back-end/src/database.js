const knex = require('knex');
const { database } = require('./config');

const db = knex({
  client: 'mysql2',
  connection: database,
});

async function listCategories(limit = 100) {
  return db.select('*').from('categories').limit(limit);
}

async function getCategoryById(categoryId) {
  const rows = await db.select('*').from('categories').where('id', categoryId);
  if (!rows.length) {
    throw new Error(`Category with id ${categoryId} does not exist`);
  }
  return rows[0];
}

async function getItemById(itemId) {
  const rows = await db.select('*').from('items').where('id', itemId);
  if (!rows.length) {
    throw new Error(`IZtem with id ${itemId} does not exist`);
  }
  return rows[0];
}

async function getItemByName(name, completed = 0) {
  const rows = await db.select('*').from('items').where('name', name).where('completed', completed);
  return rows.length ? rows[0] : null;
}

async function updateItemById(id, updateFields) {
  return db('items').where('id', id).update(updateFields);
}

async function addItem({name, categoryId, quantity}) {
  await getCategoryById(categoryId);
  const existingItem = await getItemByName(name, 0);
  let itemId;
  if (existingItem) {
    await db('items').where('name', name).update({categoryId, quantity});
    return {
      existingItem: await getItemById(existingItem.id)
    }
  } else {
    const result = await db('items').insert({
      name,
      categoryId,
      quantity: quantity ?? null
    });
    itemId = result[0];
  }
  return {
    newItem: await getItemById(itemId)
  };
}

async function markItemComplete(itemId) {
  return updateItemById(itemId, {completed: 1});
}

async function markItemUncomplete(itemId) {
  return updateItemById(itemId, {completed: 0});
}

async function listItems(limit = 500) {
  return db.select('*').from('items').limit(limit);
}

module.exports = {
  addItem,
  getCategoryById,
  getItemById,
  listCategories,
  listItems,
  markItemComplete,
  markItemUncomplete
};