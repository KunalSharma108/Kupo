import React from 'react';

const MainDashboard = (): React.JSX.Element => {
  return (
    <main className="dashboard-main">
      <section className="section-block fade-in">
        <h2>Home Section</h2>
        <button className="dashboard-btn">↑</button>
        <button className="dashboard-btn">↓</button>
      </section>

      <section className="section-block fade-in">
        <h2>About Section</h2>
        <button className="dashboard-btn">↑</button>
        <button className="dashboard-btn">↓</button>
      </section>

      <section className="section-block fade-in">
        <h2>Projects Section</h2>
        <button className="dashboard-btn">↑</button>
        <button className="dashboard-btn">↓</button>
      </section>
    </main>
  );
};

export default MainDashboard;