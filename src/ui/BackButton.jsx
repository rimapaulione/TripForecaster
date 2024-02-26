import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { HiOutlineChevronLeft } from "react-icons/hi2";

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
