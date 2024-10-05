// import { useEffect, useState } from "react";

// //componetns
// import TouristDetails from "../components/TouristDetails";

// const Home = () => {
//   const [tourists, setTourists] = useState(null);
//   useEffect(() => {
//     const fetchTourists = async () => {
//       const response = await fetch("/api/tourists");
//       // array of tourists
//       const json = await response.json();

//       if (response.ok) {
//         setTourists(json);
//       }
//     };

//     fetchTourists();
//   }, []);
//   return (
//     <div className="Home">
//       {/* basically what this does is that it will only map if tourists is not null */}
//       <div className="tourists">
//         {tourists &&
//           tourists.map((tourist) => (
//             <TouristDetails key={tourist._id} tourist={tourist} />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";

// Components
import TouristDetails from "../components/TouristDetails";
import './Tourists.css';

const Home = () => {
  const [tourists, setTourists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchTourists = async () => {
  //     try {
  //       const response = await fetch("/api/tourists");

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch tourists");
  //       }

  //       const json = await response.json();
  //       setTourists(json);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTourists();
  // }, []);
  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const response = await fetch("/api/tourists");
  
        if (!response.ok) {
          throw new Error("Failed to fetch tourists: " + response.status);
        }
  
        const json = await response.json();
        setTourists(json);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTourists();
  }, []);

  if (loading) {
    return <div>Loading tourists...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <div className="tourists">
        {tourists && tourists.length > 0 ? (
          tourists.map((tourist) => (
            <TouristDetails key={tourist._id} tourist={tourist} />
          ))
        ) : (
          <div>No tourists available.</div>
        )}
      </div>
    </div>
  );
};

export default Home;

