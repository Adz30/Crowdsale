import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return ( 
        <div className='text-center my-5'>
            <Spinner animations="grow" />
            <p className='my-2'>Loading data</p>
        </div>
    );
}

export default Loading
