const RECORDS = [
  {
    date: "mon sept 06 2021",
    venue: "ronald lane",
    location: "san francisco, ca",
  },

  {
    date: "tue sept 21 2021",
    venue: "pier 3 east",
    location: "san francisco, ca",
  },

  {
    date: "fri oct 15 2021",
    venue: "view lounge",
    location: "san francisco, ca",
  },
];

const table = document.querySelector(".shows-table");

RECORDS.forEach(addRecord);

function createRecord_div() {
  const div = document.createElement("div");
  div.classList.add("shows-record");
  div.addEventListener("click", toggleSelectedClass);
  return div;
}

function createRecordInnerContainer_div() {
  const div = document.createElement("div");
  div.classList.add("shows-record-inner-container");
  return div;
}

function createRecordHeader_h2(text) {
  const h2 = document.createElement("h2");
  h2.classList.add("shows-record-inner-container__header");
  h2.innerText = text;
  return h2;
}

function createRecordInfo_p(text) {
  const p = document.createElement("p");
  p.classList.add("shows-record-inner-container__info");
  p.innerText = text;
  return p;
}

function getFormattedLocation(location) {
  const [city, state] = location.split(",");
  const formattedLocation = `${city}, ${state.toUpperCase()}`;
  return formattedLocation;
}

function createRecordButton() {
  const button = document.createElement("button");
  button.classList.add("shows-record__button");
  button.innerText = "buy tickets";
  return button;
}

function addMobileOnlyClass(element) {
  element.classList.add("mobile-only");
}

function addFont400Class(element) {
  element.classList.add("shows-record-inner-container__info--font400");
}

function addRecord(record) {
  const table_record = createRecord_div();

  const record_first_inner_container = createRecordInnerContainer_div();
  const record_date_header = createRecordHeader_h2("date");
  const record_date_info = createRecordInfo_p(record.date);

  addMobileOnlyClass(record_date_header);
  record_first_inner_container.append(record_date_header, record_date_info);

  const record_second_inner_container = createRecordInnerContainer_div();
  const record_venue_header = createRecordHeader_h2("venue");
  const record_venue_info = createRecordInfo_p(record.venue);

  addMobileOnlyClass(record_venue_header);
  addFont400Class(record_venue_info);
  record_second_inner_container.append(record_venue_header, record_venue_info);

  const record_third_inner_container = createRecordInnerContainer_div();
  const record_location_header = createRecordHeader_h2("location");
  const formattedLocation = getFormattedLocation(record.location);
  const record_location_info = createRecordInfo_p(formattedLocation);

  addMobileOnlyClass(record_location_header);
  addFont400Class(record_location_info);
  record_third_inner_container.append(
    record_location_header,
    record_location_info
  );

  const record_button = createRecordButton();

  table_record.append(
    record_first_inner_container,
    record_second_inner_container,
    record_third_inner_container,
    record_button
  );

  table.append(table_record);
}

function toggleSelectedClass(e) {
  const thisRecord = e.target.closest(".shows-record");
  thisRecord.classList.toggle("selected");

  const table = e.target.closest(".shows");
  const records = table.querySelectorAll(".shows-record");
  records.forEach((record) => {
    if (record !== thisRecord) removeSelectedClass(record);
  });
}

function removeSelectedClass(record) {
  record.classList.remove("selected");
}
