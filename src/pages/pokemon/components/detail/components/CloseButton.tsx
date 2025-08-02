import { useNavigate, useSearchParams } from 'react-router-dom';

export function CloseButton() {
  const navigate = useNavigate();
  const searchParams = useSearchParams()[0];

  const handleCloseDetail = () => {
    navigate({
      pathname: '/',
      search: searchParams.toString(),
    });
  };

  return (
    <button className="close-button" onClick={handleCloseDetail}>
      X
    </button>
  );
}
