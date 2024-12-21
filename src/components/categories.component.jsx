import "./categories.component.css";

function Categories({ categories }) {
  return (
    <div className="categories-container" key={categories.id}>
      <div
        className="background-img"
        style={{ backgroundImage: `url(${categories.imageUrl})` }}
      />
      <div className="category-text">
        <h2>{categories.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
}

export default Categories;
