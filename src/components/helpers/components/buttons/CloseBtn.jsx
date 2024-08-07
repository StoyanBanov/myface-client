import CloseSvg from "../svgs/CloseSvg"

const CloseBtn = ({ onClick, backgroundColor = 'white', height, width, stroke }) => {
    return (
        <span onClick={onClick} style={{ backgroundColor, border: '1px solid black', display: 'flex', width: 'fit-content' }}>
            <CloseSvg stroke={stroke} height={height} width={width} />
        </span>
    )
}

export default CloseBtn