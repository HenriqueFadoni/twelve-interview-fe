"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { getCurrentDate } from "@/utils/utils";
import { useData } from "@/contexts/DataContext";

export default function ItemForm({ item, isEdit, setIsEdit }) {
  const { fetchData } = useData();
  const { _id, name, value, memo } = item;
  const [nameEdit, setNameEdit] = useState(name);
  const [valueEdit, setValueEdit] = useState(value);
  const [memoEdit, setMemoEdit] = useState(memo);

  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setNameEdit(value);
        break;
      case "value":
        setValueEdit(value);
        break;
      case "memo":
        setMemoEdit(value);
        break;
      default:
        break;
    }
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const date = getCurrentDate();

      await axios.put(`${process.env.NEXT_PUBLIC_URL}${_id}`, {
        name: nameEdit,
        value: valueEdit,
        memo: memoEdit,
        date: date,
      });

      fetchData();
      setIsEdit(!isEdit);
    },
    [nameEdit, valueEdit, memoEdit, fetchData, _id, isEdit, setIsEdit]
  );

  return (
    <div className="item-form">
      <form onSubmit={onSubmit}>
        <input
          className="mr10"
          type="text"
          name="name"
          value={nameEdit}
          onChange={onChangeHandler}
        />
        <input
          className="mr10"
          type="number"
          name="value"
          value={valueEdit}
          onChange={onChangeHandler}
        />
        <input
          className="mr10"
          type="text"
          name="memo"
          value={memoEdit}
          onChange={onChangeHandler}
        />
        <button className="mr10" type="submit">
          Submit
        </button>
        <button onClick={() => setIsEdit(!isEdit)}>Cancel</button>
      </form>
    </div>
  );
}
