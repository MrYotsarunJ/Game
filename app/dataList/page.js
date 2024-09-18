"use client";

import { Table, Button, message, Tabs } from "antd";
import "antd/dist/reset.css";
import "styles/globals.css";
import Link from "next/link";
import { useState } from "react";

// Sample data for Cars, Super Cars, and Super Bikes...
// (same as your provided code)
const carData = [
  {
    id: "4d8e21e6-ec68-4bfb-b1c3-4690a24f82d6",
    key: "1",
    brand: "Tesla",
    model: "Model S",
    year: 2022,
    price: "$80,000",
    type: "Car",
  },
  {
    id: "8b9e01f8-37d2-46e4-867e-02f5411a9f27",
    key: "2",
    brand: "Volvo",
    model: "XC90",
    year: 2021,
    price: "$70,000",
    type: "Car",
  },
  {
    id: "4a1ef60f-fd2a-4c6e-b2f8-8a46b2575f07",
    key: "3",
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    price: "$30,000",
    type: "Car",
  },
  {
    id: "d7339b6b-67a8-4f1b-9b2a-9a8e4e6cf0e7",
    key: "4",
    brand: "Ford",
    model: "F-150",
    year: 2022,
    price: "$45,000",
    type: "Car",
  },
  {
    id: "c3b6a4d2-63d4-4720-9e4c-d4f2e65b4f9b",
    key: "5",
    brand: "Honda",
    model: "Civic",
    year: 2021,
    price: "$25,000",
    type: "Car",
  },
  {
    id: "b8c63e1d-0e50-4293-8524-9e6d8f0b2d0f",
    key: "6",
    brand: "Chevrolet",
    model: "Malibu",
    year: 2020,
    price: "$28,000",
    type: "Car",
  },
  {
    id: "f4d67a4e-6d02-4f5d-9eb2-c63f5caa2c87",
    key: "7",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: "$70,000",
    type: "Car",
  },
  {
    id: "d99a1d6b-e2b3-4a65-b97d-f639d9e70156",
    key: "8",
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: "$40,000",
    type: "Car",
  },
  {
    id: "e0a76d5f-1d29-47b6-9c55-1f3c7b3e6c56",
    key: "9",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2020,
    price: "$50,000",
    type: "Car",
  },
  {
    id: "2b1d72d1-7d1a-4c15-a013-49b1df76c27d",
    key: "10",
    brand: "Hyundai",
    model: "Elantra",
    year: 2022,
    price: "$22,000",
    type: "Car",
  },
];

const superCarData = [
  {
    id: "eb3d7e55-7b1d-4709-9d5f-6c726e83f60d",
    key: "1",
    brand: "Ferrari",
    model: "488",
    year: 2022,
    price: "$280,000",
    type: "Super Car",
  },
  {
    id: "7c7321d8-e6b7-4e0a-b32b-d5e82b62c51a",
    key: "2",
    brand: "Lamborghini",
    model: "Huracan",
    year: 2021,
    price: "$320,000",
    type: "Super Car",
  },
  {
    id: "084b8a78-348b-4182-b2b5-13d788d23452",
    key: "3",
    brand: "Bugatti",
    model: "Chiron",
    year: 2022,
    price: "$3,000,000",
    type: "Super Car",
  },
  {
    id: "d6c062f2-49e0-4b9c-bc0d-7eb73b9f8177",
    key: "4",
    brand: "Porsche",
    model: "911",
    year: 2021,
    price: "$150,000",
    type: "Super Car",
  },
  {
    id: "c48a1b0d-462a-42e2-b5d8-8f1ed5307f6c",
    key: "5",
    brand: "McLaren",
    model: "720S",
    year: 2022,
    price: "$400,000",
    type: "Super Car",
  },
  {
    id: "f82e2a1a-06f4-48f7-8c82-b9c5eae81d02",
    key: "6",
    brand: "Aston Martin",
    model: "DBS",
    year: 2021,
    price: "$315,000",
    type: "Super Car",
  },
  {
    id: "ee5e10a3-5f2f-47c3-b074-e6c1b1e05f7e",
    key: "7",
    brand: "Koenigsegg",
    model: "Jesko",
    year: 2022,
    price: "$2,800,000",
    type: "Super Car",
  },
  {
    id: "2e72ec2f-691c-4c4f-b7fc-8e3cfbdc69a0",
    key: "8",
    brand: "Pagani",
    model: "Huayra",
    year: 2021,
    price: "$3,200,000",
    type: "Super Car",
  },
  {
    id: "8a4f6f9d-2582-4d22-a204-45bcb7bfb9d5",
    key: "9",
    brand: "Ford",
    model: "GT",
    year: 2020,
    price: "$500,000",
    type: "Super Car",
  },
  {
    id: "8c328d12-d098-4c87-84b6-ccf5048d04d5",
    key: "10",
    brand: "Chevrolet",
    model: "Corvette Z06",
    year: 2022,
    price: "$90,000",
    type: "Super Car",
  },
];

const superBikeData = [
  {
    id: "4b2f4e95-e092-4e15-a036-33cb02c6ea6b",
    key: "1",
    brand: "Ducati",
    model: "Panigale V4",
    year: 2022,
    price: "$30,000",
    type: "Super Bike",
  },
  {
    id: "60e6ea46-25b6-4c28-b8f8-5f67e8f4f9cf",
    key: "2",
    brand: "Kawasaki",
    model: "Ninja ZX-10R",
    year: 2021,
    price: "$20,000",
    type: "Super Bike",
  },
  {
    id: "a3ebed76-8823-4dcb-8c6f-df70c6c3f405",
    key: "3",
    brand: "Yamaha",
    model: "YZF-R1",
    year: 2022,
    price: "$18,000",
    type: "Super Bike",
  },
  {
    id: "ea8d5d7e-35ed-4f35-bc3c-68d77e6c7f35",
    key: "4",
    brand: "Suzuki",
    model: "GSX-R1000",
    year: 2020,
    price: "$17,500",
    type: "Super Bike",
  },
  {
    id: "b35b2f9d-fddc-42da-bdb7-b0b8c722a5f3",
    key: "5",
    brand: "BMW",
    model: "S1000RR",
    year: 2021,
    price: "$19,500",
    type: "Super Bike",
  },
  {
    id: "9e5c4d2b-9e7b-4b92-a3d8-d7cdd5e1ea9b",
    key: "6",
    brand: "Aprilia",
    model: "RSV4",
    year: 2022,
    price: "$22,000",
    type: "Super Bike",
  },
  {
    id: "58606e60-62ec-4a4e-b95a-78681d58c8a4",
    key: "7",
    brand: "Honda",
    model: "CBR1000RR",
    year: 2021,
    price: "$16,000",
    type: "Super Bike",
  },
  {
    id: "b8c06b6a-d10e-40f7-a1f5-31d5a54b3148",
    key: "8",
    brand: "MV Agusta",
    model: "F4",
    year: 2020,
    price: "$25,000",
    type: "Super Bike",
  },
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1); // Keep track of current page
  const [activeTabKey, setActiveTabKey] = useState("1"); // Active tab key
  const pageSize = 5; // Set the page size

  const handleDelete = (key, dataSource, setDataSource) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    message.success("Record deleted successfully.");
  };

  // Columns for the table
  const columns = (dataSource) => [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1, // Calculate row number with pagination
    },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Year", dataIndex: "year", key: "year" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Type", dataIndex: "type", key: "type" }, // Added Type column
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Link href={`/dataList/${record.id}`}>
            <Button type="default">Edit</Button>
          </Link>
          <Button
            danger
            onClick={() => handleDelete(record.key, carData, setCarData)} // Adjust data source if needed
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current); // Update the current page when the pagination changes
  };

  const TabContent = ({ dataSource }) => (
    <Table
      dataSource={dataSource}
      columns={columns(dataSource)}
      pagination={{ current: currentPage, pageSize }}
      onChange={handleTableChange} // Handle pagination change
    />
  );

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    setCurrentPage(1); // Reset page number to 1 when tab changes
  };

  return (
    <div className="container">
      <h1>Data Table: Vehicles</h1>
      <Tabs
        defaultActiveKey="1"
        activeKey={activeTabKey}
        onChange={handleTabChange}
      >
        <Tabs.TabPane tab="Cars" key="1">
          <TabContent dataSource={carData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Super Cars" key="2">
          <TabContent dataSource={superCarData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Super Bikes" key="3">
          <TabContent dataSource={superBikeData} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
