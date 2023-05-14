import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';
import AccountItem from '../AccountItem';

function Account({ data }) {
    //Render tippy
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-20, 0]}
                placement="bottom"
                render={() => renderPreview()}
                popperOptions={{ strategy: 'fixed' }}
            >
                <div>
                    <AccountItem key={data.id} data={data} />
                </div>
            </Tippy>
        </div>
    );
}

Account.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Account;
