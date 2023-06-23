import Layout from "@components/layout/Layout";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "@pages/admin/AdminStyles.scss";

function AdminDashboard() {
  return (
    <Layout>
      <section id="admin" className="admin container">
        <aside className="admin__nav">
          <nav>
            <ul>
              <li style={{ marginBottom: "30px" }}>
                <Link to="/admin/event/create">Stwórz wyjazd</Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to="/admin/clients">Zgłoszenia</Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to="/admin/events/list">Wyjazdy</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="admin__main">
          <Outlet />
        </main>
      </section>
    </Layout>
  );
}

export default AdminDashboard;
