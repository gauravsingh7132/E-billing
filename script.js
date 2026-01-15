let itemsDiv = document.getElementById("items");
let invoiceBody = document.getElementById("invoiceBody");

function addItem() {
  let div = document.createElement("div");
  div.className = "item-row";
  div.innerHTML = `
    <input placeholder="Description">
    <input type="number" placeholder="Qty" value="1">
    <input type="number" placeholder="Rate">
  `;
  itemsDiv.appendChild(div);
}

addItem(); // default one row

function generate() {

  document.getElementById("clName").innerText =
    client.value || "Client Name";

  document.getElementById("clAddr").innerText =
    clientAddress.value || "Client Address";

  document.getElementById("invNo").innerText =
    invoiceNo.value || "001";

  document.getElementById("invDate").innerText =
    date.value;

  invoiceBody.innerHTML = "";
  let subTotal = 0;

  document.querySelectorAll(".item-row").forEach(row => {
    let inputs = row.querySelectorAll("input");
    let desc = inputs[0].value;
    let qty = Number(inputs[1].value);
    let rate = Number(inputs[2].value);
    let rowTotal = qty * rate;

    subTotal += rowTotal;

    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${desc}</td>
      <td>${qty}</td>
      <td>${rate}</td>
      <td class="amount-col">${rowTotal}</td>
    `;
    invoiceBody.appendChild(tr);
  });

  let gstPercent = Number(document.getElementById("gstPercent").value);
  let gstRow = document.getElementById("gstRow");

  let gstAmount = 0;

  if (gstPercent > 0) {
    gstAmount = (subTotal * gstPercent) / 100;
    gstRow.style.display = "flex";
    document.getElementById("gstShow").innerText = gstPercent;
    document.getElementById("gstAmount").innerText = gstAmount.toFixed(2);
  } else {
    gstRow.style.display = "none";
  }

  let grandTotal = subTotal + gstAmount;

  document.getElementById("subTotal").innerText = subTotal.toFixed(2);
  document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}

function savePDF() {
  window.print();
}

function loadQR(event) {
  let img = document.getElementById("qr");
  img.src = URL.createObjectURL(event.target.files[0]);
  img.style.display = "block";
}


