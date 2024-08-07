const CloseSvg = ({ stroke = 'black', width = 20, height = 20 }) => {
    return (
        <svg height={height} width={width} stroke={stroke}>
            <line x1={2} y1={2} x2={width - 2} y2={height - 2} />
            <line x1={width - 2} y1={2} x2={2} y2={height - 2} />
        </svg>
    )
}

export default CloseSvg