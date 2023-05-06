const dataTable = document.querySelector('#data-table');

async function fetchData() {
  try {
    const res = await fetch('https://gateway.ddns.net/get_data');
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

const calculateDistance = (measuredPower, N, rssi) => {
  const distance = Math.pow(10, (measuredPower - rssi) / (10 * N));
  return distance.toFixed(2) + " meters";
};

fetchData().then((res) => {
  console.log(res);
  let tableRows = "";
  // Loop through the data and create a table row for each item
  for (let el of res.data) {
    console.log(el);
    const distance = calculateDistance(-60, 2, el.rssi_value);
    tableRows += `
      <tr>
        <th scope="row">${el.id}</th>
        <td>${el.type}</td>
        <td>${el.mac_address}</td>
        <td>${distance}</td>
      </tr>
    `;
  }
  console.log(tableRows);
  const htmlContent = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">TYPE</th>
          <th scope="col">MAC</th>
          <th scope="col">Distance (meters)</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
  dataTable.insertAdjacentHTML("afterbegin", htmlContent);
});
