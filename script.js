
const schedules = [
  "YourNameSchedule.json",
  "Friend1Schedule.json",
  "Friend2Schedule.json",
  "Friend3Schedule.json"
];


let currentIndex = 0;


const container = document.getElementById("scheduleContainer");
const status = document.getElementById("status");
const switchBar = document.getElementById("switchBar");


window.onload = () => {
  loadSchedule(schedules[currentIndex]);
};


switchBar.addEventListener("mouseenter", () => {
  currentIndex = (currentIndex + 1) % schedules.length;
  loadSchedule(schedules[currentIndex]);
});


async function loadSchedule(fileName) {
  try {

    status.innerHTML = `<div class="alert alert-info">Loading schedule...</div>`;
    container.innerHTML = "";

    const url = `./${fileName}`;
    let response;
    try {
      response = await fetch(url);
    } catch (netErr) {
      throw new Error(`Network error fetching ${fileName}: ${netErr.message}`);
    }

    if (!response.ok) {
      const bodyText = await response.text().catch(() => "");
      throw new Error(`Failed to load ${fileName} (${response.status} ${response.statusText}) ${bodyText}`);
    }

    const data = await response.json();

    data.sort((a, b) => a.period - b.period);


    status.innerHTML = "";


    data.forEach(cls => {
      const html = `
        <div class="col-md-4">
          <div class="card schedule-card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${cls.className}</h5>
              <p><strong>Period:</strong> ${cls.period}</p>
              <p><strong>Teacher:</strong> ${cls.teacher}</p>
              <p><strong>Room:</strong> ${cls.roomNumber}</p>
              <p><strong>Subject:</strong> ${cls.subjectArea}</p>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", html);
    });

  } catch (error) {
    console.error(error);
    let hint = "";
    if (error.message && error.message.toLowerCase().includes('network')) {
      hint = "<br/><small>Hint: If you opened the file with file://, run a local HTTP server instead.</small>";
    }

    status.innerHTML = `
      <div class="alert alert-danger">
        <div>Sorry, this schedule could not be loaded.</div>
        <div class="mt-2"><small>${error.message || error}</small></div>
        ${hint}
      </div>
    `;
  }
}
