import CityTable from "./cityTable";
import NoDataFound from "./noDataFound";
import PageSizeEditor from "./pageSizeEditor";
import Pagination from "./pagination";

export default function CityTableWrapper({
  data,
  pageSize,
  setPageSize,
  totalPages,
  currentPage,
  setCurrentPage,
  loader,
}) {
  return (
    <>
      <div className="city_table_wrapper">
        <CityTable data={data} />
      </div>
      {data && data.length > 0 ? (
        <>
          <div className="page_size_editor_cnt">
            <PageSizeEditor
              pageSize={pageSize}
              setPageSize={setPageSize}
              loader={loader}
            />
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loader={loader}
          />
        </>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}
