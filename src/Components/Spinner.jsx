const Spinner = ()  => {
    return(
        <div className="flex items-center justify-center h-[100vh] bg-slate-50">
            <div className="flex flex-col items-center">
                <img src="./spinner.svg" alt=" " />
                <p className="text-lg text-darkGray font-semibold tracking-wider">LOADING</p>
            </div>
        </div>
    )
}

export default Spinner