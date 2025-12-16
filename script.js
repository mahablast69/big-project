
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


    const response = await fetch(`./${fileName}`);

    if (!response.ok) {
      throw new Error("File failed to load");
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

    status.innerHTML = `
      <div class="alert alert-danger">
        Sorry, this schedule could not be loaded.
      </div>
    `;
  }
}
