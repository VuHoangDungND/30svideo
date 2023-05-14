import PropTypes from 'prop-types';

function MenuPage({ children }) {
    return <nav>{children}</nav>;
}

MenuPage.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuPage;
