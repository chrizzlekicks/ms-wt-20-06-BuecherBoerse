import { useNavigate } from 'react-router-dom';
import FilterButton from './FilterButton';

const ReturnTo = () => {
    const history = useNavigate();
    const prevPath = () => history.goBack();
    return (
        <>
            <FilterButton onClick={prevPath}>zurück</FilterButton>
        </>
    );
};

export default ReturnTo;
