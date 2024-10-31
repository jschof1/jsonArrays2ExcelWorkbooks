// Import stylesheets
import './style.css';

// JavaScript to handle modal display
const howItWorksBtn = document.getElementById('howItWorksBtn');
const modalBg = document.getElementById('modalBg');
const closeModal = document.getElementById('closeModal');

howItWorksBtn.addEventListener('click', () => {
  modalBg.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modalBg.classList.add('hidden');
});

// Close modal when clicking outside the content
modalBg.addEventListener('click', (e) => {
  if (e.target === modalBg) {
    modalBg.classList.add('hidden');
  }
});
let jsonData = null;

// Load JSON file and display content in the preview
document.getElementById('jsonFileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        jsonData = JSON.parse(e.target.result);
        document.getElementById('jsonPreview').textContent = JSON.stringify(jsonData, null, 2);
        document.getElementById('generateXlsxBtn').disabled = false;
        alert("JSON file loaded successfully!");
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  } else {
    alert("Please select a valid JSON file");
  }
});

// Generate XLSX file from JSON data
document.getElementById('generateXlsxBtn').addEventListener('click', () => {
  if (!jsonData) return;

  const workbook = XLSX.utils.book_new();

  Object.keys(jsonData).forEach(sheetName => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData[sheetName]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  });

  XLSX.writeFile(workbook, 'output.xlsx');
  alert("XLSX file has been generated and downloaded!");
});
