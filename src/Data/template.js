import React from 'react';

function Template() {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif", backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '10px' }}>
      <h1 style={{ color: '#2a4365', textAlign: 'center', margin: '0 0 20px' }}>Welcome to Our Website</h1>
      <form style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#2a4365', marginBottom: '5px', display: 'block' }} htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e0' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#2a4365', marginBottom: '5px', display: 'block' }} htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e0' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ color: '#2a4365', marginBottom: '5px', display: 'block' }} htmlFor="message">Message:</label>
          <textarea id="message" name="message" style={{ padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #cbd5e0', height: '100px' }}></textarea>
        </div>
        <button type="submit" style={{ backgroundColor: '#2b6cb0', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '16px' }}>Submit</button>
      </form>
    </div>
  );
}

export default Template;