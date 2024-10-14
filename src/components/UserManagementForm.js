import React from 'react';

const UserManagementForm = ({ header, fields, formValues, setFormValues, onSave, onClear }) => {

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={onSave}>
      <h3>{header}</h3>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formValues[field.name] || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="submit" onClick={onSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Save
        </button>
        <button type="button" onClick={onClear} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
          Clear
        </button>
      </div>
    </form>
  );
};

export default UserManagementForm;