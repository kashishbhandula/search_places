export default function CityTable({ data }) {
  return (
    <>
      <table className="city_table">
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
        {data?.map((item, index) => {
          return (
            <tr key={item?.id}>
              <td>{index + 1}</td>
              <td>{item?.name}</td>
              <td>{item?.country}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
