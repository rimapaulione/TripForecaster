import { useNavigate } from "react-router-dom";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      <HiOutlineChevronLeft />
      Go Back
    </Button>
  );
}

export default BackButton;
