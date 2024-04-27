import { useEffect, useState } from "react";
import SearchBox from "./searchBox";
import useDebounce from "./useDebounce";
import { CITI_API_URL } from "./constants";
import CityTableWrapper from "./cityTableWrapper";
import Loader from "./loader";

export default function SearchPlaces() {
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState("");
  const [cityLoader, setCityLoader] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [cityData, setCityData] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const debouncedCity = useDebounce(city);

  const getCityData = async (city) => {
    setCityLoader(true);
    const queryString = `countryIds=IN&namePrefix=${city}&limit=${pageSize}&offset=${currentPage}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };

    try {
      const response = await fetch(`${CITI_API_URL}?${queryString}`, options);
      const result = await response.json();
      setTotalPages(Math.ceil(result?.metadata?.totalCount / (pageSize * 1.0)));
      setCityData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCityLoader(false);
    }
  };

  useEffect(() => {
    getCityData(debouncedCity);
  }, [debouncedCity, pageSize, currentPage]);

  return (
    <div className="search_places">
      {cityLoader && <Loader></Loader>}
      <div className="search_box_cnt">
        <SearchBox city={city} setCity={setCity} loader={cityLoader} />
      </div>
      <CityTableWrapper
        loader={cityLoader}
        data={cityData}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></CityTableWrapper>
    </div>
  );
}
