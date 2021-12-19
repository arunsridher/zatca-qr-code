const qrcode = new QRCode(document.getElementById("qrcode"), {
  width: 250,
  height: 250,
});

let qrGenerator = document.getElementById("qrGenerator");
let sellerName = document.getElementById("sellerName");
let vatRegistrationNumber = document.getElementById("vatRegistrationNumber");
let inoviceTimestamp = document.getElementById("inoviceTimestamp");
let invoiceTotal = document.getElementById("invoiceTotal");
let vatTotal = document.getElementById("vatTotal");

qrGenerator.addEventListener("click", generateQRCode);

function generateQRCode() {
  sellerName = sellerName.value;
  vatRegistrationNumber = vatRegistrationNumber.value;
  invoiceTimestamp = inoviceTimestamp.value;
  invoiceTotal = invoiceTotal.value;
  vatTotal = vatTotal.value;
  const invoice = generateInvoice({
    sellerName,
    vatRegistrationNumber,
    invoiceTimestamp,
    invoiceTotal,
    vatTotal,
  });
  qrcode.makeCode(invoice);
}

function generateInvoice(invoice) {
  let tags = [
    {
      id: 1,
      key: "sellerName",
    },
    {
      id: 2,
      key: "vatRegistrationNumber",
    },
    {
      id: 3,
      key: "invoiceTimestamp",
    },
    {
      id: 4,
      key: "invoiceTotal",
    },
    {
      id: 5,
      key: "vatTotal",
    },
  ];
  let tlv = tags.map((tag) => createTag(tag.id, invoice[tag.key])).join("");
  return toBase64(tlv);
}

function createTag(tag, value) {
  return toHex(tag) + toHex(getValueByteLength(value)) + value;
}

function toHex(value) {
  let hex = value.toString(16);
  if (hex.length % 2 > 0) {
    hex = "0" + hex;
  }
  return buffer.Buffer.from(hex, "hex").toString("utf-8");
}

function toBase64(value) {
  return buffer.Buffer.from(value).toString("base64");
}

function getValueByteLength(value) {
  console.log({ value });
  return buffer.Buffer.byteLength(value);
}

// console.log(invoice);
// qrcode.makeCode(invoice);
