"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { useData } from "@/contexts/DataContext";
import ItemForm from "./ItemForm";

export default function Item({ item }) {
  const { fetchData } = useData();
  const { _id, name, value, memo, date } = item;
  const [isEdit, setIsEdit] = useState(false);

  const onDelete = useCallback(async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}${_id}`);
    fetchData();
  }, [fetchData, _id]);

  return (
    <div className="item">
      {!isEdit ? (
        <div className="item-content">
          <h2>{name}</h2>
          <p>${value}</p>
          <p>{memo}</p>
          <p>{date}</p>
        </div>
      ) : (
        <ItemForm item={item} isEdit={isEdit} setIsEdit={setIsEdit} />
      )}
      {!isEdit && (
        <div className="item-actions">
          <button className="item-actions-delete mr10" onClick={onDelete}>
            Delete
          </button>
          <button
            className="item-actions-edit"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
