import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BlogType } from "../actions/BlogActionTypes";
import { RootStore } from "../Store";

function Search() {
  const [searchResult, setSearchResult] = useState<any>();

  const blogState = useSelector((state: RootStore) => state.blogs);

  const { blogs } = blogState;

  const handleSearchText = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setSearchResult([]);
    } else {
      blogs &&
        setSearchResult(
          blogs.filter((blog: BlogType) =>
            blog.title.toLowerCase().includes(event.target.value.toLowerCase())
          )
        );
    }
  };

  return (
    <div className="search">
      <input type="text" onChange={handleSearchText} />
      {searchResult?.length > 0 && (
        <div className="search-list">
          {searchResult?.length > 0 &&
            searchResult.map((search: BlogType) => (
              <Link to={`/blogs/${search._id}`} key={search._id}>
                <div className="search-card">
                  <h4>{search.title}</h4>
                  <small>{search._user.name}</small>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default Search;
