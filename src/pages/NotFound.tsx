import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="app">
      <section className="card">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </section>
    </main>
  );
}
