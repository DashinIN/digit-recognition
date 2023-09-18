/* eslint-disable react/prop-types */
const Result = ({data, isLoading, error}) => {
    
    const formatResultArray = (array) => {
        return array.map((value) => value.toFixed(6));
    };

    if(isLoading) {
        return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
    }
    if(error) {
        return <div>error</div>
    }

    if(data) {
        const result = data.result;
        const resultArray = data.resultArray

        return (
            <>
                <div className='results__wrapper'>
                <h2>This is {result}</h2>
                <h2> with {resultArray[result].toFixed(2)*100}% chance</h2>
                <p>Distribution of predictions : {formatResultArray(resultArray).join(', ')}</p>
                </div>
            </>
        )
      }
}

export default Result;