function generateSchedule() {
  var course = document.getElementById("course").value;
  var semester1 = document.getElementById("semester1").value;
  var winterSession = document.getElementById("winterSession").value;
  var winterBreak = document.getElementById("winterBreak").value;
  var semester2 = document.getElementById("semester2").value;
  var summerSession = document.getElementById("summerSession").value;
  var summerBreak = document.getElementById("summerBreak").value;
  var practice = document.getElementById("practice").value;

  var startDate = new Date(`2023-08-31`);
  var endDate = startDate;

  var table = document.getElementById("scheduleTable");
  var row = table.insertRow(-1);

  // Вставляем значение курса в первую ячейку
  var cell = row.insertCell(0);
  cell.innerHTML = '<input type="text" value="' + course + '" />';

  // Генерируем расписание для каждого события
  var events = [
    semester1,
    winterSession,
    winterBreak,
    semester2,
    summerSession,
    summerBreak,
    practice,
  ];
  for (var i = 0; i < events.length; i++) {
    startDate = new Date(endDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    var eventEndDate = new Date(
      startDate.getTime() + events[i] * 7 * 24 * 60 * 60 * 1000
    );

    cell = row.insertCell(i + 1);
    cell.innerHTML = `
        <input type="text" class="start-date" value="${startDate.toLocaleDateString()}" />
        <br />
        <input type="text" class="end-date" value="${eventEndDate.toLocaleDateString()}" />
      `;
    endDate = eventEndDate;
  }

  // Добавляем кнопки управления
  cell = row.insertCell(events.length + 1);
  cell.innerHTML =
    '<button onclick="moveRowUp(this)">🔼</button> ' +
    '<button onclick="moveRowDown(this)">🔽</button> ' +
    '<button onclick="deleteRow(this)">❌</button>';
}

function moveRowUp(button) {
  var row = button.parentNode.parentNode;
  if (row.rowIndex > 1) {
    var table = row.parentNode;
    table.insertBefore(row, table.rows[row.rowIndex - 1]);
  }
}

function moveRowDown(button) {
  var row = button.parentNode.parentNode;
  var table = row.parentNode;
  if (row.rowIndex < table.rows.length - 1) {
    table.insertBefore(table.rows[row.rowIndex + 1], row);
  }
}

function deleteRow(button) {
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function addSpecialty() {
  var specialtyName = prompt("Введите название специальности:");
  if (specialtyName !== null && specialtyName.trim() !== "") {
    addSpecialtyRow(specialtyName);
  }
}

function addSpecialtyRow(specialtyName) {
  var table = document.getElementById("scheduleTable");
  var row = table.insertRow(-1);

  // Вставляем значение специальности в первую ячейку, объединяя на 8 столбцов
  var cell = row.insertCell(0);
  cell.colSpan = 8;
  cell.style.textAlign = "center"; // Выравниваем по центру
  cell.innerHTML = specialtyName;

  // Добавляем кнопки управления в последнюю ячейку
  cell = row.insertCell(1);
  cell.innerHTML =
    '<button onclick="moveRowUp(this)">🔼</button> ' +
    '<button onclick="moveRowDown(this)">🔽</button> ' +
    '<button onclick="deleteRow(this)">❌</button>';
}
