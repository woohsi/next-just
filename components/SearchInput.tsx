"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

import Input from "@/components/Input";
import RadioExample from "./radio";



const SearchInput = () => {

  const router = useRouter();
  const searchParams = useSearchParams()!

  const [value, setValue] = useState<string>(searchParams.get('word') || '');
  const debouncedValue = useDebounce<string>(value, 500);
  const [category, setCategory] = useState<string>(searchParams.get("category") || 'vietviet');

  useEffect(() => {
    const query = {
      word: debouncedValue,
      category: category
    };

    const url = qs.stringifyUrl({
      url: '/',
      query
    });

    console.log("url", url)
    router.push(url);
  }, [debouncedValue, category, router]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.currentTarget.value)
    // const query = { category: event.currentTarget.value }
    // const url = qs.stringifyUrl({
    //   url: window.location.href,
    //   query
    // })
    // router.push(url)
  }

  return (
    <div className="flex flex-col ">
      <Input
        placeholder="Searh words here ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex gap-x-3 mt-2">
        <div className="space-x-1">
          <input type="radio" id="vietviet" value="vietviet"
            checked={category === 'vietviet'}
            onChange={handleRadioChange}
          />
          <label htmlFor="vietviet">Viet-Viet</label>
        </div>
        <div className="space-x-1">
          <input type="radio" id="viettrung" value="viettrung"
            checked={category === 'viettrung'}
            onChange={handleRadioChange}
          />
          <label htmlFor="viettrung">Viet-Trung</label>
        </div>
        <div className="space-x-1">
          <input type="radio" id="vietanh" value="vietanh"
            checked={category === 'vietanh'}
            onChange={handleRadioChange}
          />
          <label htmlFor="vietanh">Viet-Anh</label>
        </div>
        <div className="space-x-1">
          <input type="radio" id="trungviet" value="trungviet"
            checked={category === 'trungviet'}
            onChange={handleRadioChange}
          />
          <label htmlFor="trungviet">Trung-Viet</label>
        </div>
      </div>
      {/* <div>
        <RadioExample />
      </div> */}
    </div>

  );
}

export default SearchInput;