import { useState } from "react";
import Loader from "./loader";

export default function PageSizeEditor({ pageSize, setPageSize, loader }) {
  const [validationMessage, setValidationMessage] = useState();
  const pageSizeHandler = (e) => {
    const newPageSize = e.target.value;
    if (newPageSize > 10 || newPageSize < 1) {
      setValidationMessage(
        "The minimum and maximum page size is 1, 10 respectively."
      );
      return;
    }
    setPageSize(newPageSize);
    setValidationMessage("");
  };
  return (
    <div>
      <input
        value={pageSize}
        type="number"
        min={1}
        max={10}
        onChange={pageSizeHandler}
        disabled={loader}
      ></input>
      {validationMessage && (
        <div className="validation_error">{validationMessage}</div>
      )}
    </div>
  );
}
