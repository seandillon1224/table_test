import PropTypes from 'prop-types'

const Column = () => null;


Column.propTypes = {
    headerLabel: PropTypes.string.isRequired,
    headerKey: PropTypes.string.isRequired,
    sortless: PropTypes.bool,
    customSort: PropTypes.func,
    customTransform: PropTypes.func
}

Column.defaultProps = {
    sortless: false,
    customSort: () => {},
    customTransform: (e) => e
}

export default Column;