import Categories from "../components/categories.component";

function Directory({ categories }) {
  return (
    <div className="categories">
      {categories.map((category) => {
        return <Categories categories={category} />;
      })}
    </div>
  );
}

export default Directory;
