import { useState } from "react";
import { RandomObject } from "../types";
import { addBlock } from "../api/blocks";
import classNames from "classnames";
import { ErrorModal } from "./ErrorModal";

type Props = {
  setBlocks: (blocks: RandomObject[] | ((blocks: RandomObject[]) => RandomObject[])) => void,
};

const AddForm: React.FC<Props> = ({setBlocks}) => {
  const [newBlockName, setNewBlockName] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);

  const handleBlockAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setIsError(false);
    setIsLoadError(false)

    if (!newBlockName.trim()) {
      setIsError(true);
      setNewBlockName('');
      return;
    }

    if (newBlockName.trim()) {
      addBlock({
        name: newBlockName.trim(),
        data: {
          color: 'someColor',
          capacity: 'someCapacity',
        }
      })
      .then(newBlock => {
        setBlocks((currentBlocks: RandomObject[]): RandomObject[] => {
          return [...currentBlocks, newBlock]
        });
      })
      .catch(() => {
        setIsLoadError(true);
      })
      .finally(() => {
        setNewBlockName('');
        setTimeout(() => {
          setIsLoadError(false)
        }, 3000)
      })
    }
  };

  return (
    <form className="form" onSubmit={handleBlockAdd}>
      <input
        type="text"
        className={classNames('form__input', {
          'is-error': isError
        })}
        placeholder="Enter New Block Name"
        value={newBlockName}
        onChange={event => {
          setNewBlockName(event.target.value)
          setIsError(false)
        }}
        onBlur={() => setIsError(false)}

      />
      {isError && <span className="form__info">Name should not be empty</span>}
      <button 
        type="submit" 
        className="form__button"
        disabled={!newBlockName.length}
      >
        Add
      </button>

      {isLoadError && <ErrorModal onClose={setIsLoadError} />}
    </ form>
  );
};

export default AddForm;

