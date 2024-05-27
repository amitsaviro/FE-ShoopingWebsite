import React, { useState, useEffect, useContext } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const SearchBar = () => {
    const { items } = useContext(ShopContext);
    const [filteredItems, setFilteredItems] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (value) => {
        setInput(value);
        if (value === "") {
            setFilteredItems([]);
        } else {
            const filtered = items.filter(item =>
                item.itemName.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    };

    const handleSearch = () => {
      if (filteredItems.length === 0) {
            alert("No Results");
            setInput("");
        } else {
            navigate(`/search-results/${input.trim()}`);
            setInput("");
            setFilteredItems([]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleItemClick = (itemId) => {
        navigate(`/product/${itemId}`);
        setInput("");
        setFilteredItems([]);
    };

    return (
        <div className="searchBar">
            <div className="input-wrapper">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Type to search..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className="search-button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            {(input !== "" && filteredItems.length === 0) && (
                <div className="no-results">No Results</div>
            )}
            {filteredItems.length > 0 && (
                <div className="search-results">
                    {filteredItems.map(item => (
                        <div 
                            key={item.itemId} 
                            className="search-item" 
                            onClick={() => handleItemClick(item.itemId)}
                        >
                            {item.itemName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
