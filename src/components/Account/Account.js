import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/AccountPreview';
import AccountItem from '~/components/AccountItem';

function Account({ data, suggested = false, watcher = false }) {
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
                    <AccountItem
                        key={data.id}
                        data={data}
                        suggested={suggested}
                        watcher={watcher}
                    />
                </div>
            </Tippy>
        </div>
    );
}

Account.propTypes = {
    data: PropTypes.object.isRequired,
    suggested: PropTypes.bool,
};

export default Account;
