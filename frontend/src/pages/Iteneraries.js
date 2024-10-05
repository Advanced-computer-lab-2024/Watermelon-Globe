// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Itineraries = () => {
//     const [itineraries, setItineraries] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 5;
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/allItineraries');
//                 const data = await response.json();
//                 if (response.ok) {
//                     setItineraries(data);
//                 } else {
//                     console.error("Failed to fetch itineraries:", data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching itineraries:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleClick = (id) => {
//         navigate(`/itineraryDetails/${id}`);
//     };

//     const currentItineraries = itineraries.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
//     const totalPages = Math.ceil(itineraries.length / itemsPerPage);

//     const handleNext = () => {
//         if (currentPage < totalPages - 1) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevious = () => {
//         if (currentPage > 0) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     return (
//         <div className="itineraries">
//             <div className="itinerary-container">
//                 {currentItineraries.length > 0 ? (
//                     currentItineraries.map((itinerary) => (
//                         <div key={itinerary._id} className="req" onClick={() => handleClick(itinerary._id)}>
//                             <div className="req-img-container">
//                                 {/* <img src={itinerary.image || '/default-image.jpg'} alt={itinerary.name} className="req-img" /> */}
//                             </div>
//                             <div className="req-info">
//                                 <div className="req-org-name">
//                                     <p>{itinerary.name}</p>
//                                     <button>More Info</button>
//                                 </div>
//                                 <hr />
//                                 <p className="req-desc">{itinerary.description}</p>
//                                 <p className="req-type">{itinerary.type}</p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No itineraries found.</p>
//                 )}
//             </div>
//             <div className="pagination">
//                 <button className="arrow-button" onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
//                 <span> Page {currentPage + 1} of {totalPages} </span>
//                 <button className="arrow-button" onClick={handleNext} disabled={currentPage >= totalPages - 1}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default Itineraries;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Itineraries = () => {
    const [itineraries, setItineraries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const [minPrice, setMinPrice] = useState(100); // Default min price
    const [maxPrice, setMaxPrice] = useState(100000); // Default max price
    const navigate = useNavigate();

    useEffect(() => {
        fetchItineraries(minPrice, maxPrice); // Initial fetch with default price range
    }, []);

    const fetchItineraries = async (minPrice, maxPrice) => {
        try {
            const response = await fetch(`/itineraryFilterBudget?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            const data = await response.json();
            if (response.ok) {
                setItineraries(data); // Set the fetched itineraries
            } else {
                console.error("Failed to fetch itineraries:", data);
            }
        } catch (error) {
            console.error("Error fetching itineraries:", error);
        }
    };

    const handleClick = (id) => {
        navigate(`/itineraryDetails/${id}`);
    };

    const currentItineraries = itineraries.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const totalPages = Math.ceil(itineraries.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleFilter = () => {
        fetchItineraries(minPrice, maxPrice); // Fetch itineraries based on the entered price range
    };

    return (
        <div className="itineraries">
            <h2>Filter Itineraries by Price</h2>
            <div className="filter">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={handleFilter}>Apply Filter</button>
            </div>
            <div className="itinerary-container">
                {currentItineraries.length > 0 ? (
                    currentItineraries.map((itinerary) => (
                        <div key={itinerary._id} className="itinerary-box" onClick={() => handleClick(itinerary._id)}>
                            <p>{itinerary.name}</p>
                            <p>Price: {itinerary.priceOfTour}</p> {/* Show the price */}
                        </div>
                    ))
                ) : (
                    <p>No itineraries found.</p>
                )}
            </div>
            <div className="pagination">
                <button className="arrow-button" onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
                <span> Page {currentPage + 1} of {totalPages} </span>
                <button className="arrow-button" onClick={handleNext} disabled={currentPage >= totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default Itineraries;
