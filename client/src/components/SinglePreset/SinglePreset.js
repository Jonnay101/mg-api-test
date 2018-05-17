import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FXParam from '../FXParam/FXParam';
import PropTypes from 'prop-types';

import { selectPreset, setDefaultInUse} from '../../actions/index';

require('./SinglePreset.css');

class SinglePreset extends Component {

    static defaultProps = {
        preset: {},
        info: {}
    };

    componentDidMount() {
        const { selectPreset, setDefaultInUse, info } = this.props;
        selectPreset(info.defaultPreset);
        setDefaultInUse();
    };

    render () {
        const { preset, info, hasErrored, isLoading } = this.props;
        const { params } = preset;
        const presetId = preset._id || '0';

        if(isLoading) {
            return <h2 className="is-loading">Loading...</h2>
        }

        if (hasErrored) {
            console.log(hasErrored)
            return (
                <div className='has-errored'>Something went wrong... {hasErrored.message}</div>
            );
        }

        if (params) {
            return (
                <div className="single-preset-body">
                    <h3 className="current-preset-header">Current Preset: <span className="current-preset-name">{preset.presetName}</span></h3>
                    {params.map((param, index) => {                        
                        return (
                            <FXParam 
                                key={index + presetId} 
                                presetId={presetId} 
                                param={ param }
                                info={info}
                            />
                        );
                    })}
                </div>
            )
        } else {
            return <div>Loading...</div>
        }     
    };
};

SinglePreset.PropTypes = {
    preset: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
    hasErrored: PropTypes.object,
    isLoading: PropTypes.bool
}

const mapStateToProps = state => {
    return {
        preset: state.currPreset,
        hasErrored: state.hasErrored,
        isLoading: state.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        selectPreset: selectPreset,
        setDefaultInUse: setDefaultInUse
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePreset);