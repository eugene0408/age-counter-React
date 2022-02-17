const ArrowButton = ({className, handler})=> {
    return(
        <button className={`button flex-col-wrapper ${className}`}
        onClick={handler}
        >
            <div className="arrow">
                <div className="arrow-line"></div>
            </div>
        </button>
    )
}

export default ArrowButton