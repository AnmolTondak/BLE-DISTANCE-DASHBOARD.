const dataTable = document.querySelector('#data-table');
async function fetchData() {
   try {
      const res = await fetch('https://gateway.ddns.net/get_data')
      const data = await res.json();
      console.log(data);
      return data;
      
   } catch (error) {
      console.log(error);
   }


}
fetchData().then(res => {
   console.log(res);
   let tableRows = "";
   // Loop through the data and create a table row for each item
   for (let el of res.data) {
      console.log(el);
      tableRows += `
  <tr>
   <th scope="row">${el.id}</th>
   <td>${el.type}</td>
   <td>${el.mac_address}</td>
   <td>${el.rssi_value}</td>
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
       <th scope="col">RSSI</th>
     </tr>
   </thead>
   <tbody>
   
    ${tableRows}
     
   </tbody>
   </table>
   
   `
   dataTable.insertAdjacentHTML('afterbegin', htmlContent)
});

// const addDataTable = () => {

// }
// addDataTable();