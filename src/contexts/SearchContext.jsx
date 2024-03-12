import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const SearchContext = createContext();
function SearchContextProvider(props) {
  const [studentSearch, setStudentSearch] = useState(null);
  const [name, setName] = useState("");
  const run = async (e) => {
    try {
      e.preventDefault();
      let token = localStorage.getItem("token");
      axios
        .get(`http://localhost:8000/student/search?name=${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setStudentSearch(response.data.getD))
        .catch((error) => console.error("Search", error));
      // console.log(searchs);
    } catch (err) {
      next(err);
    }
  };
  return (
    <SearchContext.Provider value={{ studentSearch, setName, name }}>
      {props.children}
    </SearchContext.Provider>
  );
}

export default SearchContext
export {SearchContextProvider}
