import React from 'react';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import Parser from 'html-react-parser';
import { withTranslation } from 'react-i18next';
import hoistStatics from 'hoist-non-react-statics';

import Modal from '../modal';
import SvgIcon from '../svgicon';

import './style.scss';

class RecipeGeneratorModalNotExtended extends React.Component {
    mdParser = new MarkdownIt();
    state = {
        formValues: {},
        formElements: []
    };

    nToBr = ( data ) => {
        if ( undefined === data || '' === data ) {
            return ' ';
        } else {
            let formatted = data.replace( /(?:\r\n|\r|\n)/g, '<br/>' );
            return formatted;
        }
    };

    printThis = () => {
        window.print();
    };

    onClose = () => {
        const { onClose } = this.props;
        this.setState( { formValues: {} } );
        onClose && onClose();
    };

    _footer = () => {
        return (
            <div className='footer-buttons'>
                <span onClick={this.printThis}>
                    <SvgIcon name='print'/>
                </span>
                <span onClick={this.onClose}>
                    <SvgIcon name='cancel'/>
                </span>
                <style>
                    {/* F... inline style */}
                    {`
                        @media print {
                            body {
                                padding: 0;
                                margin: 0;
                            }
                            .modal-header {
                                position: absolute;
                                top: 200px;
                                padding: 0;
                                left: 50%;
                            }
                            .modal-header .title {
                                color: #000 !important;
                            }
                            .modal-header span,
                            .modal-footer {
                                visibility: hidden;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper {
                                width: 100%;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .image {
                                max-height: 200px;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .tech {
                                font-size: .25rem;
                                color: #000 !important;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .image-tech-wrapper .tech svg,
                            .comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper svg,
                            .comp_recipe-generator-modal .modal-content .modal-body .directions-wrapper svg {
                                color: #000 !important;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .ingredients-wrapper {
                                color: #000 !important;
                                font-size: .35rem;
                                line-height: 180%;
                                width: 20%;
                                padding: 0 20px 0 0;
                            }
                            .comp_recipe-generator-modal .modal-content .modal-body .directions-wrapper {
                                color: #000 !important;
                                font-size: .4rem;
                                width: 80%;
                                padding: 0;
                            }
                        }
                    `}
                </style>
            </div>
        );
    };

    render() {
        const { t, show, item } = this.props;

        return (
            <div className='comp_recipe-generator-modal'>
                <Modal
                    show={show}
                    onClose={this.onClose}
                    title={item.title}
                    footerTemplate={this._footer}
                >
                    <div className='image-tech-wrapper'>
                        <div className='image'>
                            <img src={item.picture.base64} alt=''/>
                        </div>
                        <div className='tech'>
                            <div className='servings'>
                                <label>
                                    <span><SvgIcon name='servings'/></span>{ t( 'Servings' ) }
                                </label>
                                {item.servings}
                            </div>
                            <div className='difficulty'>
                                <label>
                                    <span><SvgIcon name='difficulty'/></span>{ t( 'Difficulty' ) }
                                </label>
                                {item.difficultylevel}
                            </div>
                            <div className='prep'>
                                <label>
                                    <span><SvgIcon name='clock'/></span>{ t( 'Prep time' ) }
                                </label>
                                {item.prep}
                                </div>
                            <div className='cook'>
                                <label>
                                    <span><SvgIcon name='clock'/></span>{ t( 'Cook time' ) }
                                </label>
                                {item.cook}
                            </div>
                        </div>
                    </div>
                    <div className='ingredients-wrapper'>
                        <label>
                            <span><SvgIcon name='ingredients'/></span>{ t( 'Ingredients' ) }
                        </label>
                        {Parser( this.nToBr( item.ingredients ) )}
                    </div>
                    <div className='directions-wrapper'>
                        <label>
                            <span><SvgIcon name='concierge'/></span>{ t( 'Directions' ) }
                        </label>
                        { Parser( this.mdParser.render( item.directions ) ) }
                    </div>
                </Modal>
            </div>
        );
    }
}

RecipeGeneratorModalNotExtended.propTypes = {
    show: PropTypes.bool,
    item: PropTypes.object
};

const RecipeGeneratorModal = hoistStatics( withTranslation()( RecipeGeneratorModalNotExtended ), RecipeGeneratorModalNotExtended );

export default RecipeGeneratorModal;