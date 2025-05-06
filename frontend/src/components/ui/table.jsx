"use client";

import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

const Table = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const columns = [
    {
      name: "No",
      cell: (row, index) => index + 1,
      width: "60px",
    },
    {
      name: "Nama Campaign",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: false,
      grow: 2,
      cell: (row) => (
        <div className="truncate max-w-[200px]">{row.deskripsi}</div>
      ),
    },
    {
      name: "Proposal",
      selector: (row) => row.proposal,
      cell: (row) => (
        <a
          href={row.proposal}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {row.proposal}
        </a>
      ),
    },
    {
      name: "Status",
      cell: (row) => {
        let badgeClass = "";
        switch (row.status.toLowerCase()) {
          case "diterima":
            badgeClass = "bg-green-100 text-green-800";
            break;
          case "ditolak":
            badgeClass = "bg-red-100 text-red-800";
            break;
          case "menunggu":
            badgeClass = "bg-yellow-100 text-yellow-800";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-800";
        }

        return (
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${badgeClass}`}
          >
            {row.status}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Cari ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
      />

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default Table;
