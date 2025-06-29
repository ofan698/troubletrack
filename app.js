const logForm = document.getElementById("logForm");
const logTable = document.getElementById("logTable");
const filterStatus = document.getElementById("filterStatus");
const filterKategori = document.getElementById("filterKategori");
const pagination = document.getElementById("pagination");

let logbook = JSON.parse(localStorage.getItem("troubleLogUPPKB")) || [];
let filteredLogs = [];
let currentPage = 1;
const rowsPerPage = 6;

function renderTable() {
  logTable.innerHTML = "";

  const statusFilter = filterStatus.value;
  const kategoriFilter = filterKategori.value;

  filteredLogs = logbook.filter(log => {
    return (
      (statusFilter === "" || log.status === statusFilter) &&
      (kategoriFilter === "" || log.kategori === kategoriFilter)
    );
  });

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedLogs = filteredLogs.slice(start, end);

  paginatedLogs.forEach((log, index) => {
    const row = document.createElement("tr");
    row.className = "border-t";
    row.innerHTML = `
      <td class="px-4 py-2">${log.tanggalLapor}</td>
      <td class="px-4 py-2">${log.kategori}</td>
      <td class="px-4 py-2">${log.unit}</td>
      <td class="px-4 py-2">${log.masalah}</td>
      <td class="px-4 py-2">${log.solusi}</td>
      <td class="px-4 py-2">${log.pelapor}</td>
      <td class="px-4 py-2">${log.status}</td>
      <td class="px-4 py-2">${log.tanggalSelesai || "-"}</td>
      <td class="px-4 py-2">
        <button onclick="editLog(${logbook.indexOf(log)})" class="bg-yellow-400 px-2 py-1 rounded text-sm mr-1">Edit</button>
        <button onclick="deleteLog(${logbook.indexOf(log)})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Hapus</button>
      </td>
    `;
    logTable.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `px-3 py-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`;
    btn.onclick = () => {
      currentPage = i;
      renderTable();
    };
    pagination.appendChild(btn);
  }
}

logForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const log = {
    tanggalLapor: document.getElementById("tanggalLapor").value,
    kategori: document.getElementById("kategori").value,
    unit: document.getElementById("unit").value,
    masalah: document.getElementById("masalah").value,
    solusi: document.getElementById("solusi").value,
    pelapor: document.getElementById("pelapor").value,
    status: document.getElementById("status").value,
    tanggalSelesai: document.getElementById("tanggalSelesai").value
  };

  if (logForm.dataset.editIndex) {
    logbook[logForm.dataset.editIndex] = log;
    delete logForm.dataset.editIndex;
  } else {
    logbook.push(log);
  }

  localStorage.setItem("troubleLogUPPKB", JSON.stringify(logbook));
  logForm.reset();
  showView("listView");
  renderTable();
});

function editLog(index) {
  const log = logbook[index];
  document.getElementById("tanggalLapor").value = log.tanggalLapor;
  document.getElementById("kategori").value = log.kategori;
  document.getElementById("unit").value = log.unit;
  document.getElementById("masalah").value = log.masalah;
  document.getElementById("solusi").value = log.solusi;
  document.getElementById("pelapor").value = log.pelapor;
  document.getElementById("status").value = log.status;
  document.getElementById("tanggalSelesai").value = log.tanggalSelesai;
  logForm.dataset.editIndex = index;
  showView("formView");
}

function deleteLog(index) {
  if (confirm("Yakin ingin menghapus log ini?")) {
    logbook.splice(index, 1);
    localStorage.setItem("troubleLogUPPKB", JSON.stringify(logbook));
    renderTable();
  }
}

function exportToJSON() {
  const dataStr = JSON.stringify(filteredLogs, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "log-trouble-uppkb.json";
  a.click();
}

function renderStats() {
  const total = logbook.length;
  const selesai = logbook.filter(log => log.status === "Selesai").length;
  const belum = logbook.filter(log => log.status === "Belum Selesai").length;

  document.getElementById("totalLog").textContent = total;
  document.getElementById("totalSelesai").textContent = selesai;
  document.getElementById("totalBelum").textContent = belum;

  const kategoriCount = {};
  logbook.forEach(log => {
    kategoriCount[log.kategori] = (kategoriCount[log.kategori] || 0) + 1;
  });

  const canvas = document.getElementById("kategoriChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  if (window.kategoriChart instanceof Chart) {
    window.kategoriChart.destroy();
  }

  window.kategoriChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: Object.keys(kategoriCount),
      datasets: [{
        data: Object.values(kategoriCount),
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function showView(viewId) {
  document.getElementById("formView").classList.add("hidden");
  document.getElementById("listView").classList.add("hidden");
  document.getElementById("statView").classList.add("hidden");

  document.getElementById(viewId).classList.remove("hidden");

  if (viewId === "statView") {
    setTimeout(() => {
      renderStats();
    }, 150);
  }
}

filterStatus.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

filterKategori.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

showView("listView");
renderTable();
