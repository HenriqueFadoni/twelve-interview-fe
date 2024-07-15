"use client";
import { useEffect } from "react";
import { useData } from "@/contexts/DataContext";
import Form from "@/components/Form/Form";
import List from "@/components/List/List";

export default function Home() {
  const { fetchData } = useData();

  const getData = async () => {
    await fetchData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home">
      <Form />
      <List />
    </div>
  );
}
