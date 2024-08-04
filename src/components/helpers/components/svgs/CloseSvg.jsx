const CloseSvg = ({ stroke = 'black' }) => {
    return (
        <svg height={20} width={20} stroke={stroke} style={{ background: 'white' }}>
            <line x1={2} y1={2} x2={18} y2={18} />
            <line x1={18} y1={2} x2={2} y2={18} />
        </svg>
    )
}

export default CloseSvg