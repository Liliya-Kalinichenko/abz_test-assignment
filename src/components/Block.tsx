import { useState } from "react";
import { deleteBlock } from "../api/blocks";
import { RandomObject } from "../types";
import { Loader } from "./Loader";
import { ErrorModal } from "./ErrorModal";

type Props = {
  block: RandomObject,
  setBlocks: (blocks: RandomObject[] | ((blocks: RandomObject[]) => RandomObject[])) => void,
}

const Block: React.FC<Props> = ({block, setBlocks}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  const handleDeleteBlock = (id: string) => {
    setIsLoading(true);
    setIsLoadError(false);

    return deleteBlock(id)
      .then(() => setBlocks(
        currentBlocks => currentBlocks.filter(block => block.id !== id),
      ))
      .catch(() => {
        setIsLoadError(true)
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setIsLoadError(false)
        }, 3000)
      });
  };

  return (
    <div className="Block">
      {isLoading && <Loader className="in-block"/>}
      <span className="Block__title">{`Block: ${block.name}`}</span>
      
      {block.id.length > 3 && (<button 
        type="button" 
        className="Block__button"
        onClick={() =>handleDeleteBlock(block.id)}
      />)}

      {isLoadError && <ErrorModal onClose={setIsLoadError} />}
    </div>
  );
};

export default Block;