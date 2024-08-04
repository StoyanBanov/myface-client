const SideArrowSvg = ({ side = 'right', stroke = 'black', height = 20, width = 20, strokeWidth = 1 }) => {
    return (
        <svg height={height} width={width} stroke={stroke} strokeWidth={strokeWidth}>
            {side == 'right'
                ? <>
                    <line x1={2} y1={2} x2={width - 2} y2={height / 2} />
                    <line x1={width - 2} y1={height / 2} x2={2} y2={height - 2} />
                </>
                : <>
                    <line x1={width - 2} y1={2} x2={2} y2={height / 2} />
                    <line x1={2} y1={height / 2} x2={width - 2} y2={height - 2} />
                </>
            }
        </svg>
    )
}

export default SideArrowSvg