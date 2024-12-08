import Badge from "@/components/Badge";

type T1 = {
  tp: string;
  text: string;
}

type T2 = {
  tp: string;
  v_text: string;
  e_text: string;
}

type Definition = T1 | T2


export type Data = {
  id: string;
  title: string;
  definitions: Definition[];
}

type VietvietCardProps = {
  data: Data
}



const VietanhCard: React.FC<VietvietCardProps> = ({ data }) => {


  // console.log(data);

  let no: number;
  return (
    <div>
      {/* <h3>{data?.data1?.title}</h3> */}
      <ul>
        {data?.definitions?.map((definition: Definition, index: number, definitions: Definition[]) => {
          let no = 0
          no = definition.tp === "M" ? no + 1 : no
          
          return (
            
            <li key={ index }>
              {
                definition.tp === "T" && <Badge className="bg-yellow-500 text-neutral-200">{(definition as T1).text}</Badge>
              }
              {
                definition.tp === "M" && < div >
                <Badge className={`bg-slate-400 font-thin`}>{no}</Badge> &nbsp;
                <span className="text-neutral-2x00">{(definition as T1).text}</span>
                </div>
              }
              {
                definition.tp === "E" &&
                <div className="mb-2">
                    <div className="font-light ml-10 text-neutral-400">{(definition as T2).v_text}</div>
                  <div className="font-light ml-10 text-neutral-200">{(definition as T2).e_text}</div>
                </div>
                
              }
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default VietanhCard;