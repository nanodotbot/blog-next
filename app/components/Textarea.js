const handleTextareaHeight = e => {
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight + 1 + 'px';
}

const Textarea = ({handleTextareaInput, message, label}) => {
    const handleTextarea = e => {
        handleTextareaHeight(e);
        handleTextareaInput(e);
    }
    return (
        <div>
            <label htmlFor="message">{label}</label>
            <textarea name="message" id="message" onChange={e => handleTextarea(e)} value={message}></textarea>
        </div>
    )
}

export default Textarea