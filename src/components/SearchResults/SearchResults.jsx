import React, { useState, useEffect } from "react";
import "./SearchResults.css";
import { getAllItems } from "../services/itemApi";
import Item from "../Item/Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { spiral } from 'ldrs';
import {useParams} from 'react-router-dom'


spiral.register();

const SearchResults = () => {
    const { searchValue } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [imageMap, setImageMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchSearchResults();
    }, [searchValue]);

    const fetchSearchResults = async () => {
        try {
            const response = await getAllItems();
            if (response.data && response.data.length > 0) {
                preloadImages(response.data);
                setSearchResults(response.data.filter(item =>
                    item.itemName.toLowerCase().includes(searchValue.toLowerCase())
                ));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(true);
        }
    };

    const preloadImages = (items) => {
        const imageImports = items.map(item => import(`../../Assets/${item.imgUrl}`).then(image => ({ [item.imgUrl]: image.default })));
        Promise.all(imageImports).then(images => {
            const imageObject = Object.assign({}, ...images);
            setImageMap(imageObject);
        });
    };

    return (
        <div className="searchResults">
            <h1>"{searchValue}" search...</h1>
            <hr />
            {loading && (
                <div className="loading-overlay">
                    <l-spiral size="200" speed="1.2" color="red" className="loading-spinnerIM"></l-spiral>
                </div>
            )}
            <div className="content">
                <div className="index-sort">
                    <p>
                        <span> Showing 1-{searchResults.length} </span> Out Of {searchResults.length} Products
                    </p>
                    <div className="sort-icon">
                        Sort by <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                </div>
                <div className="searchResults-products">
                    {searchResults.map((item, i) => (
                        <Item key={i} id={item.itemId} name={item.itemName} imgUrl={imageMap[item.imgUrl]} price={item.price} oldPrice={item.oldPrice} category={item.category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
