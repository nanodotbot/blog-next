const Toggle = ({handleToggle}) => {
    return (
        <div className="toggle">
            <input type="checkbox" className="toggle-input" name="toggle-pw" id='toggle-pw' onChange={handleToggle} />
            <label htmlFor="toggle-pw" className="toggle-label" id="toggle-label"></label>
        </div>
    )
}

export default Toggle