function HomePage() {
  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 600, margin: '80px auto', padding: '0 20px' }}>
      <h1>Medical Laboratory Equipment Management System</h1>
      <p>
        A platform for managing laboratory equipment reservations, tracking equipment
        status, and providing role-based access for lab technicians and administrators.
      </p>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Backend API health check: <code>/api/health</code>
      </p>
    </div>
  );
}

export default HomePage;
