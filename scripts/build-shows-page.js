const GLOBAL_VARIABLES = {
  apiKey: "",
  BASE_URL: "https://project-1-api.herokuapp.com",
};
const table = document.querySelector(".shows-table");

GLOBAL_VARIABLES.apiKey = await getApiKey();
const records = await populateShowsTable();

records.forEach(addRecord);

async function getApiKey() {
  const response = await axios.get(`${GLOBAL_VARIABLES.BASE_URL}/register`);
  return response.data;
}

async function populateShowsTable() {
  const response = await axios(
    `${GLOBAL_VARIABLES.BASE_URL}/showdates?api_key=${GLOBAL_VARIABLES.apiKey}`
  );
  const shows = response.data;
  const RECORDS = [];

  shows.forEach((show) => {
    const newShow = {
      id: show.id,
      date: getFormattedDate(new Date(show.date)),
      venue: show.place,
      location: show.location,
    };
    RECORDS.push(newShow);
  });
  return RECORDS;
}

function getFormattedDate(date) {
  const weekday = getDayOfWeek(date.getDay());
  const month = getMonthName(date.getMonth());
  const day = date.getDate();
  const year = date.getFullYear();
  return `${weekday} ${month} ${day} ${year}`;
}

function getDayOfWeek(day) {
  if (day === 0) return "Sun";
  if (day === 1) return "Mon";
  if (day === 2) return "Tue";
  if (day === 3) return "Wed";
  if (day === 4) return "Thu";
  if (day === 5) return "Fri";
  if (day === 6) return "Sat";
}

function getMonthName(month) {
  if (month === 0) return "Jan";
  if (month === 1) return "Feb";
  if (month === 2) return "Mar";
  if (month === 3) return "Apr";
  if (month === 4) return "May";
  if (month === 5) return "Jun";
  if (month === 6) return "Jul";
  if (month === 7) return "Aug";
  if (month === 8) return "Sep";
  if (month === 9) return "Oct";
  if (month === 10) return "Nov";
  if (month === 11) return "Dec";
}

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
