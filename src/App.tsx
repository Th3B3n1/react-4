import './App.css'
import { useState } from 'react';

interface Item {
  id: number;
  name: string;
}

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [editItemName, setEditItemName] = useState('');

  // Add new item
  const addItem = () => {
    if (newItem.trim() === '') return;
    setItems([...items, { id: Date.now(), name: newItem }]);
    setNewItem('');
  };

  // Delete item by id
  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Edit item by id
  const editItem = (id: number) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItemId(id);
      setEditItemName(itemToEdit.name);
    }
  };

  // Save edited item
  const saveItem = () => {
    if (editItemId !== null && editItemName.trim() !== '') {
      setItems(
        items.map((item) =>
          item.id === editItemId ? { ...item, name: editItemName } : item
        )
      );
      setEditItemId(null);
      setEditItemName('');
    }
  };

  return (
    <div className="container my-4">
      <h1>Array CRUD App</h1>

      {/* Add New Item */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
      </div>

      {/* Edit Item */}
      {editItemId !== null && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Edit Item"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />
          <button className="btn btn-success" onClick={saveItem}>
            Save Item
          </button>
        </div>
      )}

      {/* Item List */}
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.name}
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => editItem(item.id)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;