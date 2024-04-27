import { useEffect, useRef } from "react";

export default function SearchBox({ city, setCity, loader }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (loader) return;
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const inputChangeHandler = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="search_box">
        <input
          ref={inputRef}
          value={city}
          className="search_box_input"
          placeholder="Search Places..."
          onChange={inputChangeHandler}
          disabled={loader}
        />
        <div className="shortcut_key">
          <span>Ctrl + /</span>
        </div>
      </div>
    </>
  );
}
