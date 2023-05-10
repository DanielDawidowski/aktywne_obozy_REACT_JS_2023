import Layout from "@components/layout/Layout";
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <Layout>
      <section id="admin" className="admin">
        <aside className="admin__nav">
          <nav>
            <ul>
              <li style={{ marginBottom: "30px" }}>
                <Link to="/admin/events">Stwórz wyjazd</Link>
              </li>
              <li style={{ marginBottom: "30px" }}>
                <Link to="/admin/clients">Zgłoszenia</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="admin__main"></main>
      </section>
    </Layout>
  );
}

export default AdminDashboard;
