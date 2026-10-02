import React, { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    occupation: '',
    bloodGroup: 'A+',
    ward: 'B'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label className="form-label block mb-1">Full Name</label>
        <input type="text" name="name" className="form-input w-full p-2 border" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group mb-3">
        <label className="form-label block mb-1">Phone</label>
        <input type="tel" name="phone" className="form-input w-full p-2 border" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="form-group mb-3">
        <label className="form-label block mb-1">Address</label>
        <input type="text" name="address" className="form-input w-full p-2 border" value={formData.address} onChange={handleChange} required />
      </div>
      <div className="form-group mb-3">
        <label className="form-label block mb-1">Occupation</label>
        <input type="text" name="occupation" className="form-input w-full p-2 border" value={formData.occupation} onChange={handleChange} required />
      </div>
      <div className="form-group mb-3">
        <label className="form-label block mb-1">Blood Group</label>
        <select name="bloodGroup" className="form-select w-full p-2 border" value={formData.bloodGroup} onChange={handleChange}>
          {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>
      </div>
      <div className="form-group mb-4">
        <label className="form-label block mb-1">Ward</label>
        <select name="ward" className="form-select w-full p-2 border" value={formData.ward} onChange={handleChange}>
          <option value="A">Ward A</option>
          <option value="B">Ward B</option>
          <option value="C">Ward C</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-full p-2" style={{ backgroundColor: 'var(--primary)', color: '#fff' }}>Continue</button>
    </form>
  );
};

export default RegisterForm;
