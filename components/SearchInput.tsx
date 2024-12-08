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
        className="text-yellow-500 font-bold text-3xl"
      />
      <div className="flex gap-x-3 mt-2 text-xs sm:text-base">
        <label className="space-x-1 flex items-center cursor-pointer">
          <input type="radio" id="vietviet" value="vietviet"
            checked={category === 'vietviet'}
            onChange={handleRadioChange}
            className="hidden peer"
          />
          
          <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-500 transition-colors"></span>
          <span>Viet-Viet</span>
        </label>
        <label className="space-x-1 flex items-center cursor-pointer">
          <input type="radio" id="viettrung" value="viettrung"
            checked={category === 'viettrung'}
            onChange={handleRadioChange}
            className="hidden peer"
          />
          <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-500 transition-colors"></span>
          <span>Viet-Trung</span>
        </label>
        <label className="space-x-1 flex items-center cursor-pointer">
          <input type="radio" id="vietanh" value="vietanh"
            checked={category === 'vietanh'}
            onChange={handleRadioChange}
            className="hidden peer"
          />
          <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors"></span>
          <span>Viet-Anh</span>
        </label>
        <label className="space-x-1 flex items-center cursor-pointer">
          <input type="radio" id="trungviet" value="trungviet"
            checked={category === 'trungviet'}
            onChange={handleRadioChange}
            className="hidden peer"
          />
            <span className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-cyan-500 peer-checked:bg-cyan-500 transition-colors"></span>
            <span>Trung-Vet</span>
        </label>
      </div>
      {/* <div>
        <RadioExample />
      </div> */}
    </div>

  );
}

export default SearchInput;