

import Badge from "@/components/Badge";

type Definition = {
  id: string;
  type: string;
  meaning: string;
  examples: string[];
}

// type Data1 = {
//   id: string;
//   title: string;
//   definitions: Definition[];
// }

// type Data2 = {
//   id: string;
//   title: string;
//   items: string[];
// }

// export type Data = {
//   data1: Data1;
//   data2: Data2;
// }

export type Data = {
  id: string;
  title: string;
  definitions: Definition[];
}

type VietvietCardProps = {
  data: Data
}



const VietvietCard: React.FC<VietvietCardProps> = ({ data }) => {
  // const [target, setTarget] = useState<HTMLElement>()
  // const ref = useCallback((el: any) => {
  //   if (el != null) {
  //     setTarget(el)
  //   } else {
  //     setTarget(undefined)
  //   }
  // }, [])


  // console.log(data);

  let no: number;
  return (
    <div className="text-lg font-thin px-2">
      {/* <h3>{data?.data1?.title}</h3> */}
      <ul>
        {data?.definitions?.map((definition: Definition, index: number, definitions: Definition[]) => {
          let firstOf: boolean = definition.type !== definitions?.[index - 1]?.type
          if (firstOf) no = 1
          else no++
          return (
            <li key={definition.id}>
              {firstOf && <Badge className="bg-orange-500 text-black">{definition.type}</Badge>}
              <div>
                <Badge className={`bg-slate-400 font-thin`}>{no}</Badge>&nbsp;
                <span className="
                text-neutral-300">{definition.meaning}</span>
              </div>
              <ul>
                {
                  definition.examples.map((example, i) => <li key={i} className="font-light ml-2 sm:ml-10 text-neutral-400">{example}</li>)
                }
              </ul>
            </li>
          )
        })}
      </ul>

    </div>
  );
}

export default VietvietCard;