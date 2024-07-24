import { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const SearchComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { url, token } = useContext(StoreContext);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${url}/api/food/search?query=${searchQuery}`
      );
      console.log(response.data)
      onSearch(response.data); // Pass search results to parent component
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder='Search for products...'
      />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchComponent;
