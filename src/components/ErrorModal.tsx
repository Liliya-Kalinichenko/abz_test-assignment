type Props = {
  onClose: (data: boolean) => void,
}

export const ErrorModal: React.FC<Props> = ({onClose}) => (
  <div className="ErrorModal">
    <div className="ErrorModal__content">
      <button
        type="button"
        className="ErrorModal__button"
        onClick={() => onClose(false)}
      >
      </button>
      <p className="ErrorModal__info">
        Opps...something went wrong!
        <br/> Please try again
      </p>
    </div>
  </div>
);