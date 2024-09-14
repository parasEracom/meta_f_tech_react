import XLSX from "https://unpkg.com/xlsx/xlsx.mjs";

const ExportExcel = (props) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(props.generationTeam);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "my-data.xlsx");
  };

  return (
    <button
      style={{ width: "15%", margin: "0" }}
      className="btnPrimary"
      onClick={exportToExcel}
    >
      Export to Excel
    </button>
  );
};

export default ExportExcel;
