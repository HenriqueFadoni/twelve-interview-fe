"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { getCurrentDate } from "@/utils/utils";
import { useData } from "@/contexts/DataContext";

export default function Form() {
  const { fetchData } = useData();
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [memo, setMemo] = useState("");

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (name.length <= 0 || value <= 0 || memo.length <= 0) {
        alert("Please fill out name, value, and memo correctly");
        return;
      }

      const date = getCurrentDate();

      await axios.post(process.env.NEXT_PUBLIC_URL, {
        name,
        value,
        memo,
        date: date,
      });

      fetchData();
    },
    [name, value, memo, fetchData]
  );

  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "value":
        setValue(value);
        break;
      case "memo":
        setMemo(value);
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input type="text" name="name" onChange={onChangeHandler} required />
        <label className="ml10">Value</label>
        <input type="number" name="value" onChange={onChangeHandler} required />
        <label className="ml10">Memo</label>
        <input type="text" name="memo" onChange={onChangeHandler} required />
        <button className="ml10" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
