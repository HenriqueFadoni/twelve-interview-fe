"use client";
import Item from "./Item/Item";
import { useData } from "@/contexts/DataContext";

export default function List() {
  const { list } = useData();

  const items = list.map((item) => {
    return <Item key={item.id} item={item} />;
  });

  return <div>{list.length > 0 ? items : "No data"}</div>;
}
