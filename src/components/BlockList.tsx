import { RandomObject } from "../types";
import Block from "./Block";

type Props = {
  blocks: RandomObject[];
  setBlocks: (blocks: RandomObject[] | ((blocks: RandomObject[]) => RandomObject[])) => void,
}

const BlockList: React.FC<Props> = ({blocks, setBlocks}) => {
  return (
    <ul className="BlockList">
      {blocks.map(block => (
        <li className="BlockList__item" key={block.id}>
          <Block block={block} setBlocks={setBlocks} />
        </li>
      ))}
    </ul>
  )
};

export default BlockList;