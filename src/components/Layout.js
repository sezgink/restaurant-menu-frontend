// /components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="admin-panel">
      <nav>
        <Link href="/admin/restaurants">Restaurants</Link>
        <Link href="/admin/categories">Categories</Link>
        <Link href="/admin/products">Products</Link>
      </nav>
      <div className="content">{children}</div>
    </div>
  );
}
