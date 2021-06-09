import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import image from "../../../assets/family-care.jpg"

export default class Dialogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section>
                <h1>React-Modal Examples</h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal
                    visible={this.state.visible}
                    width="500"
                    height="390"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                        <h3 className={'preview'}>Preview</h3>
                        <img className={'image_to_send'}  src={image} alt={"test"}/>
                        <div className={'alert-buttons'}>
                            <button type="button" className="btn btn-secondary close-dialog" ref="javascript:void(0);" onClick={() => this.closeModal()}>Close</button>
                            <button type="button" className="btn btn-success">Send <i className="fa fa-send fa-send-dialog" /></button>
                        </div>

                    </div>
                </Modal>
            </section>
        );
    }
}