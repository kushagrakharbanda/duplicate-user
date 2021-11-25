import { useState } from 'react'

const Pagination = ({ userPerPage, totalUsers, setPage, currentPage }) => {
    // itemsPerPage, totalItems, setPage, currentPage 
    const pageNumbers = [];
    const [pageNumberLimit, setPageNumberLimit] = useState(3)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    for (let i = 1; i <= Math.ceil(totalUsers / userPerPage); i++) {
        pageNumbers.push(i)
    }

    const x = pageNumbers.length
    const paginate = (i) => {
        setPage(i)
    }
    const next = () => {
        if(currentPage!==x){
        setPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
        }
    }
    const prev = () => {
        if (currentPage !== 1) {
            setPage(currentPage - 1)
            if (((currentPage - 1) % pageNumberLimit == 0)) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
            }
        }
    }
    let pageInc=null;
    if(x>maxPageNumberLimit){
        pageInc=<li className="page-item"><button onClick={() => next()} className="page-link" href="#">&hellip;</button> </li>
    }
    let pageDec=null;
    if(currentPage>pageNumberLimit){
        pageDec=<li className="page-item"><button onClick={() => prev()} className="page-link" href="#">&hellip;</button> </li>
    }
    const renderPageNumber = pageNumbers.map(i => {
        if (i < maxPageNumberLimit + 1 && i > minPageNumberLimit) {
            return (
                <li className="page-item" key={i}>
                    <button onClick={() => paginate(i)} className={currentPage == i ? "page-link active text-black text-strong" : "page-link"} >
                        {i}
                    </button>
                </li>
            )
        }
        else return null;
    })
    return (

        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <button onClick={() => prev()} className="page-link" disabled={currentPage==pageNumbers[0]? true:false}>Prev</button>
                </li>
                 {pageDec}
                {renderPageNumber}
                {pageInc}

                <li className="page-item">
                    <button onClick={() => next()} className="page-link" disabled={currentPage==pageNumbers[x]? true:false}>Next</button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination